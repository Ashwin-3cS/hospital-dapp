"use client";

import { AccessRequestPanel } from "@/components/access-request-panel";
import { ActivePermissionsPanel } from "@/components/active-permissions-panel";
import { MedicalRecordsTimeline } from "@/components/medical-records-timeline";
import { VirtualQueueCard } from "@/components/virtual-queue-card";

export default function Dashboard() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AccessRequestPanel />
        <ActivePermissionsPanel />
      </div>
      <div className="mt-8">
        <MedicalRecordsTimeline />
      </div>
      <div className="mt-8">
        <VirtualQueueCard />
      </div>
    </>
  );
}
