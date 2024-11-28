import Link from "next/link";
import { Users, Shield, Clock, Building2, Settings } from "lucide-react";

const navItems = [
  { icon: Users, label: "'Patient Search'", href: "'/pharmacy'" },
  { icon: Shield, label: "'Access Management'", href: "'/pharmacy/access'" },
  { icon: Building2, label: "'Hospital Info'", href: "'/pharmacy/hospital'" },
  { icon: Settings, label: "'Settings'", href: "'/pharmacy/settings'" },
];

export function Sidebar() {
  return (
    <aside className="bg-black text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">MedPharm</h1>
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
