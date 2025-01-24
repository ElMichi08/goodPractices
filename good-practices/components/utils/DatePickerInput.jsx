import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Controller } from "react-hook-form";

const DatePickerInput = ({ control, name, errors }) => {
  const [showPicker, setShowPicker] = useState(false); // Estado para controlar el selector de fecha

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>Fecha de Nacimiento</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setShowPicker(true)} // Mostrar el selector de fecha
            >
              <Text style={styles.dateText}>
                {value ? new Date(value).toLocaleDateString() : "Seleccionar fecha"}
              </Text>
            </TouchableOpacity>
            {showPicker && (
              <DateTimePicker
                value={value ? new Date(value) : new Date()}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(event, selectedDate) => {
                  setShowPicker(false); 
                  if (selectedDate) {
                    onChange(selectedDate.toISOString().split("T")[0]);
                  }
                }}
              />
            )}
          </>
        )}
      />
      {errors[name] && (
        <Text style={styles.errorText}>{errors[name]?.message}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 16, marginBottom: 5, fontWeight: "bold" },
  dateInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    justifyContent: "center",
  },
  dateText: { fontSize: 16, color: "#555" },
  errorText: { color: "red", fontSize: 12 },
});

export default DatePickerInput;
