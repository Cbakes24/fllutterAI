import React, { useState } from "react";
import { View, Text, Pressable, ActivityIndicator, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { supabase } from "../utils/supabase";
import { Buffer } from "buffer";

global.Buffer
export default function FontUploadScreen() {
  const [uploading, setUploading] = useState(false);
  const [fontURL, setFontURL] = useState<string | null>(null);

  const handleFontUpload = async () => {
    const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // ✅ Accept any file type
        copyToCacheDirectory: true,
    });

    if (result.canceled || !result.assets?.[0]) return;

    const fontFile = result.assets[0];
    const fileUri = fontFile.uri;
    const fileName = fontFile.name;

    setUploading(true);

    try {
      const fileContent = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const { data, error } = await supabase.storage
        .from("fonts")
        .upload(fileName, Buffer.from(fileContent, "base64"), {
          contentType: "font/ttf", // or font/otf
          upsert: true,
        });

      if (error) throw error;

      const { data: publicUrlData } = await supabase.storage
        .from("fonts")
        .getPublicUrl(fileName);

      setFontURL(publicUrlData.publicUrl);
      Alert.alert("Success!", "Font uploaded successfully.");
    } catch (err) {
      console.error(err);
      Alert.alert("Upload Failed", "Something went wrong.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={{ padding: 24 }}>
      <Text style={{ fontSize: 22, marginBottom: 16 }}>Upload Your Handwriting Font (.ttf)</Text>

      <Pressable
        style={{
          backgroundColor: "#333",
          padding: 12,
          borderRadius: 8,
          alignItems: "center",
        }}
        onPress={handleFontUpload}
      >
        <Text style={{ color: "white" }}>{uploading ? "Uploading..." : "Choose Font File"}</Text>
      </Pressable>

      {uploading && <ActivityIndicator style={{ marginTop: 16 }} />}
      {fontURL && (
        <Text style={{ marginTop: 16, fontSize: 14 }}>
          Font uploaded: {"\n"}{fontURL}
        </Text>
      )}
    </View>
  );
}
