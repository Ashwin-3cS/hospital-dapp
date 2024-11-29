// "use client";

// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ethers } from "ethers";
// import toast, { Toaster } from "react-hot-toast";
// import { X, Eye, EyeOff } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch";
// import { HOSPITAL_SYSTEM_ABI, HOSPITAL_SYSTEM_ADDRESS } from "@/lib/abi";

// interface HospitalAuthModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export function HospitalAuthModal({ isOpen, onClose }: HospitalAuthModalProps) {
//   const [isLogin, setIsLogin] = useState(true);
//   const [hospitalName, setHospitalName] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     if (!isLogin && password !== confirmPassword) {
//       toast.error("Passwords do not match");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       if (isLogin) {
//         console.log("Logging in:", hospitalName);
//         toast.success("Logged in successfully");
//       } else {
//         if (typeof window.ethereum === "undefined") {
//           toast.error("Please install MetaMask to register");
//           return;
//         }

//         await window.ethereum.request({ method: "eth_requestAccounts" });
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         const signer = provider.getSigner();

//         // Switch to Sepolia network
//         try {
//           await window.ethereum.request({
//             method: "wallet_switchEthereumChain",
//             params: [{ chainId: "0xaa36a7" }],
//           });
//         } catch (switchError: any) {
//           if (switchError.code === 4902) {
//             toast.error("Please add Sepolia network to MetaMask");
//             return;
//           }
//           throw switchError;
//         }

//         const contract = new ethers.Contract(
//           HOSPITAL_SYSTEM_ADDRESS!,
//           HOSPITAL_SYSTEM_ABI,
//           signer
//         );

//         const loadingToast = toast.loading("Registering hospital...");
//         const tx = await contract.registerHospital(hospitalName);
//         const receipt = await tx.wait();

//         const event = receipt.events?.find(
//           (e: any) => e.event === "HospitalRegistered"
//         );

//         if (event) {
//           const hospitalId = event.args.hospitalId.toString();
//           toast.dismiss(loadingToast);
//           toast.success(`Hospital registered successfully! ID: ${hospitalId}`);
//           onClose();
//         }
//       }
//     } catch (error: any) {
//       console.error("Error:", error);
//       toast.error(error.message || "An error occurred. Please try again.");
//     }

//     setIsLoading(false);
//   };

//   const getPasswordStrength = (password: string) => {
//     const strength = {
//       1: "Very Weak",
//       2: "Weak",
//       3: "Medium",
//       4: "Strong",
//       5: "Very Strong",
//     };
//     const passwordStrength =
//       (password.length > 8 ? 1 : 0) +
//       (/[A-Z]/.test(password) ? 1 : 0) +
//       (/[a-z]/.test(password) ? 1 : 0) +
//       (/[0-9]/.test(password) ? 1 : 0) +
//       (/[^A-Za-z0-9]/.test(password) ? 1 : 0);
//     return strength[passwordStrength as keyof typeof strength] || "Very Weak";
//   };

//   const modalVariants = {
//     hidden: { opacity: 0, scale: 0.8 },
//     visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
//     exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
//   };

