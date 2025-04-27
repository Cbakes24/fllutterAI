// /screens/PreviewScreen.tsx

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import * as Sharing from "expo-sharing";
import { useFlutter } from "../context/FlutterContext";
import { useEffect, useState } from "react";
import { letterThemes } from "../utils/letterThemes";

export default function PreviewScreen() {
  const {
    message,
    setMessage,
    letterImage,
    setLetterImage,
    selectedTheme,
    setSelectedTheme,
    fontName,
    setFontName,
    setFontUrl,
  } = useFlutter();
  const navigation = useNavigation();

  // If no message exists or it's the default placeholder, redirect back to Compose
  if (!message || message === "Enter your message here...") {
    alert("Please write a message in the Compose tab first");
    navigation.navigate("Compose");
    return null;
  }

  const selectedThemeStyles = letterThemes[selectedTheme] || letterThemes.thankYou;
  // const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

  // useEffect(() => {
  //   const subscription = Dimensions.addEventListener('change', ({ window }) => {
  //     setScreenWidth(window.width);
  //   });

  //   return () => subscription.remove();
  // }, []);

  const { width } = useWindowDimensions();

  // Generate PDF Function
  // add bgImage conditional
  const generatePDF = async () => {
    const htmlContent = `
      <html>
        <head>
          <style>
            body {
              font-family: sans-serif;
              padding: 24px;
             
              background-color: ${selectedThemeStyles.bgColor};
              color: ${selectedThemeStyles.fontColor};
            }
            .message {
              font-size: 18px;
              line-height: 1.6;
              margin-bottom: 20px;
            }
            .image {
              max-width: 100%;
              height: auto;
              border-radius: 8px;
            }
          </style>
        </head>
        <body>
          <div class="message">${message.replace(/\n/g, "<br/>")}</div>
          ${letterImage ? `<img class="image" src="${letterImage}" />` : ""}
        </body>
      </html>
    `;

    try {
      const isSharingAvailable = await Sharing.isAvailableAsync();

      if (!isSharingAvailable) {
        alert(
          "PDF export isn't available in Expo Go.\n\nTo use this feature, you'll need a custom Expo dev build (EAS)."
        );
        return;
      }

      const { uri } = await RNHTMLtoPDF.convert({
        html: htmlContent,
        fileName: "my-flutter-letter",
        base64: false,
      });

      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error("PDF generation error:", error);
      alert("Something went wrong creating your Flutter!");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Your Flutter Preview 💌</Text>

      <View
        style={[
          styles.previewBox,
          {
            borderColor: selectedThemeStyles.fontColor,
            width: width > 600 ? 600 : 400,
            overflow: "hidden",
          },
        ]}
      >
        {letterThemes[selectedTheme].bgImage ? (
          <Image
            source={letterThemes[selectedTheme].bgImage}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
            }}
            resizeMode="cover"
          />
        ) : (
          <View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundColor: letterThemes[selectedTheme].bgColor,
            }}
          />
        )}
        <Text
          style={{
            fontFamily: fontName,
            fontSize: 20,
            color: letterThemes[selectedTheme].fontColor,
            zIndex: 1,
          }}
        >
          {message}
        </Text>
        {letterImage && (
          <Image
            source={{ uri: letterImage }}
            style={[styles.previewImage, { zIndex: 1 }]}
            resizeMode="cover"
          />
        )}
      </View>

      <Pressable style={styles.pressable} onPress={generatePDF}>
        <Text style={styles.pressableText}>Download as PDF</Text>
      </Pressable>

      <Pressable
        style={[styles.pressable, { backgroundColor: "#999" }]}
        onPress={() => navigation.navigate("Compose")}
      >
        <Text style={styles.pressableText}>Back to Compose</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
  },
  previewBox: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 5,
    width: 500,
    minHeight: 200,
    marginBottom: 30,
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
  },
  messageText: {
    fontSize: 18,
    lineHeight: 28,
    flexWrap: "wrap",
    flex: 1,
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
    // float: "right", // This won't work in RN but shows intent
    marginTop: 50,
    alignSelf: "center",
  },

  pressable: {
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  pressableText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
