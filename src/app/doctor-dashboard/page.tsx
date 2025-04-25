"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function DoctorDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  
  // Mock patient data
  const patients = [
    { 
      id: "pat-1", 
      name: "John Doe", 
      status: "No issues", 
      lastCheckIn: "2023-04-20", 
      condition: "Post-op recovery (Knee surgery)",
      progress: 80
    },
    { 
      id: "pat-2", 
      name: "Jane Smith", 
      status: "Pain detected", 
      lastCheckIn: "2023-04-23", 
      condition: "Post-op recovery (Appendectomy)",
      progress: 65
    },
    { 
      id: "pat-3", 
      name: "Bob Johnson", 
      status: "No issues", 
      lastCheckIn: "2023-04-22", 
      condition: "Post-op recovery (Hernia repair)",
      progress: 90
    },
  ];
  
  // Check if user is logged in and is a doctor
  if (!user || user.role !== "doctor") {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold text-center mb-4">Access Restricted</h2>
            <p className="text-center mb-6 text-gray-600 dark:text-gray-300">
              You need to be logged in as a doctor to access this dashboard.
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

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-950">
      <div className="container max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-blue-700 dark:text-blue-400">Doctor Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">Monitor patient progress and responses</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur shadow-md border border-blue-100 dark:border-blue-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{patients.length}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur shadow-md border border-blue-100 dark:border-blue-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500 dark:text-gray-400 font-medium">Patients with Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{patients.filter(p => p.status === "Pain detected").length}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur shadow-md border border-blue-100 dark:border-blue-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500 dark:text-gray-400 font-medium">Average Recovery</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {Math.round(patients.reduce((acc, p) => acc + p.progress, 0) / patients.length)}%
              </p>
            </CardContent>
          </Card>
        </div>
        
        <h2 className="text-xl font-semibold mt-10 mb-4 text-blue-700 dark:text-blue-400">Patient List</h2>
        
        <div className="grid gap-4 mb-8">
          {patients.map((patient) => (
            <Card key={patient.id} className="border border-blue-100 dark:border-blue-900 hover:shadow-lg transition-shadow duration-300 bg-white/90 dark:bg-gray-800/90">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 bg-blue-100 dark:bg-blue-900">
                      <AvatarFallback className="text-blue-700 dark:text-blue-300 font-medium">
                        {patient.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-lg font-semibold">{patient.name}</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{patient.condition}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Last check-in: {patient.lastCheckIn}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    patient.status === "Pain detected" 
                      ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" 
                      : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                  }`}>
                    {patient.status}
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Recovery Progress</span>
                    <span className="text-sm font-medium">{patient.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${patient.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <Button 
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => router.push(`/doctor-dashboard/patient/${patient.id}`)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

