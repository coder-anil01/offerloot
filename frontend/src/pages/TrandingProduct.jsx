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

    const id1 = `65855aca5737d45af3be3285`

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

    useEffect(()=> {
        getProductCategory1();
    },[])

  return (
    <div>
      {/* PRODUCT 1 SHOW */}
      <div className='product-slider-contoner'>
        <h3>Tranding Items</h3>
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
    </div>
  )
}

export default TrandingProduct