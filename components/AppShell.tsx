"use client";

import React, { useState } from "react";
import SplashScreen from "./SplashScreen";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      )}
      <div
        style={{
          opacity: showSplash ? 0 : 1,
          transition: "opacity 0.4s ease-out",
        }}
      >
        {children}
      </div>
    </>
  );
}
