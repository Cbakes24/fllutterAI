// /screens/ComposeScreen.tsx
import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  ScrollView,
  Pressable,
  Button,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

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

export default function ComposeScreen() {
  const [message, setMessage] = useState("Enter your message here...");
  const [selectedTheme, setSelectedTheme] = useState("thankYou");
  const [letterImage, setLetterImage] = useState<string | null>(null);
  const navigation = useNavigation();

  const handlePreviewPress = () => {
    if (!message || message === "Enter your message here...") {
      alert("Please write a message before previewing");
      return;
    }

    navigation.navigate("Preview", {
      message,
      letterImage,
      theme: selectedTheme,
    });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setLetterImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Write Your Flutter ✍️</Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Type your message here..."
        value={message}
        onChangeText={setMessage}
        onFocus={() => {
          if (message === "Enter your message here...") {
            setMessage("");
          }
        }}
      />
      <View
        style={{
          backgroundColor: themes[selectedTheme].bgColor,
          padding: 16,
          borderRadius: 10,
        }}
      >
   <Text style={{ fontFamily: 'Handwriting', fontSize: 20 }}>
  {message}
</Text>
        {letterImage && (
          <Image
            source={{ uri: letterImage }}
            style={{ width: 200, height: 200, marginTop: 10 }}
          />
        )}
      </View>
      {/* ***** THEME PICKER ***** */}
      <View style={{ flexDirection: "row", gap: 8 }}>
        {Object.keys(themes).map((themeKey) => (
          <Pressable key={themeKey} onPress={() => setSelectedTheme(themeKey)}>
            <Text
              style={{
                padding: 10,
                borderWidth: 1,
                borderColor: selectedTheme === themeKey ? "black" : "#ccc",
              }}
            >
              {themes[themeKey].label}
            </Text>
          </Pressable>
        ))}
      </View>
      <Pressable style={styles.button} onPress={pickImage}>
        <Text>Add Image to Letter</Text>
      </Pressable>{" "}
      {/* <Button title="Add Image to Letter" onPress={pickImage} /> */}
      {/* {letterImage && (
        <Image
          source={{ uri: letterImage }}
          style={{ width: 200, height: 200 }}
        />
      )} */}
      <Pressable
        onPress={handlePreviewPress}
        style={{
          backgroundColor: "#333",
          padding: 12,
          borderRadius: 8,
          marginTop: 20,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "600" }}>
          Preview Your Flutter
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    minHeight: 200,
    textAlignVertical: "top",
    marginBottom: 32,
  },
  preview: {
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  previewLabel: {
    fontWeight: "500",
    marginBottom: 8,
  },
  previewText: {
    fontSize: 18,
  },
  button: {
    backgroundColor: "lightgray",
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
});
