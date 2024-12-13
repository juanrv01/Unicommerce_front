import axios from "axios";

/**
 * Envía una solicitud POST al servidor para registrar un nuevo usuario.
 *
 * @param {Object} userData - Datos del usuario a registrar (firstName, lastName, email, password).
 * @returns {Promise<Object>} - Respuesta del servidor.
 */
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/users/register/",
      userData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Envía una solicitud POST al servidor para iniciar sesión.
 *
 * @param {Object} credentials - Datos de inicio de sesión (email, password).
 * @returns {Promise<Object>} - Respuesta del servidor (normalmente el token).
 */
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/users/login/", // Asumiendo que este es el endpoint para obtener el token
      credentials
    );
    return response.data; // Aquí devolverás el token de acceso
  } catch (error) {
    throw error; // Si ocurre un error, se captura aquí
  }
};
