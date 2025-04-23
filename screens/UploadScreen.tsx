// /screens/UploadScreen.tsx
import React, { useState } from "react";
import { View, Button, Image, StyleSheet, Text, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

export default function UploadScreen() {
  const [image, setImage] = useState<string | null>(null);

  const navigation = useNavigation();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Your Handwriting Sample</Text>
      <Pressable style={styles.button} onPress={pickImage}>
        <Text>Pick Handwriting Sample</Text>
      </Pressable>
      {image && <Image source={{ uri: image }} style={styles.preview} />}
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Compose")}
      >
        <Text>Next: Compose Your Flutter</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
  },
  preview: {
    width: 300,
    height: 400,
    resizeMode: "contain",
    marginTop: 20,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "lightgray",
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
});
