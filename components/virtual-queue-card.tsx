"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

export function VirtualQueueCard() {
  const [hospital, setHospital] = useState("''");
  const [department, setDepartment] = useState("''");
  const [purpose, setPurpose] = useState("''");
  const [isLoading, setIsLoading] = useState(false);
  const [isInQueue, setIsInQueue] = useState(false);
  const [queuePosition, setQueuePosition] = useState(0);
  const [estimatedWaitTime, setEstimatedWaitTime] = useState(0);
  const [currentServingNumber, setCurrentServingNumber] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsInQueue(true);
      setQueuePosition(10);
      setEstimatedWaitTime(30);
      setCurrentServingNumber(42);
    }, 2000);
  };

  const handleCancel = () => {
    setIsInQueue(false);
    // Implement cancel logic
  };

  const handleConfirmArrival = () => {
    console.log("'Arrival confirmed'");
    // Implement arrival confirmation logic
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Virtual Queue</CardTitle>
      </CardHeader>
      <CardContent>
        {!isInQueue ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Select value={hospital} onValueChange={setHospital}>
              <SelectTrigger>
                <SelectValue placeholder="Select Hospital" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="city-hospital">City Hospital</SelectItem>
                <SelectItem value="central-clinic">Central Clinic</SelectItem>
              </SelectContent>
            </Select>
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
                <SelectItem value="specialist">Specialist</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Purpose of visit"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "'Join Queue'"
              )}
            </Button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-2xl font-bold">
                Your position: #{queuePosition}
              </p>
              <p>Estimated wait time: {estimatedWaitTime} minutes</p>
              <p>Currently serving: #{currentServingNumber}</p>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-black"
                style={{
                  width: `${
                    (currentServingNumber /
                      (currentServingNumber + queuePosition)) *
                    100
                  }%`,
                }}
              ></div>
            </div>
            <div className="flex justify-between">
              <Button onClick={handleCancel} variant="outline">
                Cancel
              </Button>
              <Button onClick={handleConfirmArrival}>I'm here</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
