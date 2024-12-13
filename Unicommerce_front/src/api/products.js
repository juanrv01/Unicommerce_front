import axios from "axios";

export const getAllProducts = () => {
  return axios.get("https://unicommerce.onrender.com/products/search/");
};

export const searchProducts = (searchTerm) => {
  return axios.get(`https://unicommerce.onrender.com/products/search/`, {
    params: { search: searchTerm },
  });
};

export const getCategories = async () => {
  return await axios.get(
    "https://unicommerce.onrender.com/products/categories/"
  );
};

// Obtener productos por categoría
export const getProductsByCategory = async (categoryId) => {
  return await axios.get(
    "https://unicommerce.onrender.com/products/category/${categoryId}/"
  );
};
