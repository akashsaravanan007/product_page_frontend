import React, { useState, useEffect } from "react";
import axios from "axios";
import '../components/ProductList.css'
import UpdateProduct from '../components/UpdateProduct.js'
import AddProduct from '../components/AddProduct.js'

// Import Navbar and Footer components
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  

  const handleDeleteProduct = (id) => {
    axios
      .delete(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        const updatedProducts = products.filter(
          (product) => product.id !== id
        );
        setProducts(updatedProducts);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Products</h1>
        <ul>
          {products.map(product => (
            <li key={product.id}>
              <h2>{product.title}</h2>
              <img className="product-image" src={product.image} alt={product.title} />
              <p>{product.description}</p>
              <p>Category: {product.category}</p>
              <p>Price: ${product.price}</p>
              <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
              <p>Available: {product.count} in stock</p>
              <button onClick={() => handleDeleteProduct(product.id)}>
              Delete
            </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
      <UpdateProduct />
      <br />
      <AddProduct />
      </div>

      <Footer />
    </div>
  );
}

export default ProductList;
