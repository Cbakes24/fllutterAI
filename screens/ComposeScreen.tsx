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
  const [message, setMessage] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("thankYou");
  const [letterImage, setLetterImage] = useState<string | null>(null);


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
      />
      <View style={styles.preview}>
        <Text style={styles.previewLabel}>Live Preview:</Text>
        <Text style={styles.previewText}>{message}</Text>
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
      <Pressable onPress={pickImage}>
        <Text>Add Image to Letter</Text>
      </Pressable>{" "}
      <Button title="Add Image to Letter" onPress={pickImage} />
      {letterImage && (
        <Image
          source={{ uri: letterImage }}
          style={{ width: 200, height: 200 }}
        />
      )}
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
});
