import axios from 'axios'

export const getAllProducts = () => {
    return axios.get('http://localhost:8000/products/search/')
}

export const searchProducts = (searchTerm) => { 
    return axios.get(`http://localhost:8000/products/search/`, { params: { search: searchTerm } })
}