"use client";

import React, { useState } from "react";
import SplashScreen from "./SplashScreen";
import SmoothScrollProvider from "./providers/SmoothScroll";
import { ChatProvider } from "./providers/ChatProvider";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <SmoothScrollProvider>
      <ChatProvider>
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
      </ChatProvider>
    </SmoothScrollProvider>
  );
}


