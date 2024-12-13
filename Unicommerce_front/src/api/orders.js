import axios from 'axios'

const token = localStorage.getItem('token');
axios.get('http://localhost:8000/orders/', {
  headers: {
    Authorization: `Bearer ${token}`
  }
})