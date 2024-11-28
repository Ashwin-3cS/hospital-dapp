import { Button } from "@/components/ui/button";

const pendingRequests = [
  { id: 1, requester: "'City Hospital'", timestamp: "'2023-06-10 14:30'" },
  { id: 2, requester: "'MedPharm'", timestamp: "'2023-06-09 09:15'" },
];

const requestHistory = [
  {
    id: 3,
    requester: "'County Clinic'",
    timestamp: "'2023-06-08 11:20'",
    status: "'Approved'",
  },
  {
    id: 4,
    requester: "'HealthPlus Pharmacy'",
    timestamp: "'2023-06-07 16:45'",
    status: "'Rejected'",
  },
];

export function AccessRequestPanel() {
  return (
    <div
      className="bg-white p-6 rounded-lg shadow-md"
      role="region"
      aria-label="Access Requests"
    >
      <h2 className="text-2xl font-semibold mb-4" id="access-requests-heading">
        Access Requests
      </h2>
      <div className="mb-8">
        <h3
          className="text-xl font-semibold mb-2"
          id="pending-requests-heading"
        >
          Pending Requests
        </h3>
        <ul aria-labelledby="pending-requests-heading">
          {pendingRequests.map((request) => (
            <li key={request.id} className="bg-gray-100 p-4 rounded-md mb-2">
              <p className="font-semibold">{request.requester}</p>
              <p className="text-sm text-gray-600 mb-2">{request.timestamp}</p>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  className="bg-black text-white hover:bg-gray-800"
                >
                  Accept
                </Button>
                <Button
                  variant="outline"
                  className="bg-white text-black border-black hover:bg-gray-200"
                >
                  Reject
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2" id="request-history-heading">
          Request History
        </h3>
        <ul aria-labelledby="request-history-heading">
          {requestHistory.map((request) => (
            <li key={request.id} className="bg-gray-100 p-4 rounded-md mb-2">
              <p className="font-semibold">{request.requester}</p>
              <p className="text-sm text-gray-600">{request.timestamp}</p>
              <p
                className={`text-sm ${
                  request.status === "'Approved'"
                    ? "'text-green-600'"
                    : "'text-red-600'"
                }`}
              >
                {request.status}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
