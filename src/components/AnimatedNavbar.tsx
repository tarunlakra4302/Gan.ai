"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AnimatedNavbar() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);
  if (!isMounted || pathname === "/") return null;
  return (
    <motion.nav
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="flex items-center justify-between w-full px-6 h-16 bg-white/70 backdrop-blur border-b border-indigo-100 z-30 fixed top-0 left-0"
    >
      <Link href="/" className="flex items-center">
        <motion.span
          className="text-2xl font-extrabold text-indigo-700 drop-shadow"
          initial={{ rotate: -12 }}
          animate={{ rotate: [0, -6, 2, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4, repeatType: "mirror" }}
        >
          🩺
        </motion.span>
        <span className="ml-2 font-semibold text-indigo-900/80 text-lg tracking-tight">HealthVoice AI</span>
      </Link>
      <div className="flex gap-4">
        <Link href="/prescription" className="text-indigo-700 font-medium hover:underline">Prescriptions</Link>
        <Link href="/checkin" className="text-indigo-700 font-medium hover:underline">Post-Op Check-Ins</Link>
        <Link href="/dashboard" className="text-indigo-700 font-medium hover:underline">Doctor Dashboard</Link>
        <Link href="/profile" className="text-indigo-400 font-medium hover:underline">Profile</Link>
      </div>
    </motion.nav>
  );
}
