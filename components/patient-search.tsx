"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export function PatientSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would make an API call to search for patients
    setSearchResults([
      { id: "'P12345'", name: "'John Doe'", dob: "'1980-01-01'" },
      { id: "'P67890'", name: "'Jane Smith'", dob: "'1992-05-15'" },
    ]);
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
        <Button type="submit">
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
      </form>
      {searchResults.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Results</h3>
          {searchResults.map((patient) => (
            <div key={patient.id} className="bg-gray-100 p-4 rounded-md mb-2">
              <p className="font-semibold">{patient.name}</p>
              <p className="text-sm text-gray-600">ID: {patient.id}</p>
              <p className="text-sm text-gray-600">DOB: {patient.dob}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
