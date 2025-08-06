import React, { useEffect, useState } from 'react';
function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/api/products/all')
      .then(res => res.json())
      .then(setProducts);
  }, []);
  return (
    <div>
      <h1>Marketplace Products</h1>
      {products.map(prod => (
        <div key={prod._id} style={{border: '1px solid #ccc', margin: 8, padding: 8}}>
          <h2>{prod.name}</h2>
          <p>₹{prod.price} | Qty: {prod.quantity}</p>
          <p>Farmer: {prod.farmer.name}, {prod.farmer.address}</p>
        </div>
      ))}
    </div>
  );
}
export default App;
