import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <div className="container mx-auto px-6 py-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Access Dashboards</h2>
        <div className="space-x-4">
          <Button asChild>
            <Link href="/hospital">Hospital Dashboard</Link>
          </Button>
          <Button asChild>
            <Link href="/pharmacy">Pharmacy Dashboard</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
