"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function PostOpPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-b from-purple-50 to-pink-50">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Post-Op Check-In</h1>
          <p className="text-lg">How are you feeling today?</p>
        </div>
        
        <Card className="p-6">
          <Button 
            onClick={() => window.location.href = "/"}
            className="w-full"
          >
            Return to Home
          </Button>
        </Card>
      </div>
    </main>
  );
}
