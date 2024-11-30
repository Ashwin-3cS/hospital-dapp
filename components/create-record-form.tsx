// "use client";
// import { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";

// export function CreateRecordForm() {
//   const [patientId, setPatientId] = useState("");
//   const [recordDetails, setRecordDetails] = useState("");
//   const [proofHash, setProofHash] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // In a real application, this would make an API call to create a record
//     console.log("'Record created:'", { patientId, recordDetails, proofHash });
//     // Reset form
//     setPatientId("");
//     setRecordDetails("");
//     setProofHash("");
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-2xl font-semibold mb-4">Create Medical Record</h2>
//       <form onSubmit={handleSubmit}>
//         <Input
//           type="text"
//           placeholder="Patient ID"
//           value={patientId}
//           onChange={(e) => setPatientId(e.target.value)}
//           className="mb-2"
//         />
//         <Textarea
//           placeholder="Record details"
//           value={recordDetails}
//           onChange={(e) => setRecordDetails(e.target.value)}
//           className="mb-2"
//         />
//         <Input
//           type="text"
//           placeholder="OTP"
//           value={proofHash}
//           onChange={(e) => setProofHash(e.target.value)}
//           className="mb-2"
//         />
//         <Button type="submit">Create Record</Button>
//       </form>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ethers } from "ethers";
import {
  HOSPITAL_SYSTEM_ABI,
  HOSPITAL_SYSTEM_ADDRESS,
  type HospitalSystemContract,
} from "@/lib/abi";

export function CreateRecordForm() {
  const [patientId, setPatientId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getContract = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        return new ethers.Contract(
          HOSPITAL_SYSTEM_ADDRESS as string,
          HOSPITAL_SYSTEM_ABI,
          signer
        ) as unknown as HospitalSystemContract;
      } catch (error) {
        console.error("Error connecting to wallet:", error);
        alert("Please connect your wallet");
        return null;
      }
    }
    alert("Please install MetaMask");
    return null;
  };

  const handleSendOtp = async () => {
    if (!phoneNumber) {
      alert("Please enter a phone number");
      return;
    }

    try {
      const response = await fetch("/api/verify/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber }),
      });

      if (response.ok) {
        setIsOtpSent(true);
        alert("OTP sent successfully. Please check your phone.");
      } else {
        throw new Error("Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      alert("Please enter OTP");
      return;
    }

    try {
      const response = await fetch("/api/verify/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber, otp }),
      });

      const data = await response.json();
      if (data.success) {
        setIsOtpVerified(true);
        alert("OTP verified successfully");
      } else {
        alert("Invalid OTP");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Failed to verify OTP");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOtpVerified) {
      alert("Please verify OTP first");
      return;
    }

    if (!patientId) {
      alert("Please enter patient ID");
      return;
    }

    setIsLoading(true);
    try {
      const contract = await getContract();
      if (!contract) return;

      const tx = await contract.createMedicalRecord(
        parseInt(patientId),
        otp // Using OTP as proofHash
      );
      await tx.wait();

      alert("Medical record created successfully");

      // Reset form
      setPatientId("");
      setPhoneNumber("");
      setOtp("");
      setIsOtpVerified(false);
      setIsOtpSent(false);
    } catch (error) {
      console.error("Error creating medical record:", error);
      alert("Failed to create medical record");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create Medical Record</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="Patient ID"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="mb-2"
          />
        </div>

        <div className="flex gap-2">
          <Input
            type="tel"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            disabled={isOtpSent}
          />
          <Button
            type="button"
            onClick={handleSendOtp}
            disabled={isOtpSent || isLoading}
          >
            Send OTP
          </Button>
        </div>

        {isOtpSent && (
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              disabled={isOtpVerified}
            />
            <Button
              type="button"
              onClick={handleVerifyOtp}
              disabled={isOtpVerified || isLoading}
            >
              Verify OTP
            </Button>
          </div>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={!isOtpVerified || isLoading}
        >
          {isLoading ? "Creating..." : "Create Record"}
        </Button>
      </form>
    </div>
  );
}
