import React from "react";
import { StyleSheet, ScrollView, Platform } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Formulario from "@/components/Formulario";

export default function FormScreen() {
  return (
    <ThemedView style={styles.stepContainer}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Formulario />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
    //alignItems: "center",
  },
  title: {
    textAlign: "left",
    marginTop: 30,
    marginBottom: 20,
  },
});
