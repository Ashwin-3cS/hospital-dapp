import { Sidebar } from "@/components/pharmacy-sidebar";

export default function PharmacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8 bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
          <p className="text-sm text-gray-600">Wallet: 0x9876...5432</p>
          <p className="text-sm text-gray-600">Pharmacy ID: P54321</p>
          <p className="text-sm text-green-600">
            Associated with City Hospital
          </p>
        </div>
        {children}
      </main>
    </div>
  );
}
