export const letterThemes = {
  wedding: {
    fontColor: "#7b4b94",
    bgColor: "#f3e8ff",
    label: "Wedding 💍",
  },
  thankYou: {
    fontColor: "#004225",
    bgColor: "#d8f3dc",
    label: "Thank You 💌",
  },
  baby: {
    fontColor: "#3e7cbf",
    bgColor: "#e7f0ff",
    label: "Baby 👶",
  },
  rose1: {
    fontColor: "#000000",
    bgImage: require("../assets/roseLetter1.jpg"),
    label: "Rose 1 🌹",
    bgColor: "pink",
  },
  rose2: {
    fontColor: "#000000",
    bgImage: require("../assets/roseLetter2.jpg"),
    label: "Rose 2 🌹🌹",
    bgColor: "red",
  },
  fancyLines: {
    fontColor: "#000000",
    bgImage: require("../assets/lines.jpg"),
    label: "Fancy Lines ✒️",
    bgColor: "blue",
  },
};

// Type definition for themes
export type ThemeKey = keyof typeof letterThemes;

export type LetterTheme = {
  fontColor: string;
  bgColor?: string;
  bgImage?: any;
  label: string;
}; 
