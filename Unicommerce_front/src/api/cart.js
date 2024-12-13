import axios from "axios";

// Obtener el carrito del usuario
export const getCart = () => {
  return axios.get("https://unicommerce.onrender.com/cart/", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`, // Añade el token de autenticación
    },
  });
};

// Añadir producto al carrito
export const addToCart = (productId, quantity) => {
  return axios.post(
    "https://unicommerce.onrender.com/cart/",
    {
      product: productId,
      quantity: quantity,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Añade el token de autenticación
      },
    }
  );
};

// Actualizar producto en el carrito
export const updateCart = (productId, action) => {
  return axios.put(
    "http://localhost:8000/cart/",
    {
      product: productId,
      action: action,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Añade el token de autenticación
      },
    }
  );
};

// Eliminar producto del carrito
export const removeFromCart = (productId) => {
  return axios.delete(`http://localhost:8000/cart/${productId}/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`, // Añade el token de autenticación
    },
  });
};
