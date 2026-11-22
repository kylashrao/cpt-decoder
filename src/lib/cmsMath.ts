export const CONVERSION_FACTOR = 33.4009;

export interface Rvus {
  workRvu: number | null;
  nonFacilityPeRvu: number | null;
  facilityPeRvu: number | null;
  mpRvu: number | null;
}

export interface Gpci {
  workGpci: number;
  peGpci: number;
  mpGpci: number;
}

export const NATIONAL_GPCI: Gpci = { workGpci: 1, peGpci: 1, mpGpci: 1 };

function validRvu(value: number | null): value is number {
  return value !== null && Number.isFinite(value) && value >= 0;
}

function estimate(work: number | null, pe: number | null, mp: number | null, gpci: Gpci) {
  if (!validRvu(work) || !validRvu(pe) || !validRvu(mp)) return null;
  const allowed = (work * gpci.workGpci + pe * gpci.peGpci + mp * gpci.mpGpci) * CONVERSION_FACTOR;
  if (!Number.isFinite(allowed) || allowed <= 0) return null;
  return { allowed, medicareShare: allowed * 0.8, patientCoinsurance: allowed * 0.2 };
}

export function calculateCmsRates(rvus: Rvus, locality: Gpci) {
  const { workRvu, nonFacilityPeRvu, facilityPeRvu, mpRvu } = rvus;
  const validLocality = [locality.workGpci, locality.peGpci, locality.mpGpci]
    .every((value) => Number.isFinite(value) && value > 0);

  return {
    national: {
      facility: estimate(workRvu, facilityPeRvu, mpRvu, NATIONAL_GPCI),
      nonFacility: estimate(workRvu, nonFacilityPeRvu, mpRvu, NATIONAL_GPCI),
    },
    locality: {
      facility: validLocality ? estimate(workRvu, facilityPeRvu, mpRvu, locality) : null,
      nonFacility: validLocality ? estimate(workRvu, nonFacilityPeRvu, mpRvu, locality) : null,
    },
  };
}
