"use client";

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import { HOSPITAL_SYSTEM_ABI, HOSPITAL_SYSTEM_ADDRESS } from "@/lib/abi";

interface Patient {
  patientId: number;
  name: string;
  patientAddress: string;
  medicalHistory: string;
  isRegistered: boolean;
  timestamp: number;
}

export function PatientSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [allPatients, setAllPatients] = useState<Patient[]>([]);
  const [searchResults, setSearchResults] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadPatients = async () => {
    setIsLoading(true);

    try {
      if (typeof window.ethereum === "undefined") {
        toast.error("Please install MetaMask to perform this action!");
        setIsLoading(false);
        return;
      }

      // Request account access
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Create a new Web3Provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      // Create a contract instance
      const contract = new ethers.Contract(
        HOSPITAL_SYSTEM_ADDRESS!,
        HOSPITAL_SYSTEM_ABI,
        provider
      );

      // Get the filter for PatientRegistered events
      const filter = contract.filters.PatientRegistered();

      // Query past PatientRegistered events
      const events = await contract.queryFilter(filter, 0, "latest");

      const patients: Patient[] = [];

      for (const event of events) {
        const { patientId } = event.args;

        // Fetch patient details from the contract
        const patientData = await contract.patients(patientId);

        patients.push({
          patientId: patientData.patientId.toNumber(),
          name: patientData.name,
          patientAddress: patientData.patientAddress,
          medicalHistory: patientData.medicalHistory,
          isRegistered: patientData.isRegistered,
          timestamp: patientData.timestamp.toNumber(),
        });
      }

      setAllPatients(patients);
    } catch (error: any) {
      console.error("Error loading patients:", error);
      toast.error("Error loading patient data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const results = allPatients.filter((patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(results);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Patient Search</h2>
      <form onSubmit={handleSearch} className="flex mb-4">
        <Input
          type="text"
          placeholder="Search patients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow mr-2"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            "Loading..."
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" /> Search
            </>
          )}
        </Button>
      </form>
      {searchResults.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Results</h3>
          {searchResults.map((patient) => (
            <div
              key={patient.patientId}
              className="bg-gray-100 p-4 rounded-md mb-2"
            >
              <p className="font-semibold">{patient.name}</p>
              <p className="text-sm text-gray-600">ID: {patient.patientId}</p>
              <p className="text-sm text-gray-600">
                Address: {patient.patientAddress}
              </p>
              <p className="text-sm text-gray-600">
                Medical History: {patient.medicalHistory}
              </p>
            </div>
          ))}
        </div>
      )}
      {searchResults.length === 0 && !isLoading && (
        <p className="text-center text-gray-500">No results found.</p>
      )}
    </div>
  );
}
