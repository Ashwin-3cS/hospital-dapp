"use client";

import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState({
    hospital: false,
    pharmacy: false,
  });

  const handleClick = (dashboard: "hospital" | "pharmacy") => {
    setIsLoading((prev) => ({ ...prev, [dashboard]: true }));
  };

  return (
    <main>
      <Hero />
      <Features />
      <div className="container mx-auto px-6 py-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Access Dashboards</h2>
        <div className="space-x-4">
          <Button asChild disabled={isLoading.hospital}>
            <Link href="/hospital" onClick={() => handleClick("hospital")}>
              {isLoading.hospital ? "Loading..." : "Hospital Dashboard"}
            </Link>
          </Button>
          <Button asChild disabled={isLoading.pharmacy}>
            <Link href="/pharmacy" onClick={() => handleClick("pharmacy")}>
              {isLoading.pharmacy ? "Loading..." : "Pharmacy Dashboard"}
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
