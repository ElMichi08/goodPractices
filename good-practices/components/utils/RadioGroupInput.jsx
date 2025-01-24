import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";

const RadioGroupInput = ({ control, name, options, label, errors }) => {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <View style={styles.radioContainer}>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.radioOption}
                onPress={() => onChange(option)}
              >
                <View
                  style={[
                    styles.radioCircle,
                    value === option && styles.radioCircleSelected,
                  ]}
                />
                <Text style={styles.radioLabel}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
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
  radioContainer: { flexDirection: "row", alignItems: "center" },
  radioOption: { flexDirection: "row", alignItems: "center", marginRight: 20 },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  radioCircleSelected: { backgroundColor: "#000" },
  radioLabel: { marginLeft: 8, fontSize: 16 },
  errorText: { color: "red", fontSize: 12 },
});

export default RadioGroupInput;
