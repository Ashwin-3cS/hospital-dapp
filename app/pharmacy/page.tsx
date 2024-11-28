import { PatientSearchPharmacy } from "@/components/patient-search-pharmacy";

export default function PharmacyDashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Pharmacy Dashboard</h1>
      <PatientSearchPharmacy />
    </div>
  );
}
