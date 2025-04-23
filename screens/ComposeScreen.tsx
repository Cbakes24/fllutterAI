// /screens/ComposeScreen.tsx
import React, { useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { useFlutter } from "../context/FlutterContext";

const availableFonts = [
  {
    name: "CorysFont",
    url: "https://grbxgiwcabklftniwqpf.supabase.co/storage/v1/object/public/fonts//Corynewfont.ttf",
  },
  {
    name: "BouncyHand",
    url: "https://your-project.supabase.co/storage/v1/object/public/fonts/BouncyHand.ttf",
  },
  {
    name: "ClassicInk",
    url: "https://your-project.supabase.co/storage/v1/object/public/fonts/ClassicInk.ttf",
  },
];

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
        <Text style={{ fontSize: 18, fontWeight: "500", marginTop: 32 }}>Choose Font:</Text>
<View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
  {availableFonts.map((font) => (
    <Pressable
      key={font.name}
      onPress={() => {
        setFontName(font.name);
        setFontUrl(font.url);
      }}
      style={{
        padding: 10,
        borderWidth: 1,
        borderColor: fontName === font.name ? "black" : "#ccc",
        borderRadius: 6,
      }}
    >
      <Text>{font.name}</Text>
    </Pressable>
  ))}
</View>
        <Text style={{ fontFamily: fontName, fontSize: 20 }}>{message}</Text>
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
      </Pressable>
      <Text style={{ fontFamily: fontName, fontSize: 20 }}>{message}</Text>
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
  button: {
    backgroundColor: "lightgray",
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
});
