"use client";

import React, { useState } from "react";
import SplashScreen from "./SplashScreen";
import SmoothScrollProvider from "./providers/SmoothScroll";
import { ChatProvider } from "./providers/ChatProvider";
import Subpage3DBackground from "./Subpage3DBackground";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <SmoothScrollProvider>
      <ChatProvider>
        {/* Global Scroll-Reactive 3D OG Background Layer for all Subpages (z-10) */}
        <Subpage3DBackground isAppReady={!showSplash} />

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


