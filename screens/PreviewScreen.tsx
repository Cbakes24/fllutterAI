// /screens/PreviewScreen.tsx

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import * as Sharing from "expo-sharing";

const themes = {
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
};

export default function PreviewScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  // If no message exists or it's the default placeholder, redirect back to Compose
  if (!route.params?.message || route.params.message === "Enter your message here...") {
    alert("Please write a message in the Compose tab first");
    navigation.navigate("Compose");
    return null;
  }

  const { message, letterImage, theme } = route.params as {
    message: string;
    letterImage: string | null; 
    theme: keyof typeof themes;
  };

  const selectedTheme = themes[theme] || themes.thankYou;

  // Generate PDF Function
  const generatePDF = async () => {
    const htmlContent = `
      <html>
        <head>
          <style>
            body {
              font-family: sans-serif;
              padding: 24px;
              background-color: ${selectedTheme.bgColor};
              color: ${selectedTheme.fontColor};
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
            backgroundColor: selectedTheme.bgColor,
            borderColor: selectedTheme.fontColor,
          },
        ]}
      >
        <Text style={{ fontFamily: "Handwriting", fontSize: 20 }}>
          {message}
        </Text>
        {letterImage && (
          <Image
            source={{ uri: letterImage }}
            style={styles.previewImage}
            resizeMode="cover"
          />
        )}
      </View>

      <Pressable
        style={styles.pressable}
        onPress={() => {
          generatePDF();
        }}
      >
        <Text style={styles.pressableText}>Download as PDF</Text>
      </Pressable>

      <Pressable
        style={[styles.pressable, { backgroundColor: "#999" }]}
        onPress={() => navigation.goBack()}
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
    borderWidth: 2,
    width: "100%",
    minHeight: 200,
    marginBottom: 30,
  },
  messageText: {
    fontSize: 18,
    lineHeight: 28,
    marginBottom: 10,
  },
  previewImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
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
