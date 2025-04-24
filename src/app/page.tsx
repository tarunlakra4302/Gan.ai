"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="flex flex-col h-screen w-full items-center justify-center bg-gradient-to-br from-sky-50 to-indigo-50 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: "spring", stiffness: 60 }}
        className="z-10 flex flex-col gap-6 items-center"
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold tracking-tight text-indigo-700 drop-shadow-md"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          HealthVoice AI
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-indigo-900/80 mb-6 font-medium"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          Simplifying healthcare through voice.
        </motion.p>
        <motion.div
          className="flex flex-row gap-5 w-full justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link href="/prescription" passHref legacyBehavior>
            <Button size="lg" className="bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition-colors">
              Start Prescription
            </Button>
          </Link>
          <Link href="/checkin" passHref legacyBehavior>
            <Button size="lg" variant="outline" className="border-indigo-600 text-indigo-700 shadow-md hover:bg-indigo-50">
              Start Post-Op Check-In
            </Button>
          </Link>
        </motion.div>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 }}>
          <Link href="/signup" passHref legacyBehavior>
            <Button size="sm" className="mt-9 bg-white text-indigo-700 border-2 border-indigo-600 hover:bg-indigo-50 shadow-none">
              Sign Up / Log In
            </Button>
          </Link>
        </motion.div>
      </motion.div>
      {/* Decorative 3D/Animated BG element placeholder for later */}
      <div className="absolute left-0 top-0 z-0 w-full h-full pointer-events-none select-none">
        {/* Optionally add animated SVG or Three.js in future releases */}
      </div>
    </main>
  );
}
