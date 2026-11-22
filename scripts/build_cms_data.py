#!/usr/bin/env python3
"""Refresh curated CPT and locality JSON from the CMS RVU26A non-QP CSVs.

Usage: python3 scripts/build_cms_data.py PPRRVU2026_Jan_nonQPP.csv GPCI2026.csv
Both CSVs are in the CMS RVU26A archive. See --help for alternate paths.
"""

import argparse
import csv
import json
import math
from pathlib import Path
from tempfile import NamedTemporaryFile

ROOT = Path(__file__).resolve().parents[1]
SOURCE = "https://www.cms.gov/medicare/payment/fee-schedules/physician/pfs-relative-value-files/rvu26a"


def records(path, header_prefix):
    with path.open(encoding="cp1252", newline="") as stream:
        rows = csv.reader(stream)
        for row in rows:
            header = [value.strip().lstrip("\ufeffï»¿") for value in row]
            if header[:len(header_prefix)] == header_prefix:
                if header_prefix == ["HCPCS", "MOD"]:
                    if header[3:11] != ["CODE", "PAYMENT", "RVU", "PE RVU", "INDICATOR",
                                       "PE RVU", "INDICATOR", "RVU"]:
                        raise ValueError(f"{path}: unexpected RVU26A column layout")
                    header[5:11] = ["Work RVU", "Non-facility PE RVU", "Non-facility NA",
                                    "Facility PE RVU", "Facility NA", "MP RVU"]
                break
        else:
            raise ValueError(f"{path}: missing CMS header {header_prefix}")
        for row in rows:
            if row and row[0].strip():
                yield dict(zip(header, (value.strip() for value in row)))


def value(raw):
    if raw in {"", "NA", "N/A"}:
        return None
    number = float(raw)
    if not math.isfinite(number) or number < 0:
        raise ValueError(f"Invalid CMS numeric value: {raw}")
    return number


def code_data(path, editorial):
    selected = {entry["code"]: entry for entry in editorial}
    if len(selected) != len(editorial):
        raise ValueError("Duplicate curated CPT code")
    result = {}
    for row in records(path, ["HCPCS", "MOD"]):
        code = row["HCPCS"]
        if code not in selected or row["MOD"]:
            continue
        if code in result or row["FACTOR"] != "33.4009":
            raise ValueError(f"{code}: duplicate row or unexpected conversion factor")
        result[code] = {
            **selected[code],
            "status": row["CODE"],
            "workRvu": value(row["Work RVU"]),
            "nonFacilityPeRvu": value(row["Non-facility PE RVU"]),
            "facilityPeRvu": value(row["Facility PE RVU"]),
            "mpRvu": value(row["MP RVU"]),
            "nonFacilityAvailable": row["CODE"] in {"A", "T", "R"} and not row["Non-facility NA"],
            "facilityAvailable": row["CODE"] in {"A", "T", "R"} and not row["Facility NA"],
        }
    if missing := selected.keys() - result.keys():
        raise ValueError(f"Missing unmodified CMS rows: {', '.join(sorted(missing))}")
    return [result[code] for code in selected]


def locality_data(path):
    national = dict(id="national", name="National Average", state=None, mac=None,
                    localityNumber=None, workGpci=1.0, peGpci=1.0, mpGpci=1.0)
    result = {national["id"]: national}
    for row in records(path, ["Medicare Administrative Contractor (MAC)", "State"]):
        mac = row["Medicare Administrative Contractor (MAC)"]
        if not mac.isdigit():
            continue
        number = row["Locality Number"]
        key = f"{mac}-{number}"
        if key in result:
            raise ValueError(f"Duplicate CMS locality: {key}")
        indices = {
            "workGpci": value(row["2026 PW GPCI (with 1.0 Floor)"]),
            "peGpci": value(row["2026 PE GPCI"]),
            "mpGpci": value(row["2026 MP GPCI"]),
        }
        if any(index is None or index <= 0 for index in indices.values()):
            raise ValueError(f"{key}: incomplete or invalid GPCI values")
        result[key] = dict(id=key, name=row["Locality Name"].rstrip("*"),
                           state=row["State"], mac=mac, localityNumber=number, **indices)
    return list(result.values())


def write_json(path, payload):
    with NamedTemporaryFile("w", encoding="utf-8", dir=path.parent, delete=False) as stream:
        temporary = Path(stream.name)
        try:
            json.dump(payload, stream, indent=2, ensure_ascii=False, allow_nan=False)
            stream.write("\n")
            stream.close()
            temporary.chmod(0o644)
            temporary.replace(path)
        finally:
            temporary.unlink(missing_ok=True)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("rvu_csv", type=Path)
    parser.add_argument("gpci_csv", type=Path)
    parser.add_argument("--editorial", type=Path, default=ROOT / "data/cpt_codes.json",
                        help="Existing curated code JSON with a codes array")
    parser.add_argument("--codes-output", type=Path, default=ROOT / "data/cpt_codes.json")
    parser.add_argument("--localities-output", type=Path, default=ROOT / "data/gpci_localities.json")
    args = parser.parse_args()

    try:
        editorial = json.loads(args.editorial.read_text(encoding="utf-8"))["codes"]
        codes = code_data(args.rvu_csv, editorial)
        localities = locality_data(args.gpci_csv)
        metadata = dict(year=2026, release="RVU26A", source=SOURCE)
        write_json(args.codes_output, dict(**metadata, codes=codes))
        write_json(args.localities_output, dict(**metadata, localities=localities))
    except (OSError, ValueError, KeyError) as error:
        parser.exit(1, f"CMS import failed: {error}\n")


if __name__ == "__main__":
    main()
