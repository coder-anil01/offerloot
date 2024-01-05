import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import CategorySlider from '../components/CategorySlider';

const CategoryProduct = () => {

    const[product, setProduct] = useState([]);
    const[total, setTotal] = useState(0);
    const params = useParams();

    const getProduct = async()=> {
        try {
            const {data} = await axios.get(`/api/v1/product/category/${params.id}`)
            if(data.success){
            console.log(data)
            setTotal(data.total)
            setProduct(data.product)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getProduct();
    },[params])

  return (
    <div>
{/* CAREGORY SHOW */}
      <div style={{marginBottom: "40px"}}><CategorySlider/></div>

        <div className='product-count-heading'>
          {total > 0 ? `Find ${total} Products` : "Product Not Avilavle" }
          </div>

{/* PRODUCT SHOW */}
      <div className="product-box">
        {product?.map((p) => (
          <div key={p._id} className="product-box-card">
            <Link to={`/product/${p._id}`} className="product-box-image-main">
              <img
                className="product-box-image"
                src={p.image}
                alt={p.title.slice(0, 10)}
              />
            </Link>
            <div className="product-box-text">
              <div className="product-box-title">{p.title.slice(0, 15)}...</div>
              <div className="product-box-price">{p.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryProduct
