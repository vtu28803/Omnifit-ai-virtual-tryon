import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

export default function HomeScreen() {

  const [selfieImage, setSelfieImage] = useState<string | null>(null);
  const [clothingImage, setClothingImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);

  const pickSelfie = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1
    });

    if (!result.canceled) {
      const uri = result.assets?.[0]?.uri || null;
      setSelfieImage(uri);
    }
  };

  const pickClothing = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1
    });

    if (!result.canceled) {
      const uri = result.assets?.[0]?.uri || null;
      setClothingImage(uri);
    }
  };

  const generateTryOn = () => {

    if (!selfieImage || !clothingImage) {
      alert("Upload selfie and clothing first");
      return;
    }

    // Fake AI result for hackathon demo
    setTimeout(() => {
      setResultImage(
        "https://i.ibb.co/wZZTx968/result.jpg"
      );
    }, 2000);
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>OmniFit AI</Text>

      <TouchableOpacity style={styles.button} onPress={pickSelfie}>
        <Text style={styles.buttonText}>UPLOAD SELFIE</Text>
      </TouchableOpacity>

      {selfieImage && (
        <Image source={{ uri: selfieImage }} style={styles.image} />
      )}

      <TouchableOpacity style={styles.button} onPress={pickClothing}>
        <Text style={styles.buttonText}>UPLOAD CLOTHING</Text>
      </TouchableOpacity>

      {clothingImage && (
        <Image source={{ uri: clothingImage }} style={styles.image} />
      )}

      <TouchableOpacity style={styles.button} onPress={generateTryOn}>
        <Text style={styles.buttonText}>GENERATE TRY-ON</Text>
      </TouchableOpacity>

      <Text style={styles.resultTitle}>Try-On Result</Text>

      {resultImage && (
        <Image source={{ uri: resultImage }} style={styles.resultImage} />
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#2EA3F2",
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

  image: {
    width: 200,
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },

  resultTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
  },

  resultImage: {
    width: 250,
    height: 250,
    marginTop: 10,
    borderRadius: 10,
  },
});