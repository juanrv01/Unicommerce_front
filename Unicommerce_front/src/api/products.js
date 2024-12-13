import axios from "axios";

const BASE_URL = "http://localhost:8000/api/products/"; // Se usa la nueva URL base

export const getAllProducts = () => {
  // Se actualiza la URL para listar todos los productos
  return axios.get(BASE_URL);
};

export const searchProducts = (searchTerm) => {
  // Se actualiza la URL para buscar productos usando la query ?search=nombre
  return axios.get(BASE_URL, { params: { search: searchTerm } });
};
