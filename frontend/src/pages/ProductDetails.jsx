import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const ProductDetails = () => {

    const [product, setProduct] = useState("");
    const params = useParams();

    // All Product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/api/v1/product/get/${params.id}`);
      console.log(data.product)
      if (data.success) {
        setProduct(data.product);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div>
      <div><img src={product.image} alt="" /></div>
      <div>{product.title}</div>
      <div>{product.description}</div>
      <div>{product.price}</div>
      <div>{product.isFeatured}</div>
      <div>{product.rating} ({product.numReviews} Reviews)</div>
    </div>
  )
}

export default ProductDetails
