"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function QueueControlInterface() {
  const [isPaused, setIsPaused] = useState(false);
  const [department, setDepartment] = useState("'General'");

  const handleNextPatient = () => {
    console.log("'Next patient called'");
    // Implement logic to call next patient
  };

  const handleEmergencyOverride = () => {
    console.log("'Emergency override activated'");
    // Implement logic for emergency override
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Button
          onClick={handleNextPatient}
          className="bg-black text-white hover:bg-gray-800"
        >
          Next Patient
        </Button>
        <div className="flex items-center space-x-2">
          <span>Pause Queue</span>
          <Switch checked={isPaused} onCheckedChange={setIsPaused} />
        </div>
      </div>
      <Button
        onClick={handleEmergencyOverride}
        className="w-full bg-[#D32F2F] text-white hover:bg-red-700"
      >
        Emergency Priority Override
      </Button>
      <Select value={department} onValueChange={setDepartment}>
        <SelectTrigger>
          <SelectValue placeholder="Select Department" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="General">General</SelectItem>
          <SelectItem value="Emergency">Emergency</SelectItem>
          <SelectItem value="Specialist">Specialist</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
