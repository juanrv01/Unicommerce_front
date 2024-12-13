import { useEffect, useState } from "react";
import { getAllProducts, searchProducts } from "../api/products";
import { addToCart } from "../api/cart"; // Importa la función para agregar al carrito
import { Card, CardContent, CardMedia, Typography, Grid, Container, TextField, Button } from "@mui/material";
import defaultImage from "../assets/images/default.jpg";

export function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleSearch = async () => {
    try {
      const res = await searchProducts(searchTerm);
      setProducts(res.data);
    } catch (error) {
      console.error("Error al buscar productos:", error);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      await addToCart(product.id, 1); // Agrega el producto al carrito usando la API
      alert(`${product.name} ha sido añadido al carrito`);
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error);
    }
  };

  return (
    <Container>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <TextField
          label="Buscar productos"
          variant="outlined"
          fullWidth
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Buscar
        </Button>
      </div>

      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={product.image ? product.image : defaultImage}
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
                  onClick={() => handleAddToCart(product)}
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
