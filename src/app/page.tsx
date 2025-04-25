"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-50 to-purple-50 dark:from-gray-900 dark:to-blue-950">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4">
            HealthVoice AI
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Simplifying healthcare through voice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <Card className="p-6 border border-blue-100 dark:border-blue-900 hover:shadow-lg transition-shadow duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur">
            <h2 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Start Prescription</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Upload your prescription or type medicine names to get simple voice explanations.</p>
            <Button 
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
              onClick={() => router.push("/prescription")}
            >
              MediSpeak
            </Button>
          </Card>

          <Card className="p-6 border border-purple-100 dark:border-purple-900 hover:shadow-lg transition-shadow duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur">
            <h2 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">Start Post-Op Check-In</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Daily check-ins via voice for post-surgery recovery monitoring.</p>
            <Button 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
              onClick={() => router.push("/post-op")}
            >
              Post-Op Assistant
            </Button>
          </Card>
        </div>

        <div className="mt-10 text-center">
          <Button
            variant="outline"
            className="border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
            onClick={() => router.push("/login")}
          >
            Sign Up / Log In
          </Button>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">For a personalized experience</p>
        </div>
      </div>
    </main>
  );
}