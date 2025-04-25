"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface PageProps {
  params: {
    id: string;
  };
}

type CheckIn = {
  id: string;
  date: string;
  response: string;
  painLevel: number;
  status: "No issues" | "Pain detected" | "Alert";
};

type Patient = {
  id: string;
  name: string;
  age: number;
  condition: string;
  surgery: string;
  surgeryDate: string;
  progress: number;
  checkIns: CheckIn[];
  medications: string[];
};

export default function PatientDetailsPage({ params }: PageProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"overview" | "checkIns" | "prescriptions">("overview");
  
  // Mock patient data
  const patientData: Record<string, Patient> = {
    "pat-1": {
      id: "pat-1",
      name: "John Doe",
      age: 45,
      condition: "Post-op recovery",
      surgery: "Knee surgery (ACL Repair)",
      surgeryDate: "2023-04-15",
      progress: 80,
      checkIns: [
        { id: "c1", date: "2023-04-20", response: "Feeling much better today. Still some pain when bending the knee.", painLevel: 4, status: "Pain detected" },
        { id: "c2", date: "2023-04-18", response: "Pain is quite severe, especially at night.", painLevel: 7, status: "Alert" },
        { id: "c3", date: "2023-04-16", response: "Just got home from the hospital. Pain is manageable with medication.", painLevel: 5, status: "Pain detected" },
      ],
      medications: ["Ibuprofen 600mg", "Acetaminophen 500mg", "Naproxen 250mg"]
    },
    "pat-2": {
      id: "pat-2",
      name: "Jane Smith",
      age: 32,
      condition: "Post-op recovery",
      surgery: "Appendectomy",
      surgeryDate: "2023-04-18",
      progress: 65,
      checkIns: [
        { id: "c1", date: "2023-04-23", response: "Incision site is a bit red and warm to touch. Some pain.", painLevel: 5, status: "Pain detected" },
        { id: "c2", date: "2023-04-20", response: "Feeling better but still sore around the surgical area.", painLevel: 4, status: "Pain detected" },
      ],
      medications: ["Ibuprofen 400mg", "Cephalexin 500mg"]
    },
    "pat-3": {
      id: "pat-3",
      name: "Bob Johnson",
      age: 58,
      condition: "Post-op recovery",
      surgery: "Hernia repair",
      surgeryDate: "2023-04-10",
      progress: 90,
      checkIns: [
        { id: "c1", date: "2023-04-22", response: "Almost back to normal. Minimal discomfort.", painLevel: 1, status: "No issues" },
        { id: "c2", date: "2023-04-18", response: "Significant improvement. Can walk normally now.", painLevel: 2, status: "No issues" },
        { id: "c3", date: "2023-04-14", response: "Still uncomfortable when sitting up for too long.", painLevel: 4, status: "Pain detected" },
        { id: "c4", date: "2023-04-12", response: "Pain manageable with medication. Limited mobility.", painLevel: 6, status: "Pain detected" },
      ],
      medications: ["Acetaminophen 500mg", "Docusate Sodium 100mg"]
    }
  };
  
  const patient = patientData[params.id];
  
  // Check if user is logged in and is a doctor
  if (!user || user.role !== "doctor") {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold text-center mb-4">Access Restricted</h2>
            <p className="text-center mb-6 text-gray-600 dark:text-gray-300">
              You need to be logged in as a doctor to access this page.
            </p>
            <Button 
              className="w-full" 
              onClick={() => router.push("/login")}
            >
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Patient not found
  if (!patient) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold text-center mb-4">Patient Not Found</h2>
            <p className="text-center mb-6 text-gray-600 dark:text-gray-300">
              The patient you are looking for does not exist.
            </p>
            <Button 
              className="w-full" 
              onClick={() => router.push("/doctor-dashboard")}
            >
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-950">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => router.push("/doctor-dashboard")}
              className="h-9 w-9 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="sr-only">Back</span>
            </Button>
            
            <div>
              <h1 className="text-2xl font-bold text-blue-700 dark:text-blue-400">{patient.name}</h1>
              <p className="text-gray-600 dark:text-gray-300">{patient.surgery} - {patient.condition}</p>
            </div>
          </div>
          
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            patient.checkIns[0]?.status === "Pain detected" 
              ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" 
              : patient.checkIns[0]?.status === "Alert"
                ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
          }`}>
            Latest: {patient.checkIns[0]?.status}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur shadow-md border border-blue-100 dark:border-blue-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500 dark:text-gray-400 font-medium">Surgery Date</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-bold">{patient.surgeryDate}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur shadow-md border border-blue-100 dark:border-blue-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500 dark:text-gray-400 font-medium">Age</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-bold">{patient.age} years</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur shadow-md border border-blue-100 dark:border-blue-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500 dark:text-gray-400 font-medium">Check-ins</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-bold">{patient.checkIns.length}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur shadow-md border border-blue-100 dark:border-blue-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500 dark:text-gray-400 font-medium">Recovery Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <p className="text-lg font-bold">{patient.progress}%</p>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${patient.progress}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab("overview")}
                className={`py-4 px-1 font-medium text-sm border-b-2 ${
                  activeTab === "overview"
                    ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("checkIns")}
                className={`py-4 px-1 font-medium text-sm border-b-2 ${
                  activeTab === "checkIns"
                    ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                Check-Ins
              </button>
              <button
                onClick={() => setActiveTab("prescriptions")}
                className={`py-4 px-1 font-medium text-sm border-b-2 ${
                  activeTab === "prescriptions"
                    ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                Prescriptions
              </button>
            </nav>
          </div>
        </div>
        
        {activeTab === "overview" && (
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur shadow-md border border-blue-100 dark:border-blue-900">
            <CardHeader>
              <CardTitle>Patient Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Medical History</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Patient underwent {patient.surgery} on {patient.surgeryDate}. {patient.condition} is progressing as expected.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Recent Vitals</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Blood Pressure</p>
                    <p className="font-medium">120/80</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Heart Rate</p>
                    <p className="font-medium">72 bpm</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Temperature</p>
                    <p className="font-medium">98.6°F</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Oxygen</p>
                    <p className="font-medium">98%</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-600 dark:bg-blue-400"></div>
                    <div>
                      <p className="font-medium">Check-in Submitted</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{patient.checkIns[0].date}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 mt-1.5 rounded-full bg-green-600 dark:bg-green-400"></div>
                    <div>
                      <p className="font-medium">Prescription Filled</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{patient.surgeryDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {activeTab === "checkIns" && (
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur shadow-md border border-blue-100 dark:border-blue-900">
            <CardHeader>
              <CardTitle>Patient Check-Ins</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {patient.checkIns.map((checkIn) => (
                  <div 
                    key={checkIn.id} 
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <div className="flex justify-between mb-2">
                      <p className="font-medium">{checkIn.date}</p>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        checkIn.status === "Pain detected" 
                          ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" 
                          : checkIn.status === "Alert"
                            ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                            : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                      }`}>
                        {checkIn.status}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      {checkIn.response}
                    </p>
                    
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Pain Level: {checkIn.painLevel}/10</p>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            checkIn.painLevel >= 7 
                              ? "bg-red-600 dark:bg-red-500" 
                              : checkIn.painLevel >= 4
                                ? "bg-orange-600 dark:bg-orange-500"
                                : "bg-green-600 dark:bg-green-500"
                          }`}
                          style={{ width: `${(checkIn.painLevel / 10) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        
        {activeTab === "prescriptions" && (
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur shadow-md border border-blue-100 dark:border-blue-900">
            <CardHeader>
              <CardTitle>Patient Prescriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patient.medications.map((med, index) => (
                  <div 
                    key={index} 
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">{med}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Prescribed on {patient.surgeryDate}
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => router.push("/prescription")}
                    >
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
