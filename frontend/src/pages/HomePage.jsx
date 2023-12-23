import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/Homepage.css";
import TrandingProduct from "./TrandingProduct";
import CategorySlider from "../components/CategorySlider";

const HomePage = () => {

  const [product, setProduct] = useState([]);

  // All Product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/product/get"
      );
      if (data.success) {
        setProduct(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <>
      {/* CAREGORY SHOW */}
      <CategorySlider/>

      {/* Tranding */}
      <TrandingProduct />
      {/* PRODUCT SHOW */}
      <div className="product-box">
        {product?.map((p) => (
          <div key={p._id} className="product-box-card">
            <div className="product-box-image-main">
              <img
                className="product-box-image"
                src={p.image}
                alt={p.title.slice(0, 10)}
              />
            </div>
            <div className="product-box-text">
              <div className="product-box-title">{p.title.slice(0, 15)}...</div>
              <div className="product-box-price">{p.price}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomePage;
