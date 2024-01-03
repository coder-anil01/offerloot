import React, { useEffect, useState } from 'react'
import AdminMenu from './AdminMenu'
import axios from 'axios';
import { Select } from "antd";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
const { Option } = Select;

const Product = () => {

  const [data, setData] = useState("")
  const [total, setTotal] = useState(0)
  
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState([])
  const [ description,setDescription ] = useState([])
  const [ image, setImage ] = useState([])
  const [ category, setCategory ] = useState([])
  const [ price, setPrice ] = useState([])
  const [ countInStock, setCountInStock ] = useState([])
  const [ rating, setRating ] = useState([])
  const [ numReviews, setNumReviews ] = useState([])
  const [ isFeatured, setIsFeatured ] = useState([])

  const allProducts =async()=>{
    try {
      const res = await axios.get("http://localhost:8000/api/v1/product/get")
      console.log(res.data)
      setData(res.data.products)
      setTotal(res.data.counTotal)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    allProducts()
  },[])

// get all category
 const getAllCategory = async () => {
  try {
    const { data } = await axios.get("http://localhost:8000/api/v1/category/get");
    if (data?.success) {
      setCategories(data.categories);
      console.log(data.categories);
    }
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  getAllCategory();
}, []);

const handleSubmit =async(e)=>{
  e.preventDefault();
  try {
    const {data} = await axios.post("http://localhost:8000/api/v1/product/create", {title, description, image, category, price, countInStock, rating, numReviews, isFeatured})
    if (data?.success) {
      toast.success(data.message)
      allProducts();
    }else{
      toast.error(data.message)
    }
  } catch (error) {
    toast.error("Internal Server error")
  }
}

  return (
    <div className='dashbord'>
      <div className='dashbord-menu'><AdminMenu/></div>
      <div className='dashbord-content'>
{/* CREATE */}
      <form className="form-group" onSubmit={handleSubmit}>
        <h1 className='form-heading'>Create Product</h1>
          <Select
                // bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3 w-75"
                required
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
      
            <input
              type="text"
              value={title}
              onChange={(e)=> setTitle(e.target.value)}
              className="form-control"
              placeholder="Enter Title"
              required
            />
            <input
              type="text"
              value={description}
              onChange={(e)=> setDescription(e.target.value)}
              className="form-control"
              placeholder="Enter Description"
              required
            />
            <input
              type="text"
              value={image}
              onChange={(e)=> setImage(e.target.value)}
              className="form-control"
              placeholder="Enter Image Url"
              required
            />
            <input
              type="text"
              value={price}
              onChange={(e)=> setPrice(e.target.value)}
              className="form-control"
              placeholder="Enter Price"
              required
            />
            <input
              type="text"
              value={countInStock}
              onChange={(e)=> setCountInStock(e.target.value)}
              className="form-control"
              placeholder="Enter Count In Stock"
              required
            />
            <input
              type="text"
              value={rating}
              onChange={(e)=> setRating(e.target.value)}
              className="form-control"
              placeholder="Enter Rating"
              required
            />
            <input
              type="text"
              value={numReviews}
              onChange={(e)=> setNumReviews(e.target.value)}
              className="form-control"
              placeholder="Enter Num Reviews"
              required
            />
            <input
              type="isFeatured"
              value={isFeatured}
              onChange={(e)=> setIsFeatured(e.target.value)}
              className="form-control"
              placeholder="For Male/Female"
              required
            />
        <button type="submit" className="form-submit">Submit</button>
      </form>
      </div>
    </div>
  )
}

export default Product
