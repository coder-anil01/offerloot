
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/Homepage.css";
import TrandingProduct from "./TrandingProduct";
import CategorySlider from "../components/CategorySlider";
import { FaRegHeart, FaCartPlus } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useAuth } from "../context/auth";
import { Link } from "react-router-dom";
import GoToTopButton from "../components/GoToTopButton";

const HomePage = () => {

  const [auth] = useAuth();
  const [product, setProduct] = useState([]);

  // All Product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        "/api/v1/product/get"
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

// WISHLIST
  const addToWishlist = async(id) => {
    try {
      const {data} = await axios.post('/api/v1/wishlist/create' , {product: id, user: auth?.user._id})
      console.log(data)
      if(data.success){
        toast.success(data.message)
      }else{
        toast.info(data.message)
      }
    } catch (error) {
      toast.error("Internal Server Error")
    }
  }

// CART 
  const addToCart = async(id) => {
    try {
      const {data} = await axios.post("/api/v1/cart/create", {product: id, user: auth?.user._id})
      if(data.success){
        toast.success(data.message)
      }else{
        toast.info(data.message)
      }
    } catch (error) {
      toast.error("Internal Server Error")
    }
  }

  
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
              <Link to={`/product/${p._id}`}><img className="product-box-image" src={p.image} alt={p.title.slice(0, 10)}/></Link>
            </div>
            <div className="product-box-text">
              <div className="product-card-icon">
                <div className="product-icon-wishlist" onClick={() => {addToWishlist(p._id)}}><FaRegHeart/></div>
                <div className="product-icon-cart" onClick={() => {addToCart(p._id)}}><FaCartPlus/></div>
              </div>
              <div className="product-box-title">{p.title.slice(0, 15)}...</div>
              <div className="product-box-price">{p.price}</div>
            </div>
          </div>
        ))}
      </div>
      <GoToTopButton/>
    </>
  );
};

export default HomePage;
