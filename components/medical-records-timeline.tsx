import { Button } from "@/components/ui/button";

const medicalRecords = [
  {
    id: 1,
    provider: "'City Hospital'",
    date: "'2023-06-01'",
    type: "'Lab Results'",
  },
  {
    id: 2,
    provider: "'County Clinic'",
    date: "'2023-05-15'",
    type: "'Prescription'",
  },
  {
    id: 3,
    provider: "'MedPharm'",
    date: "'2023-05-10'",
    type: "'Vaccination'",
  },
];

export function MedicalRecordsTimeline() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Medical Records Timeline</h2>
      <div className="space-y-4">
        {medicalRecords.map((record) => (
          <div key={record.id} className="bg-gray-100 p-4 rounded-md">
            <p className="font-semibold">{record.provider}</p>
            <p className="text-sm text-gray-600">{record.date}</p>
            <p className="text-sm text-gray-800 mb-2">{record.type}</p>
            <Button
              variant="outline"
              className="bg-black text-white hover:bg-gray-800"
            >
              View Details
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
