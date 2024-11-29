// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";

// export function Navbar() {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };
//     window.addEventListener("'scroll'", handleScroll);
//     return () => window.removeEventListener("'scroll'", handleScroll);
//   }, []);

//   const handleAuthAction = () => {
//     setIsLoggedIn(!isLoggedIn);
//   };

//   return (
//     <nav
//       className={`fixed w-full z-10 transition-all duration-300 ${
//         isScrolled ? "'bg-white shadow-md'" : "'bg-transparent'"
//       }`}
//     >
//       <div className="container mx-auto px-6 py-3 flex justify-between items-center">
//         <Link href="/" className="text-2xl font-bold text-black">
//           HealthChain
//         </Link>
//         {isLoggedIn ? (
//           <>
//             <Link
//               href="/dashboard"
//               className="mr-4 text-black hover:text-gray-700 transition-colors duration-300"
//             >
//               Dashboard
//             </Link>
//             <Button
//               variant="outline"
//               className="bg-white text-black border-black hover:bg-black hover:text-white transition-colors duration-300"
//               onClick={handleAuthAction}
//             >
//               Disconnect Wallet
//             </Button>
//           </>
//         ) : (
//           <Button
//             variant="outline"
//             className="bg-white text-black border-black hover:bg-black hover:text-white transition-colors duration-300"
//             onClick={handleAuthAction}
//           >
//             Connect Wallet
//           </Button>
//         )}
//       </div>
//     </nav>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import toast, { Toaster } from "react-hot-toast";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { address } = useAccount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!address) {
      toast.error("Connect Wallet.", { duration: 2000 });
    }
  }, [address]);

  return (
    <nav
      className={`fixed w-full z-10 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-black">
          HealthChain
        </Link>

        <div className="flex items-center gap-4">
          {address && (
            <Link
              href="/dashboard"
              className="text-black hover:text-gray-700 transition-colors duration-300"
            >
              Dashboard
            </Link>
          )}

          <ConnectButton
            accountStatus="address"
            showBalance={false}
            chainStatus="icon"
          />
        </div>
      </div>
      <Toaster />
    </nav>
  );
}
