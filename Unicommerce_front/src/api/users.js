import axios from "axios";

const BASE_URL = "https://unicommerce.onrender.com/users/";

const LOGIN_URL = `${BASE_URL}login/`;
const REGISTER_URL = `${BASE_URL}register/`;
const LOGOUT_URL = `${BASE_URL}logout/`;
const AUTHENTICATED_URL = `${BASE_URL}authenticated/`;

axios.defaults.withCredentials = true;

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(
      "https://unicommerce.onrender.com/users/login/", // Asumiendo que este es el endpoint para obtener el token
      credentials
    );
    return response.data; // Aquí devolverás el token de acceso
  } catch (error) {
    throw error; // Si ocurre un error, se captura aquí
  }
};

export const logout = async () => {
  const response = await axios.post(LOGOUT_URL, { withCredentials: true });
  return response.data;
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      "https://unicommerce.onrender.com/users/register/",
      userData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const authenticated_user = async () => {
  const response = await axios.get(AUTHENTICATED_URL, {
    withCredentials: true,
  });
  return response.data;
};

export const retrieveUserInfo = async (token) => {
  try {
    const response = await axios.get(
      "https://unicommerce.onrender.com/users/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
