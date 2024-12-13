import axios from 'axios'

export const getAllProducts = () => {
    return axios.get('http://localhost:8000/products/search/')
}

export const searchProducts = (searchTerm) => { 
    return axios.get(`http://localhost:8000/products/search/`, { params: { search: searchTerm } })
}

export const getCategories = async () => {
    return await axios.get('http://localhost:8000/products/categories/');
  };
  
  // Obtener productos por categoría
  export const getProductsByCategory = async (categoryId) => {
    return await axios.get(`http://localhost:8000/products/category/<int:category_id>/${categoryId}/`);
  };
  
  