//   const formVariants = {
//     hidden: { opacity: 0, x: -50 },
//     visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
//     exit: { opacity: 0, x: 50, transition: { duration: 0.3 } },
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           <motion.div
//             className="bg-white rounded-lg shadow-xl max-w-md w-full"
//             variants={modalVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//           >
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-2xl font-bold">
//                   {isLogin ? "Hospital Login" : "Hospital Register"}
//                 </h2>
//                 <button
//                   onClick={onClose}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   <X size={24} />
//                 </button>
//               </div>
//               <AnimatePresence mode="wait">
//                 <motion.form
//                   key={isLogin ? "login" : "register"}
//                   variants={formVariants}
//                   initial="hidden"
//                   animate="visible"
//                   exit="exit"
//                   onSubmit={handleSubmit}
//                   className="space-y-4"
//                 >
//                   <div>
//                     <Label htmlFor="hospitalName">Hospital Name</Label>
//                     <Input
//                       id="hospitalName"
//                       type="text"
//                       value={hospitalName}
//                       onChange={(e) => setHospitalName(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="password">Password</Label>
//                     <div className="relative">
//                       <Input
//                         id="password"
//                         type={showPassword ? "text" : "password"}
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowPassword(!showPassword)}
//                         className="absolute right-2 top-1/2 transform -translate-y-1/2"
//                       >
//                         {showPassword ? (
//                           <EyeOff size={20} />
//                         ) : (
//                           <Eye size={20} />
//                         )}
//                       </button>
//                     </div>
//                     {!isLogin && (
//                       <div className="mt-1 text-sm">
//                         Strength: {getPasswordStrength(password)}
//                       </div>
//                     )}
//                   </div>
//                   {!isLogin && (
//                     <div>
//                       <Label htmlFor="confirmPassword">Confirm Password</Label>
//                       <Input
//                         id="confirmPassword"
//                         type="password"
//                         value={confirmPassword}
//                         onChange={(e) => setConfirmPassword(e.target.value)}
//                         required
//                       />
//                     </div>
//                   )}
//                   <div className="flex items-center space-x-2">
//                     <Switch
//                       id="rememberMe"
//                       checked={rememberMe}
//                       onCheckedChange={setRememberMe}
//                     />
//                     <Label htmlFor="rememberMe">Remember me</Label>
//                   </div>
//                   <Button type="submit" className="w-full" disabled={isLoading}>
//                     {isLoading ? (
//                       <motion.div
//                         className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full"
//                         animate={{ rotate: 360 }}
//                         transition={{
//                           duration: 1,
//                           repeat: Infinity,
//                           ease: "linear",
//                         }}
//                       />
//                     ) : isLogin ? (
//                       "Login"
//                     ) : (
//                       "Register"
//                     )}
//                   </Button>
//                 </motion.form>
//               </AnimatePresence>
//               <div className="mt-4 text-center">
//                 <button
//                   onClick={() => setIsLogin(!isLogin)}
//                   className="text-blue-500 hover:underline"
//                 >
//                   {isLogin ? "Need to register?" : "Already have an account?"}
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//           <Toaster position="bottom-center" />
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ethers } from "ethers";
import toast, { Toaster } from "react-hot-toast";
import { X, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { HOSPITAL_SYSTEM_ABI, HOSPITAL_SYSTEM_ADDRESS } from "@/lib/abi";

export function HospitalAuthModal({ isOpen, onClose }: HospitalAuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [hospitalName, setHospitalName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Added readData function
  const readData = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      const contract = new ethers.Contract(
        HOSPITAL_SYSTEM_ADDRESS!,
        HOSPITAL_SYSTEM_ABI,
        signer
      );

      const hospitalId = await contract.addressToHospitalId(address);

      if (hospitalId) {
        window.location.href = "/hospital";
      } else {
        toast.error("Hospital not found for this wallet address");
      }
    } catch (error: any) {
      console.error("Error:", error);
      toast.error("Failed to login. Please try again.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!isLogin && password !== confirmPassword) {
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      if (isLogin) {
        // Call readData function on login
        await readData();
      } else {
        // Registration code remains unchanged
        if (typeof window.ethereum === "undefined") {
          toast.error("Please install MetaMask to register");
          setIsLoading(false);
          return;
        }

        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        // Switch to Sepolia network
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0xaa36a7" }],
          });
        } catch (switchError: any) {
          if (switchError.code === 4902) {
            toast.error("Please add Sepolia network to MetaMask");
            setIsLoading(false);
            return;
          }
          throw switchError;
        }

        const contract = new ethers.Contract(
          HOSPITAL_SYSTEM_ADDRESS!,
          HOSPITAL_SYSTEM_ABI,
          signer
        );

        const loadingToast = toast.loading("Registering hospital...");
        const tx = await contract.registerHospital(hospitalName);
        const receipt = await tx.wait();

        const event = receipt.events?.find(
          (e: any) => e.event === "HospitalRegistered"
        );

        if (event) {
          const hospitalId = event.args.hospitalId.toString();
          toast.dismiss(loadingToast);
          toast.success(`Hospital registered successfully! ID: ${hospitalId}`);
          onClose();
        }
      }
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || "An error occurred. Please try again.");
    }

    setIsLoading(false);
  };

  const getPasswordStrength = (password: string) => {
    const strength = {
      1: "Very Weak",
      2: "Weak",
      3: "Medium",
      4: "Strong",
      5: "Very Strong",
    };
    const passwordStrength =
      (password.length > 8 ? 1 : 0) +
      (/[A-Z]/.test(password) ? 1 : 0) +
      (/[a-z]/.test(password) ? 1 : 0) +
      (/[0-9]/.test(password) ? 1 : 0) +
      (/[^A-Za-z0-9]/.test(password) ? 1 : 0);
    return strength[passwordStrength as keyof typeof strength] || "Very Weak";
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
  };

  const formVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: 50, transition: { duration: 0.3 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-xl max-w-md w-full"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">
                  {isLogin ? "Hospital Login" : "Hospital Register"}
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
              <AnimatePresence mode="wait">
                <motion.form
                  key={isLogin ? "login" : "register"}
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div>
                    <Label htmlFor="hospitalName">Hospital Name</Label>
                    <Input
                      id="hospitalName"
                      type="text"
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                    {!isLogin && (
                      <div className="mt-1 text-sm">
                        Strength: {getPasswordStrength(password)}
                      </div>
                    )}
                  </div>
                  {!isLogin && (
                    <div>
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="rememberMe"
                      checked={rememberMe}
                      onCheckedChange={setRememberMe}
                    />
                    <Label htmlFor="rememberMe">Remember me</Label>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <motion.div
                        className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    ) : isLogin ? (
                      "Login"
                    ) : (
                      "Register"
                    )}
                  </Button>
                </motion.form>
              </AnimatePresence>
              <div className="mt-4 text-center">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-500 hover:underline"
                >
                  {isLogin ? "Need to register?" : "Already have an account?"}
                </button>
              </div>
            </div>
          </motion.div>
          <Toaster position="bottom-center" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
