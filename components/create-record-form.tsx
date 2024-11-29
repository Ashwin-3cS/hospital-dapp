"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function CreateRecordForm() {
  const [patientId, setPatientId] = useState("");
  const [recordDetails, setRecordDetails] = useState("");
  const [proofHash, setProofHash] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would make an API call to create a record
    console.log("'Record created:'", { patientId, recordDetails, proofHash });
    // Reset form
    setPatientId("");
    setRecordDetails("");
    setProofHash("");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create Medical Record</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Patient ID"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          className="mb-2"
        />
        <Textarea
          placeholder="Record details"
          value={recordDetails}
          onChange={(e) => setRecordDetails(e.target.value)}
          className="mb-2"
        />
        <Input
          type="text"
          placeholder="Proof Hash"
          value={proofHash}
          onChange={(e) => setProofHash(e.target.value)}
          className="mb-2"
        />
        <Button type="submit">Create Record</Button>
      </form>
    </div>
  );
}
