import React, { createContext, useState, useContext, useEffect } from "react";
import * as Font from "expo-font";

type FlutterContextType = {
  message: string;
  setMessage: (message: string) => void;
  letterImage: string | null;
  setLetterImage: (image: string | null) => void;
  selectedTheme: string;
  setSelectedTheme: (theme: string) => void;
  fontLoaded: boolean;
  fontName: string;
  setFontName: (name: string) => void;
  fontUrl: string;
  setFontUrl: (url: string) => void;
};

const FlutterContext = createContext<FlutterContextType | undefined>(undefined);

export function FlutterProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState("Enter your message here...");
  const [letterImage, setLetterImage] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState("thankYou");

  const [fontLoaded, setFontLoaded] = useState(false);
  const [fontName, setFontName] = useState("Handwriting");
  const [fontUrl, setFontUrl] = useState("https://your-supabase-font-url.ttf"); // replace with your test URL
  // const [fontUrl, setFontUrl] = useState("https://grbxgiwcabklftniwqpf.supabase.co/storage/v1/object/public/fonts//Corynewfont.ttf"); // replace with your test URL


  useEffect(() => {
    const loadFontFromURL = async () => {
      if (!fontUrl || !fontName || fontLoaded) return;
  
      try {
        const fileUri = FileSystem.documentDirectory + `${fontName}.ttf`;
        const downloadedFont = await FileSystem.downloadAsync(fontUrl, fileUri);
  
        await Font.loadAsync({
          [fontName]: downloadedFont.uri,
        });
  
        console.log("✅ Font loaded:", fontName);
        setFontLoaded(true);
      } catch (err) {
        console.error("❌ Font load failed:", err);
      }
    };
  
    loadFontFromURL();
  }, [fontUrl, fontName]);

  return (
    <FlutterContext.Provider
      value={{
        message,
        setMessage,
        letterImage,
        setLetterImage,
        selectedTheme,
        setSelectedTheme,
        fontLoaded,
        fontName,
        setFontName,
        fontUrl,
        setFontUrl,
      }}
    >
      {children}
    </FlutterContext.Provider>
  );
}

export function useFlutter() {
  const context = useContext(FlutterContext);
  if (context === undefined) {
    throw new Error("useFlutter must be used within a FlutterProvider");
  }
  return context;
}
