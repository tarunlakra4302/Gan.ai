"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function PrescriptionPage() {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [medicineName, setMedicineName] = useState("");
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState<{ name: string; usage: string; sideEffects: string } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Example medication explanation
      setExplanation({
        name: selectedFile ? "Medication from prescription" : medicineName,
        usage: "Take one tablet twice daily with food. This medicine helps lower blood pressure by relaxing blood vessels.",
        sideEffects: "May cause dizziness, headache, and upset stomach. Contact your doctor if you experience severe dizziness or fainting."
      });
      setLoading(false);
    }, 2000);
  };

  const handlePlayVoice = () => {
    toast({
      title: "Voice Playback",
      description: "Voice explanation will play here. This feature is under development.",
      duration: 3000,
    });
  };

  const handleShare = () => {
    toast({
      title: "Share",
      description: "Sharing feature is under development.",
      duration: 3000,
    });
  };

  return (
    <main className="min-h-screen p-6 bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-950">
      <div className="container max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400">Upload Your Prescription</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            Take a clear picture of your prescription or type the medicine name to get an explanation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border border-blue-100 dark:border-blue-900 bg-white/90 dark:bg-gray-800/90 backdrop-blur shadow-lg">
            <CardHeader>
              <CardTitle>MediSpeak</CardTitle>
              <CardDescription>Get voice explanations for your medications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 border-2 border-dashed border-blue-200 dark:border-blue-800 rounded-lg text-center cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors">
                  <Label htmlFor="prescription-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center py-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        {selectedFile ? selectedFile.name : "Upload Prescription Photo"}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Click to browse or drag and drop
                      </span>
                    </div>
                  </Label>
                  <Input
                    id="prescription-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>

                <div className="text-center my-2 text-sm text-gray-500">OR</div>

                <div className="space-y-2">
                  <Label htmlFor="medicine-name">Enter Medicine Name</Label>
                  <Input
                    id="medicine-name"
                    placeholder="e.g., Lisinopril, Metformin, etc."
                    value={medicineName}
                    onChange={(e) => setMedicineName(e.target.value)}
                  />
                </div>

                <Button
                  onClick={handleUpload}
                  disabled={(!selectedFile && !medicineName) || loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
                >
                  {loading ? (
                    <>
                      <div className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    "Get Explanation"
                  )}
                </Button>
              </div>

              {explanation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.5 }}
                  className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg"
                >
                  <h3 className="text-lg font-medium text-blue-700 dark:text-blue-300 mb-2">{explanation.name}</h3>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Usage:</span> {explanation.usage}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Side Effects:</span> {explanation.sideEffects}
                    </p>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-800"
                      onClick={handlePlayVoice}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 01-.707-7.07l.707-.708m2.828-9.9a9 9 0 010 12.728" />
                      </svg>
                      Tap to Listen
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-800"
                      onClick={handleShare}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      Share
                    </Button>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <div className="mt-6 text-center">
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ← Back to Home
          </Button>
        </div>
      </div>
    </main>
  );
}