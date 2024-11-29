import HospitalSystemABI from './HospitalSystem.json';

export const HOSPITAL_SYSTEM_ABI = HospitalSystemABI;

// If you need the contract address, you can export it as well
export const HOSPITAL_SYSTEM_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

// You can also create a type for the contract
export type HospitalSystemContract = {
  addressToHospitalId: (address: string) => Promise<number>;
  addressToPatientId: (address: string) => Promise<number>;
  addressToPharmacyId: (address: string) => Promise<number>;
  updateAccessPermission: (patientId: number, accessor: string, permission: boolean) => Promise<void>;
  registerHospital: (name: string) => Promise<number>;
  registerPatient: (name: string, medicalHistory: string) => Promise<number>;
  registerPharmacy: (name: string, hospitalId: number) => Promise<number>;
  accessPatientData: (patientId: number) => Promise<void>;
  createMedicalRecord: (patientId: number, proofHash: string) => Promise<void>;
  requestDataAccess: (patientId: number) => Promise<void>;
};

// Export everything as a default object if needed
export default {
  abi: HOSPITAL_SYSTEM_ABI,
  address: HOSPITAL_SYSTEM_ADDRESS,
};