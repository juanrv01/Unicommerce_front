import { useEffect, useState } from "react";
import { getAllProducts, searchProducts, getCategories, getProductsByCategory } from "../api/products";
import { addToCart } from "../api/cart"; // Importa la función para agregar al carrito
import { Card, CardContent, CardMedia, Typography, Grid, TextField, Button, Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material";
import defaultImage from "../assets/images/default.jpg"; 

export function ProductList() {
  const [products, setProducts] = useState([]); 
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]); // Categorías de productos
  const [selectedCategory, setSelectedCategory] = useState(""); // Categoría seleccionada

  useEffect(() => {
    async function loadInitialData() {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          getAllProducts(),
          getCategories(),
        ]);
        setProducts(Array.isArray(productsRes.data) ? productsRes.data : []);
        setCategories(Array.isArray(categoriesRes.data) ? categoriesRes.data : []);
      } catch (error) {
        console.error("Error al cargar los datos iniciales:", error);
      }
    }
    loadInitialData();
  }, []);
  
  const handleSearch = async () => {
    try {
      const res = await searchProducts(searchTerm);
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error al buscar productos:", error);
    }
  };
  
  const handleCategoryChange = async (categoryId) => {
    setSelectedCategory(categoryId);
    try {
      const res =
        categoryId === ""
          ? await getAllProducts()  // Respuesta directa de productos
          : await getProductsByCategory(categoryId);  // Respuesta con productos en un arreglo
  
      // Verifica si la respuesta contiene un arreglo de productos
      const products = Array.isArray(res.data) ? res.data : [];
      
      if (products.length === 0) {
        console.error("No se encontraron productos para esta categoría:", res);
      }
  
      // Actualiza el estado con los productos
      setProducts(products);
    } catch (error) {
      console.error("Error al filtrar productos por categoría:", error);
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
    <Box
      sx={{
        padding: '20px',
        backgroundColor: '#ffffff', // Fondo blanco para el contenedor
        borderRadius: '8px', // Bordes redondeados
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Sombra para el contenedor
        maxWidth: '1200px', // Ancho máximo del contenedor
        margin: 'auto', // Centra el contenedor en la pantalla
        overflow: 'auto',
      }}
    >
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

      {/* Selector de Categorías */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Categorías</InputLabel>
        <Select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <MenuItem value="">Todas</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card>
            
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
    </Box>
  );
}
