import React from 'react';
import { ProductList } from '../components/ProductList';

export function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1 style={{ 
        fontSize: '2.5rem', 
        color: '#333', 
        fontWeight: 'bold', 
        marginBottom: '20px',
      }}>
        Bienvenido a Unicommerce!
      </h1>
      <ProductList />
    </div>
  );
}

export default Home;
