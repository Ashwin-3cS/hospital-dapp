"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ethers } from "ethers";
import { HOSPITAL_SYSTEM_ABI, HOSPITAL_SYSTEM_ADDRESS } from "@/lib/abi";
import { useAccount } from "wagmi";

interface Request {
  id: string;
  patientId: string;
  status: RequestStatus;
  timestamp: string;
}

type RequestStatus = "pending" | "approved" | "rejected";

export function RequestAccessPanel() {
  const { address, isConnected } = useAccount();
  const [patientId, setPatientId] = useState("");
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Function to fetch access requests from the blockchain
  const fetchRequests = async () => {
    try {
      if (!isConnected || !address) {
        setError("Please connect your wallet");
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        HOSPITAL_SYSTEM_ADDRESS,
        HOSPITAL_SYSTEM_ABI,
        provider
      );

      // Create a filter for AccessRequested events where the requester is the connected address
      const filter = contract.filters.AccessRequested(null, address, null);
      const events = await contract.queryFilter(filter);

      // Map events to Request objects
      const requestPromises = events.map(async (event, index) => {
        const block = await event.getBlock();
        const status = await getRequestStatus(event.args.patientId, address);

        return {
          id: `${event.transactionHash}-${index}`,
          patientId: event.args.patientId.toString(),
          status: status as RequestStatus,
          timestamp: new Date(block.timestamp * 1000).toLocaleString(),
        };
      });

      const fetchedRequests = await Promise.all(requestPromises);

      // Sort requests by timestamp in descending order
      setRequests(
        fetchedRequests.sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        )
      );
    } catch (err) {
      console.error("Error fetching requests:", err);
      setError("Failed to fetch requests");
    }
  };

  // Function to get the status of a request (placeholder implementation)
  const getRequestStatus = async (patientId: number, accessor: string) => {
    // Implement logic to retrieve the actual status from your smart contract
    // For now, assume all requests are 'pending'
    return "pending";
  };

  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) {
      setError("Please connect your wallet");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        HOSPITAL_SYSTEM_ADDRESS,
        HOSPITAL_SYSTEM_ABI,
        signer
      );

      // Send transaction to accessPatientData
      const tx = await contract.accessPatientData(patientId);

      // Wait for the transaction to be mined
      await tx.wait();

      // Fetch updated requests
      await fetchRequests();

      setPatientId("");
    } catch (err: any) {
      console.error("Error requesting access:", err);
      setError(err.reason || "Failed to request access");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: RequestStatus) => {
    switch (status) {
      case "pending":
        return "text-gray-600";
      case "approved":
        return "text-green-600";
      case "rejected":
        return "text-red-600";
      default:
        return "";
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
        <Button type="submit" disabled={loading}>
          {loading ? "Requesting..." : "Request Access"}
        </Button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <h3 className="text-xl font-semibold mb-2">Request Status</h3>
        {requests.length === 0 ? (
          <p>No access requests found.</p>
        ) : (
          requests.map((request) => (
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
                {request.status.charAt(0).toUpperCase() +
                  request.status.slice(1)}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
