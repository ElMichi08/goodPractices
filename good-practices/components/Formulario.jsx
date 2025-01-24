import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./forms/validationSchema";
import bcrypt from "react-native-bcrypt";
import DatePickerInput from "../components/utils/DatePickerInput";
import RadioGroupInput from "../components/utils/RadioGroupInput";
import { db } from "../constants/firebaseConfig"; 
import { doc, setDoc } from "firebase/firestore"; 

const Formulario = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nombre: "",
      apellido: "",
      cedula: "",
      celular: "",
      fechaNacimiento: "",
      genero: "",
      email: "",
      contraseña: "",
    },
  });

  const guardarEnFirestore = async (data) => {
    try {
      const salt = bcrypt.genSaltSync(10); // Genera el salt
      const hashedPassword = bcrypt.hashSync(data.contraseña, salt); // Hashea la contraseña      
      const dataConHash = { ...data, contraseña: hashedPassword };// Reemplazar la contraseña con el hash
  
      // Guardar los datos en Firestore
      const userId = Date.now().toString(); // Generar un ID único
      const userDocRef = doc(db, "users", userId); // Referencia al documento
      await setDoc(userDocRef, dataConHash); // Guardar datos en Firestore
  
      Alert.alert("Éxito", "Datos guardados correctamente en Firestore.");
    } catch (error) {
      console.error("Error al guardar en Firestore:", error);
      Alert.alert("Error", "No se pudieron guardar los datos en Firestore.");
    }
  };
  const onSubmit = (data) => {
    guardarEnFirestore(data); // Llama a la función de guardado
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formulario</Text>
      {[
        { name: "nombre", placeholder: "Nombre", label: "Nombre" },
        { name: "apellido", placeholder: "Apellido", label: "Apellido" },
        { name: "cedula", placeholder: "Cédula", label: "Cédula" },
        { name: "celular", placeholder: "Celular", label: "Celular" },
        { name: "email", placeholder: "Correo Electrónico", label: "Correo Electrónico" },
      ].map((field, index) => (
        <View key={index} style={styles.inputGroup}>
          <Text style={styles.label}>{field.label}</Text>
          <Controller
            control={control}
            name={field.name}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors[field.name] && { borderColor: "red" }]}
                placeholder={field.placeholder}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors[field.name] && (
            <Text style={styles.errorText}>{errors[field.name]?.message}</Text>
          )}
        </View>
      ))}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Contraseña</Text>
        <Controller
          control={control}
          name="contraseña"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, errors.contraseña && { borderColor: "red" }]}
                placeholder="Contraseña"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Text>{showPassword ? "Ocultar" : "Ver"}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        {errors.contraseña && (
          <Text style={styles.errorText}>{errors.contraseña?.message}</Text>
        )}
      </View>
      {/* Selector de Fecha */}
      <DatePickerInput control={control} name="fechaNacimiento" errors={errors} />
      {/* Selector de Género */}
      <RadioGroupInput
        control={control}
        name="genero"
        label="Género"
        options={["Masculino", "Femenino"]}
        errors={errors}
      />
      <Button title="Enviar" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  inputGroup: { marginBottom: 15 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10 },
  label: { fontSize: 16, marginBottom: 5, fontWeight: "bold" },
  errorText: { color: "red", fontSize: 12 },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});

export default Formulario;
