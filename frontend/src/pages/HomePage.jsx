import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/Homepage.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import TrandingProduct from "./TrandingProduct";

const HomePage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 7,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);

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

  // All Category
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/category/get"
      );
      if (data.success) {
        setCategory(data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
    getCategories();
  }, []);
  return (
    <>
      {/* CAREGORY SHOW */}
      <div className="home-page-slick">
        <div className="homepage-category">
          <Slider {...settings}>
            {category?.map((c) => (
              <div key={c._id} className="h-c-card">
                <Link>
                  <img className="h-c-image" src={c.image} alt={c.name} />
                </Link>
                <div className="h-c-name">{c.name}</div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

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
