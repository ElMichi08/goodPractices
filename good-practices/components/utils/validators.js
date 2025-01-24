// Validar cédula ecuatoriana
export const validarCedula = (cedula) => {
    if (!/^\d{10}$/.test(cedula)) {
      return false;
    }
  
    const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    const digitos = cedula.split("").map(Number);
    const digitoVerificador = digitos.pop();
  
    let suma = 0;
  
    for (let i = 0; i < coeficientes.length; i++) {
      let producto = digitos[i] * coeficientes[i];
      if (producto >= 10) {
        producto -= 9;
      }
      suma += producto;
    }
  
    const decenaSuperior = Math.ceil(suma / 10) * 10;
    const resultado = decenaSuperior - suma;
  
    return resultado === digitoVerificador || (resultado === 10 && digitoVerificador === 0);
  };
  