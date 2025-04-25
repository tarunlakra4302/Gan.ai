"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600 dark:text-gray-300">Please log in to view your profile.</p>
      </div>
    );
  }

  const handleUpdateProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen py-12 px-6 bg-gradient-to-b from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">Profile & Settings</h1>
        
        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-4">
            <Card className="border border-gray-200 dark:border-gray-700">
              <CardHeader className="text-center">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarFallback className="text-xl bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {user.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle>{user.name}</CardTitle>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                  <div className="mt-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {user.role === "doctor" ? "Doctor" : "Patient"}
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
          
          <div className="md:col-span-8">
            <Card className="border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <Button onClick={handleUpdateProfile} className="w-full">
                  Update Profile
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 dark:border-gray-700 mt-6">
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications">Enable Notifications</Label>
                  <input 
                    type="checkbox" 
                    id="notifications"
                    className="toggle"
                    defaultChecked
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="language">Language</Label>
                  <select
                    id="language"
                    className="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                    defaultValue="english"
                  >
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

