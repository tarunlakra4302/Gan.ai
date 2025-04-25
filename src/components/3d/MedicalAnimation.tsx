"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import Three.js components to avoid SSR issues
const DynamicScene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => <LoadingFallback />,
});

function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
    </div>
  );
}

export default function MedicalAnimation() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <LoadingFallback />;

  return (
    <div className="w-full h-[350px] relative overflow-hidden rounded-lg">
      <DynamicScene />
    </div>
  );
}

