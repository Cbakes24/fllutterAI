// /screens/ComposeScreen.tsx
import React, { useEffect, useState } from "react";
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
import * as Font from "expo-font";
import * as FileSystem from "expo-file-system";

const availableFonts = [
  {
    name: "CorysFont",
    url: "https://grbxgiwcabklftniwqpf.supabase.co/storage/v1/object/public/fonts//Corynewfont.ttf",
  },
  {
    name: "ShodowLight",
    url: "https://grbxgiwcabklftniwqpf.supabase.co/storage/v1/object/public/fonts//ShadowsIntoLight-Regular.ttf",
  },
  {
    name: "HeathersFont",
    url: "https://grbxgiwcabklftniwqpf.supabase.co/storage/v1/object/public/fonts//HeatherFont.otf",
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


const cloudsLetter = `
Dear Tifa, 

I'm not really sure how to start this, or even if I should. But I figured... if I don't write it now, I never will.

I've been thinking about the bar lately. About the way the light filters through the windows in the late afternoon, the sound of glasses clinking, and the smell of whatever it is you're always cooking that somehow manages to make it feel like home.

I never told you this, but those quiet nights at Seventh Heaven just us, and maybe Marlene falling asleep in a booth meant more to me than I ever let on. Maybe it's because for the first time, I didn't have to pretend to be someone I wasn't. Maybe it's because, in that small corner of Midgar, I could breathe.

You've always been stronger than me, you know. You smile even when the weight of the world is pressing down. You look at me and still see something good, even when I can't. I don't know how you do that. I don't know why you still believe in me.

But I'm trying, Tifa. To be better. To stop running from the ghosts and the memories and the things I wish I could change. I don't know where this path leads, but if I ever find my way back... I hope you're there.

Thanks for the quiet moments, for the reminders of who I really am, and for never giving up on me. You deserve more than I can give, but I'll keep trying, for you.

Always,  
Cloud
`;


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
  const [isSampleActive, setIsSampleActive] = useState(false);
  const originalMessage = "Enter your message here...";

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

  const pickFont = async (font: any) => {
    try {
      await Font.loadAsync({
        [font.name]: font.url
      });
      setFontName(font.name);
      setFontUrl(font.url);
      console.log("Font loaded:", font.name);
    } catch (error) {
      console.error("Error loading font:", error);
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
        <Text style={{ fontSize: 18, fontWeight: "500", marginTop: 32 }}>
          Choose Font:
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 8,
            marginTop: 12,
          }}
        >
          {availableFonts.map((font) => (
            <Pressable
              key={font.name}
              onPress={() => pickFont(font)}
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
      <Pressable 
        style={[styles.button, { backgroundColor: isSampleActive ? '#ffd6d6' : '#e0e0e0' }]} 
        onPress={() => {
          if (isSampleActive) {
            setMessage(originalMessage);
          } else {
            setMessage(cloudsLetter);
          }
          setIsSampleActive(!isSampleActive);
        }}
      >
        <Text>{isSampleActive ? "Remove Sample Letter" : "Fill With Fake Love Letter"}</Text>
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
    maxHeight: 300,
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
