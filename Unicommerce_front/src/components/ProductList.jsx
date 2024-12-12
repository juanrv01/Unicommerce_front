import { useEffect, useState } from "react";
import { getAllProducts } from "../api/products";
import { Card, CardContent, CardMedia, Typography, Grid, Container } from '@mui/material';

export function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const res = await getAllProducts();
      setProducts(res.data);
    }
    loadProducts();
  }, []);

  return (
    <Container>
      <Grid container spacing={4}>
        {products.map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={product.images.length > 0 ? product.images[0].image_url : 'default.jpg'}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
