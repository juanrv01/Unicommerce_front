import { useEffect, useState, useContext } from "react";
import { getAllProducts, searchProducts } from "../api/products"; // Asegúrate de tener esta función en tu API
import { CartContext } from "../api/CartContext"; // Importa el contexto del carrito
import { Card, CardContent, CardMedia, Typography, Grid, Container, TextField, Button } from "@mui/material";
import defaultImage from "../assets/images/default.jpg"; // Asegúrate de tener esta imagen

export function ProductList() {
  const [products, setProducts] = useState([]); // Productos a mostrar
  const [searchTerm, setSearchTerm] = useState(""); // Término de búsqueda ingresado por el usuario
  const { dispatch } = useContext(CartContext); // Accede al dispatch del contexto del carrito

  // Cargar todos los productos al inicio
  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await getAllProducts();
        setProducts(res.data);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      }
    }
    loadProducts();
  }, []);

  // Manejar la búsqueda al hacer clic en el botón
  const handleSearch = async () => {
    try {
      const res = await searchProducts(searchTerm); // Llama a la API con el término de búsqueda
      setProducts(res.data); // Actualiza los productos mostrados con los resultados
    } catch (error) {
      console.error("Error al buscar productos:", error);
    }
  };

  // Agregar un producto al carrito
  const handleAddToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product }); // Envía la acción al contexto del carrito
  };

  return (
    <Container>
      {/* Barra de búsqueda con botón */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <TextField
          label="Buscar productos"
          variant="outlined"
          fullWidth
          onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Buscar
        </Button>
      </div>

      {/* Lista de productos */}
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={product.images.length > 0 ? product.images[0].image_url : defaultImage}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Precio: ${product.price}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddToCart(product)} // Botón para agregar al carrito
                  style={{ marginTop: "10px" }}
                >
                  Agregar al carrito
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
