import { Switch } from "@/components/ui/switch";

const activePermissions = [
  { id: 1, provider: "'City Hospital'", lastAccessed: "'2023-06-10 15:45'" },
  { id: 2, provider: "'MedPharm'", lastAccessed: "'2023-06-09 10:30'" },
];

export function ActivePermissionsPanel() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Active Permissions</h2>
      {activePermissions.map((permission) => (
        <div
          key={permission.id}
          className="flex items-center justify-between mb-4"
        >
          <div>
            <p className="font-semibold">{permission.provider}</p>
            <p className="text-sm text-gray-600">
              Last accessed: {permission.lastAccessed}
            </p>
          </div>
          <Switch />
        </div>
      ))}
    </div>
  );
}
