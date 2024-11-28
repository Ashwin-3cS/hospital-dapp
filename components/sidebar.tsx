import Link from "next/link";
import { Home, FileText, Shield, Settings } from "lucide-react";

const navItems = [
  { icon: Home, label: "'Dashboard'", href: "'/dashboard'" },
  { icon: FileText, label: "'Medical Records'", href: "'/dashboard/records'" },
  { icon: Shield, label: "'Permissions'", href: "'/dashboard/permissions'" },
  { icon: Settings, label: "'Settings'", href: "'/dashboard/settings'" },
];

export function Sidebar() {
  return (
    <aside className="bg-black text-white w-64 min-h-screen p-4">
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
