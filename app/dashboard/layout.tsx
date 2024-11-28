import { Sidebar } from "@/components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8 bg-white p-4 rounded-lg shadow-md">
          <p className="text-sm text-gray-600">
            Wallet connected: 0x1234...5678
          </p>
        </div>
        {children}
      </main>
    </div>
  );
}
