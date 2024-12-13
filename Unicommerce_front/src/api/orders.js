import axios from "axios";

const token = localStorage.getItem("token");
axios.get("https://unicommerce.onrender.com/orders/", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
