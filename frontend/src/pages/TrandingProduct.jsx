import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Slider from "react-slick"


const TrandingProduct = () => {

    var settings = {
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          }
        ]
      };
  

    const [product1, setProduct1] = useState([]);
    const [product2, setProduct2] = useState([]);

    const id1 = `65855aa15737d45af3be3282`
    const id2 = `658583512526bcda99d4a1b7`

//  Category 1
    const getProductCategory1 = async()=> {
        try {
            const {data} = await axios.get(`/api/v1/product/category/${id1}`)
            if(data.success){
            setProduct1(data.product)
            }
        } catch (error) {
            console.log(error)
        }
    }
//  Category 1
    const getProductCategory2 = async()=> {
        try {
            const {data} = await axios.get(`/api/v1/product/category/${id1}`)
            if(data.success){
            setProduct2(data.product)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        getProductCategory1();
        getProductCategory2();
    },[])

  return (
    <div>
      {/* PRODUCT 1 SHOW */}
      <div className='product-slider-contoner'>
        <h3>Camara Drone</h3>
        <div className='home-page-slick'>
        <div className='homepage-category'>
        <Slider {...settings}>
            {product1?.map((p) => (
                <div key={p._id}>
                    <Link to={`/product/${p._id}`} ><img className='slider-p-image' src={p.image} alt={p.title.slice(0, 10)} /></Link>
                    <div>{p.title.slice(0, 10)}</div>
                    <div>{p.price}</div>
                </div>
            ))}
            </Slider>
        </div>
        </div>
        </div>

{/* PRODUCT 2 SHOW */}
        <div className='product-slider-contoner'>
        <h3>Best Of Watch</h3>
        <div className='home-page-slick'>
        <div className='homepage-category'>
        <Slider {...settings}>
            {product2?.map((p) => (
                <div key={p._id}>
                    <Link to={`/product/${p._id}`}><img className='slider-p-image' src={p.image} alt={p.title.slice(0, 10)} /></Link>
                    <div>{p.title.slice(0, 10)}</div>
                    <div>{p.price}</div>
                </div>
            ))}
            </Slider>
        </div>
        </div>
        </div>
    </div>
  )
}

export default TrandingProduct