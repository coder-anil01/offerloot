import axios from 'axios';
import '../style/ProductDetails.css'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { FaRegStar } from "react-icons/fa";
import { toast } from 'react-toastify';
import { FaRegHeart, FaCartPlus } from "react-icons/fa";
import { useAuth } from '../context/auth';
import SeoHelmet from '../components/SeoHelmet';


const ProductDetails = () => {

    const [product, setProduct] = useState({});
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const params = useParams();
    const [bigImage, setBigImage] = useState("")
    const [auth] = useAuth();

    // All Product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get/${params.id}`);
      if (data.success) {
        setProduct(data.product);
        releted(data?.product?._id, data?.product?.category?._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const releted = async (pid, cid) => {
    try {
      const { data } = await axios.get(`/api/v1/product/releted/${pid}/${cid}`);
      setProducts(data.reletedProduct)
      setTotal(data.total)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(params?.id)getProduct();
  }, [params?.id]);

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
    <SeoHelmet title={product?.title} description={product?.description}/>
    <div className='product-detail'>
      <div className='product-detail-images'>
        <img onMouseEnter={()=> setBigImage(product?.image)} src={product?.image} alt="" />
        <img onMouseEnter={()=> setBigImage(product?.images?.[0])} src={(product?.images?.[0])} alt="" />
        <img onMouseEnter={()=> setBigImage(product?.images?.[1])} src={(product?.images?.[1])} alt="" />
        <img onMouseEnter={()=> setBigImage(product?.images?.[2])} src={(product?.images?.[2])} alt="" />
      </div>
      <div>
        <img className='product-detail-image' src={bigImage ? bigImage : product?.image} alt="" />
        <div className='product-detail-images-buttom'>
          <img onMouseEnter={()=> setBigImage(product?.image)} src={product?.image} alt="" />
          <img onMouseEnter={()=> setBigImage(product?.images?.[0])} src={(product?.images?.[0])} alt="" />
          <img onMouseEnter={()=> setBigImage(product?.images?.[1])} src={(product?.images?.[1])} alt="" />
          <img onMouseEnter={()=> setBigImage(product?.images?.[2])} src={(product?.images?.[2])} alt="" />
        </div>
        <div className='product-detail-button'>
          <button onClick={() => {addToCart(product._id)}} className='product-detail-button-cart'>Add To Cart</button>
          <Link to={`/buy/${product._id}`} className='product-detail-button-buy'>Buy Now</Link>
        </div>
      </div>
      <div className='product-detail-text'>
        <div className='product-detail-title'>{product?.title}</div>
        <div className='product-detail-price'>₹ {product?.price}</div>
        <div className='product-detail-description'>{product?.description}</div>
        <div className='product-detail-isFeatured'><strong>Recommended for </strong>{product?.isFeatured}</div>
        <div className='product-detail-rating'><div>{product.rating} <FaRegStar/></div> ({product?.numReviews} Reviews)</div>
      </div>
    </div>
      <div className='simler-products'>
        
        <div className='simler-products-heading'> {total > 0 ? `${total} Similar Products` : " No Similar Products"}</div>
        <div className="product-box">
        {products?.map((p) => (
          <div key={p._id} className="product-box-card">
            <div className="product-box-image-main">
              <Link to={`/product/${p._id}`}><img className="product-box-image" src={p?.image} alt={p?.title?.slice(0, 10)}/></Link>
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
      </div>
    </>
  )
}

export default ProductDetails
