import React, { createContext, useState, useContext } from 'react';

type FlutterContextType = {
  message: string;
  setMessage: (message: string) => void;
  letterImage: string | null;
  setLetterImage: (image: string | null) => void;
  selectedTheme: string;
  setSelectedTheme: (theme: string) => void;
};

const FlutterContext = createContext<FlutterContextType | undefined>(undefined);

export function FlutterProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState("Enter your message here...");
  const [letterImage, setLetterImage] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState("thankYou");

  return (
    <FlutterContext.Provider 
      value={{ 
        message, 
        setMessage, 
        letterImage, 
        setLetterImage, 
        selectedTheme, 
        setSelectedTheme 
      }}
    >
      {children}
    </FlutterContext.Provider>
  );
}

export function useFlutter() {
  const context = useContext(FlutterContext);
  if (context === undefined) {
    throw new Error('useFlutter must be used within a FlutterProvider');
  }
  return context;
} 
