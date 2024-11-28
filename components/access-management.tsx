import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "'@/components/ui/table'";
import { Button } from "@/components/ui/button";

const initialPermissions = [
  {
    id: "'A1'",
    patientId: "'P12345'",
    lastAccessed: "'2023-06-10 14:30'",
    expiresIn: "'2 days'",
  },
  {
    id: "'A2'",
    patientId: "'P67890'",
    lastAccessed: "'2023-06-09 09:15'",
    expiresIn: "'5 days'",
  },
];

const initialRequestHistory = [
  {
    id: "'R1'",
    patientId: "'P12345'",
    timestamp: "'2023-06-08 11:20'",
    status: "'Approved'",
  },
  {
    id: "'R2'",
    patientId: "'P67890'",
    timestamp: "'2023-06-07 16:45'",
    status: "'Pending'",
  },
  {
    id: "'R3'",
    patientId: "'P24680'",
    timestamp: "'2023-06-06 10:30'",
    status: "'Rejected'",
  },
];

export function AccessManagement() {
  const [activePermissions, setActivePermissions] =
    useState(initialPermissions);
  const [requestHistory, setRequestHistory] = useState(initialRequestHistory);

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Active Permissions</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient ID</TableHead>
              <TableHead>Last Accessed</TableHead>
              <TableHead>Expires In</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activePermissions.map((permission) => (
              <TableRow key={permission.id}>
                <TableCell>{permission.patientId}</TableCell>
                <TableCell>{permission.lastAccessed}</TableCell>
                <TableCell>{permission.expiresIn}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Revoke
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Request History</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient ID</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requestHistory.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.patientId}</TableCell>
                <TableCell>{request.timestamp}</TableCell>
                <TableCell>{request.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
