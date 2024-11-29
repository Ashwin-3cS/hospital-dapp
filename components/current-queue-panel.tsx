"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const getStatusColor = (status: string) => {
  switch (status) {
    case "Waiting":
      return "bg-[#666666]";
    case "Active":
      return "bg-[#2E7D32]";
    case "Emergency":
      return "bg-[#D32F2F]";
    case "Almost":
      return "bg-[#ED6C02]";
    default:
      return "bg-gray-500";
  }
};

export function CurrentQueuePanel() {
  const [currentNumber, setCurrentNumber] = useState(42);
  const [totalInQueue, setTotalInQueue] = useState(15);
  const [estimatedWaitTime, setEstimatedWaitTime] = useState(25);
  const [status, setStatus] = useState("Active");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentNumber((prev) => prev + 1);
      setTotalInQueue((prev) => Math.max(0, prev - 1));
      setEstimatedWaitTime((prev) => Math.max(0, prev - 1));
    }, 10000); // Update every 10 seconds for demo purposes

    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Current Queue Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <div className="text-6xl font-bold font-mono bg-black text-white p-4 rounded-lg w-full text-center">
            {currentNumber.toString().padStart(3, "'0'")}
          </div>
          <div className="text-2xl font-semibold">Now Serving</div>
          <div className="flex justify-between w-full text-lg">
            <span>Total in Queue: {totalInQueue}</span>
            <span>Est. Wait Time: {estimatedWaitTime} min</span>
          </div>
          <Badge
            className={`${getStatusColor(status)} text-white px-4 py-2 text-lg`}
          >
            {status}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
