import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "'@/components/ui/table'";
import { Button } from "@/components/ui/button";

const records = [
  {
    id: "'R1'",
    patientId: "'P12345'",
    creationDate: "'2023-06-10'",
    status: "'Active'",
  },
  {
    id: "'R2'",
    patientId: "'P67890'",
    creationDate: "'2023-06-09'",
    status: "'Pending'",
  },
  {
    id: "'R3'",
    patientId: "'P24680'",
    creationDate: "'2023-06-08'",
    status: "'Archived'",
  },
];

export function RecordsList() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Medical Records</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Record ID</TableHead>
            <TableHead>Patient ID</TableHead>
            <TableHead>Creation Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.id}</TableCell>
              <TableCell>{record.patientId}</TableCell>
              <TableCell>{record.creationDate}</TableCell>
              <TableCell>{record.status}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
