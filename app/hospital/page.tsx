import { PatientSearch } from "@/components/patient-search";
import { RequestAccessPanel } from "@/components/request-access-panel";
import { CurrentQueuePanel } from "@/components/current-queue-panel";
import { QueueControlInterface } from "@/components/queue-control-interface";

export default function HospitalDashboard() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <PatientSearch />
        <RequestAccessPanel />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Queue Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <CurrentQueuePanel />
          <QueueControlInterface />
        </div>
      </div>
    </div>
  );
}
