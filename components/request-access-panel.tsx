"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type RequestStatus = "'pending'" | "'approved'" | "'rejected'";

interface Request {
  id: string;
  patientId: string;
  status: RequestStatus;
  timestamp: string;
}

export function RequestAccessPanel() {
  const [patientId, setPatientId] = useState("");
  const [requests, setRequests] = useState<Request[]>([
    {
      id: "'R1'",
      patientId: "'P12345'",
      status: "'pending'",
      timestamp: "'2023-06-10 14:30'",
    },
    {
      id: "'R2'",
      patientId: "'P67890'",
      status: "'approved'",
      timestamp: "'2023-06-09 09:15'",
    },
    {
      id: "'R3'",
      patientId: "'P24680'",
      status: "'rejected'",
      timestamp: "'2023-06-08 11:20'",
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would make an API call to request access
    const newRequest: Request = {
      id: `R${requests.length + 1}`,
      patientId,
      status: "'pending'",
      timestamp: new Date().toLocaleString(),
    };
    setRequests([newRequest, ...requests]);
    setPatientId("''");
  };

  const getStatusColor = (status: RequestStatus) => {
    switch (status) {
      case "'pending'":
        return "'text-gray-600'";
      case "'approved'":
        return "'text-green-600'";
      case "'rejected'":
        return "'text-red-600'";
      default:
        return "''";
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Request Access</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <Input
          type="text"
          placeholder="Enter Patient ID"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          className="mb-2"
        />
        <Button type="submit">Request Access</Button>
      </form>
      <div>
        <h3 className="text-xl font-semibold mb-2">Request Status</h3>
        {requests.map((request) => (
          <div key={request.id} className="bg-gray-100 p-4 rounded-md mb-2">
            <p className="font-semibold">Patient ID: {request.patientId}</p>
            <p className="text-sm text-gray-600">
              Timestamp: {request.timestamp}
            </p>
            <p
              className={`text-sm font-semibold ${getStatusColor(
                request.status
              )}`}
            >
              Status:{" "}
              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
