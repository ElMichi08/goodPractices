import * as yup from "yup";
import { validarCedula } from "../utils/validators";

export const schema = yup.object().shape({
  nombre: yup.string().required("El nombre es obligatorio"),
  apellido: yup.string().required("El apellido es obligatorio"),
  cedula: yup
    .string()
    .matches(/^[0-9]+$/, "La cédula debe contener solo números")
    .required("El número de cédula es obligatorio")
    .test("valid-cedula", "La cédula no es válida", (value) => validarCedula(value || "")),
  celular: yup
    .string()
    .matches(/^\d{10}$/, "El número de celular debe tener 10 dígitos")
    .required("El número de celular es obligatorio"),
  fechaNacimiento: yup.string().required("La fecha de nacimiento es obligatoria"),
  genero: yup
    .string()
    .oneOf(["Masculino", "Femenino"], "Seleccione un género válido")
    .required("El género es obligatorio"),
  email: yup.string().email("Ingrese un correo electrónico válido").required("El correo electrónico es obligatorio"),
  contraseña: yup
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es obligatoria"),
});
