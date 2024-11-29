import Link from "next/link";
import { Users, FileText, BarChart2, Settings } from "lucide-react";

const navItems = [
  { icon: Users, label: "Patient Access", href: "/hospital" },
  { icon: FileText, label: "Medical Records", href: "/hospital/records" },
  { icon: BarChart2, label: "Analytics", href: "/hospital/analytics" },
  { icon: Settings, label: "Settings", href: "/hospital/settings" },
];

export function Sidebar() {
  return (
    <aside className="bg-black text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">City Hospital</h1>
      </div>
      <nav>
        <ul>
          {navItems.map((item, index) => (
            <li key={index} className="mb-4">
              <Link
                href={item.href}
                className="flex items-center p-2 rounded hover:bg-gray-800 transition-colors duration-300"
              >
                <item.icon className="mr-2 h-5 w-5" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
