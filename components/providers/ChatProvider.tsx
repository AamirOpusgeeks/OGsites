'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import AIChatArchitect from '@/components/AIChatArchitect';

interface ChatContextType {
  isChatOpen: boolean;
  openChat: (topic?: string) => void;
  closeChat: () => void;
  toggleChat: () => void;
}

const ChatContext = createContext<ChatContextType>({
  isChatOpen: false,
  openChat: () => {},
  closeChat: () => {},
  toggleChat: () => {},
});

export const useChat = () => useContext(ChatContext);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentTopic, setCurrentTopic] = useState<string | undefined>();

  const openChat = useCallback((topic?: string) => {
    setCurrentTopic(topic);
    setIsChatOpen(true);
  }, []);

  const closeChat = useCallback(() => {
    setIsChatOpen(false);
  }, []);

  const toggleChat = useCallback(() => {
    setIsChatOpen((prev) => !prev);
  }, []);

  return (
    <ChatContext.Provider value={{ isChatOpen, openChat, closeChat, toggleChat }}>
      {children}
      <AIChatArchitect
        isOpen={isChatOpen}
        onClose={closeChat}
        initialTopic={currentTopic}
      />
    </ChatContext.Provider>
  );
}
