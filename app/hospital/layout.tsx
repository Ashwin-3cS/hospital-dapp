import { Sidebar } from "@/components/hospital-sidebar";

export default function HospitalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8 bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
          <p className="text-sm text-gray-600">Wallet: 0x1234...5678</p>
          <p className="text-sm text-gray-600">Hospital ID: H12345</p>
          <p className="text-sm text-green-600">Registered</p>
        </div>
        {children}
      </main>
    </div>
  );
}
