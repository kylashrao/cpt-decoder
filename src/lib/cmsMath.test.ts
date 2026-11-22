import assert from "node:assert/strict";
import { test } from "node:test";
import { calculateCmsRates, NATIONAL_GPCI } from "./cmsMath.ts";

const rvus = { workRvu: 2, nonFacilityPeRvu: 3, facilityPeRvu: 1, mpRvu: 0.5 };
const locality = { workGpci: 1.1, peGpci: 1.2, mpGpci: 0.8 };

test("prices both settings with component-specific national and local GPCIs", () => {
  const rates = calculateCmsRates(rvus, locality);
  assert.ok(Math.abs((rates.national.facility?.allowed ?? NaN) - 116.90315) < 1e-9);
  assert.ok(Math.abs((rates.national.nonFacility?.allowed ?? NaN) - 183.70495) < 1e-9);
  assert.ok(Math.abs((rates.locality.facility?.allowed ?? NaN) - 126.92342) < 1e-9);
  assert.ok(Math.abs((rates.locality.nonFacility?.allowed ?? NaN) - 207.08558) < 1e-9);
});

test("estimates 80/20 coinsurance from the unrounded allowed amount", () => {
  const estimate = calculateCmsRates(rvus, locality).locality.nonFacility;
  assert.ok(estimate);
  assert.equal(estimate.patientCoinsurance, estimate.allowed * 0.2);
  assert.equal(estimate.medicareShare, estimate.allowed * 0.8);
});

test("preserves valid zero RVUs and leaves missing settings unavailable", () => {
  const rates = calculateCmsRates({ ...rvus, workRvu: 0, facilityPeRvu: null }, NATIONAL_GPCI);
  assert.equal(rates.locality.facility, null);
  assert.deepEqual(rates.locality, rates.national);
  assert.ok(rates.locality.nonFacility);
});

test("rejects invalid geographic inputs without losing the national comparison", () => {
  const rates = calculateCmsRates(rvus, { ...locality, mpGpci: NaN });
  assert.equal(rates.locality.nonFacility, null);
  assert.ok(rates.national.nonFacility);
});

test("does not present all-zero RVUs as a payable service", () => {
  const rates = calculateCmsRates({ workRvu: 0, nonFacilityPeRvu: 0, facilityPeRvu: 0, mpRvu: 0 }, locality);
  assert.equal(rates.national.nonFacility, null);
  assert.equal(rates.locality.facility, null);
});
