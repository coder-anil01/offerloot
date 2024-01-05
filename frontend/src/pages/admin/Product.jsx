import { Modal } from 'antd';
import React, { useEffect, useState } from 'react'
import AdminMenu from './AdminMenu'
import axios from 'axios';
import { Select } from "antd";
import { toast } from 'react-toastify';
const { Option } = Select;

const Product = () => {

  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [categories, setCategories] = useState([]);

  const [ title, setTitle] = useState("")
  const [ description,setDescription ] = useState("")
  const [ image, setImage ] = useState("")
  const [ category, setCategory ] = useState("")
  const [ price, setPrice ] = useState("")
  const [ countInStock, setCountInStock ] = useState("")
  const [ rating, setRating ] = useState("")
  const [ numReviews, setNumReviews ] = useState("")
  const [ isFeatured, setIsFeatured ] = useState("")
  const [ imageFirst, setImageFirst] = useState("");
  const [ imageSecond, setImageSecond] = useState("");
  const [ imageThird, setImageThird] = useState("");

  const [id, setId] = useState("");
  const [ updateTitle, setUpdateTitle] = useState("")
  const [ updateDescription,setUpdateDescription ] = useState("")
  const [ updateImage, setUpdateImage ] = useState("")
  const [ updateCategory, setUpdateCategory ] = useState("")
  const [ updatePrice, setUpdatePrice ] = useState("")
  const [ updateCountInStock, setUpdateCountInStock ] = useState("")
  const [ updateRating, setUpdateRating ] = useState("")
  const [ updateNumReviews, setUpdateNumReviews ] = useState("")
  const [ updateIsFeatured, setUpdateIsFeatured ] = useState("")
  const [ updateImageFirst, setUpdateImageFirst] = useState("");
  const [ updateImageSecond, setUpdateImageSecond] = useState("");
  const [ updateImageThird, setUpdateImageThird] = useState("");



  const allProducts =async()=>{
    try {
      const res = await axios.get("/api/v1/product/get")
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
    const { data } = await axios.get("/api/v1/category/get");
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
    const {data} = await axios.post("/api/v1/product/create", {
      title, description, image, images: [imageFirst, imageSecond, imageThird], category, price, countInStock, rating, numReviews, isFeatured
    })
    if (data?.success) {
      toast.success(data.message);
      setTitle("");
      setDescription("");
      setImage("");
      setPrice("");
      setCountInStock("");
      setRating("");
      setNumReviews("");
      setImageFirst("");
      setImageSecond("");
      setImageThird("");
      allProducts();
    }else{
      toast.error(data.message)
    }
  } catch (error) {
    toast.error("Internal Server error")
  }
}

const handleCancel = () => {
  setIsModalOpen(false);
};

const updateProduct = async(e)=>{
  e.preventDefault();
  try {
    const {data} = await axios.put(`/api/v1/product/update/${id}`,
    {title: updateTitle, 
      description: updateDescription,
      image: updateImage,
      images: [updateImageFirst, updateImageSecond, updateImageThird],
      category: updateCategory,
      price: updatePrice,
      countInStock: updateCountInStock,
      rating: updateRating,
      numReviews: updateNumReviews,
      isFeatured: updateIsFeatured});
      allProducts();
    toast.success(data.message)
    setIsModalOpen(false)
  } catch (error) {
   toast.error("Internal Server Error")
  }
}
const editProduct = async(p)=>{
  setIsModalOpen(true);
  setId(p._id)
  setUpdateTitle(p.title)
  setUpdateDescription(p.description)
  setUpdateImage(p.image)
  setUpdateCategory(p?.category?._id)
  setUpdatePrice(p.price)
  setUpdateCountInStock(p.countInStock)
  setUpdateRating(p.rating)
  setUpdateNumReviews(p.numReviews)
  setUpdateIsFeatured(p.isFeatured)
  setUpdateImageFirst(p.images[0])
  setUpdateImageSecond(p.images[1])
  setUpdateImageThird(p.images[2])
}

  return (
    <div className='dashbord'>
      <div className='dashbord-menu'><AdminMenu/></div>
      <div className='dashbord-admin-product-contain'>
{/* CREATE */}
      <form className="form-group" onSubmit={handleSubmit}>
        <h2 className='dashbord-form-heading'>Create Product</h2>
        <div className='dashbord-admin-product'>
        <Select
            placeholder="Select a category"
            showSearch
            className="form-control-select"
            required
            onChange={(value) => {setCategory(value)}}>
            {categories?.map((c) => (
              <Option key={c._id} value={c._id}>
                {c.name}
              </Option>
            ))}
          </Select>
          <Select
            className="form-control-select"
            placeholder="Male/Female"
            required
            onChange={(value) => {setIsFeatured(value)}}>
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
              <Option value="Male, Female">Male, Female</Option>
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
            type="Number"
            value={price}
            onChange={(e)=> setPrice(e.target.value)}
            className="form-control"
            placeholder="Enter Price"
            required
          />
          <input
            type="Number"
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
            type="Number"
            value={numReviews}
            onChange={(e)=> setNumReviews(e.target.value)}
            className="form-control"
            placeholder="Enter Num Reviews"
            required
          />
{/* IMAGE */}
          <input
            type="text"
            value={image}
            onChange={(e)=> setImage(e.target.value)}
            className="form-control"
            placeholder="Enter Thumbnail Url"
            required
          />
{/* IMAGES */}
          <input
            type="text"
            value={imageFirst}
            onChange={(e)=> setImageFirst(e.target.value)}
            className="form-control"
            placeholder="Enter Image 2"
            required
          />
          <input
            type="text"
            value={imageSecond}
            onChange={(e)=> setImageSecond(e.target.value)}
            className="form-control"
            placeholder="Enter Image 3"
            required
          />
          <input
            type="text"
            value={imageThird}
            onChange={(e)=> setImageThird(e.target.value)}
            className="form-control"
            placeholder="Enter Image 4"
            required
          />
          </div>
          <div className='dashbord-admin-product'>
            <div className='dashbord-admin-product-card'>
              <h4>Thumbnail</h4>
              <img className='dashbord-admin-product-image' src={image} alt="Thumbnail" />
            </div>
            <div className='dashbord-admin-product-card'>
              <h4>Image 2nd</h4>
              <img className='dashbord-admin-product-image' src={imageFirst} alt="Dp 2nd" />
            </div>
            <div className='dashbord-admin-product-card'>
              <h4>Image 3rd</h4>
              <img className='dashbord-admin-product-image' src={imageSecond} alt="dp 3rd" />
            </div>
            <div className='dashbord-admin-product-card'>
              <h4>Image 4th</h4>
              <img className='dashbord-admin-product-image' src={imageThird} alt="Dp 4th" />
            </div>
          </div>
          <div className="form-submit"><button type="submit" >Submit</button></div>
      </form>
{/* Show Product */}
      <h2 className='dashbord-form-heading'>Total Product:- {total}</h2>
      <div className="dashbord-product-box">
        {data?.map((p) => (
          <div key={p._id} className="dashbord-product-box-card">
              <div className="dashbord-product-box-image-main" 
              onClick={(()=> editProduct(p))}>
                <img className="dashbord-product-box-image" src={p.image} alt={p.title.slice(0, 10)}/></div>
            <div className="dashbord-product-box-text">
              <div className="dashbord-product-card-icon">
              </div>
              <div className="dashbord-product-box-title">{p.title.slice(0, 15)}...</div>
              <div className="dashbord-product-box-price">{p.price}</div>
            </div>
          </div>
        ))}
      </div>
      </div>

{/* UPDATE */}
      <Modal title="Update Product" open={isModalOpen} footer={null} onCancel={handleCancel}>
      <form className="form-group" onSubmit={updateProduct}>
        <div className='dashbord-admin-product'>
        <Select
            placeholder="Select a category"
            showSearch
            className="form-control-select"
            required
            value={updateCategory}
            onChange={(value) => {setUpdateCategory(value)}}>
            {categories?.map((c) => (
              <Option key={c._id} value={c._id}>
                {c.name}
              </Option>
            ))}
          </Select>
          <Select
            className="form-control-select"
            placeholder="Male/Female"
            required
            value={updateIsFeatured}
            onChange={(value) => {setUpdateIsFeatured(value)}}>
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
              <Option value="Male, Female">Male, Female</Option>
          </Select>
          <input
            type="text"
            value={updateTitle}
            onChange={(e)=> setUpdateTitle(e.target.value)}
            className="form-control"
            placeholder="Enter Title"
            required
          />
          <input
            type="text"
            value={updateDescription}
            onChange={(e)=> setUpdateDescription(e.target.value)}
            className="form-control"
            placeholder="Enter Description"
            required
          />
          <input
            type="Number"
            value={updatePrice}
            onChange={(e)=> setUpdatePrice(e.target.value)}
            className="form-control"
            placeholder="Enter Price"
            required
          />
          <input
            type="Number"
            value={updateCountInStock}
            onChange={(e)=> setUpdateCountInStock(e.target.value)}
            className="form-control"
            placeholder="Enter Count In Stock"
            required
          />
          <input
            type="text"
            value={updateRating}
            onChange={(e)=> setUpdateRating(e.target.value)}
            className="form-control"
            placeholder="Enter Rating"
            required
          />
          <input
            type="Number"
            value={updateNumReviews}
            onChange={(e)=> setUpdateNumReviews(e.target.value)}
            className="form-control"
            placeholder="Enter Num Reviews"
            required
          />
{/* IMAGE */}
          <input
            type="text"
            value={updateImage}
            onChange={(e)=> setUpdateImage(e.target.value)}
            className="form-control"
            placeholder="Enter Thumbnail Url"
            required
          />
{/* IMAGES */}
          <input
            type="text"
            value={updateImageFirst}
            onChange={(e)=> setUpdateImageFirst(e.target.value)}
            className="form-control"
            placeholder="Enter Image 2"
            required
          />
          <input
            type="text"
            value={updateImageSecond}
            onChange={(e)=> setUpdateImageSecond(e.target.value)}
            className="form-control"
            placeholder="Enter Image 3"
            required
          />
          <input
            type="text"
            value={updateImageThird}
            onChange={(e)=> setUpdateImageThird(e.target.value)}
            className="form-control"
            placeholder="Enter Image 4"
            required
          />
          </div>
          <div className='dashbord-admin-product'>
            <div className='dashbord-admin-product-card'>
              <h4>Thumbnail</h4>
              <img className='dashbord-admin-product-image' src={updateImage} alt="Thumbnail" />
            </div>
            <div className='dashbord-admin-product-card'>
              <h4>Image 2nd</h4>
              <img className='dashbord-admin-product-image' src={updateImageFirst} alt="Dp 2nd" />
            </div>
            <div className='dashbord-admin-product-card'>
              <h4>Image 3rd</h4>
              <img className='dashbord-admin-product-image' src={updateImageSecond} alt="Dp 3rd" />
            </div>
            <div className='dashbord-admin-product-card'>
              <h4>Image 4th</h4>
              <img className='dashbord-admin-product-image' src={updateImageThird} alt="Dp 4th" />
            </div>
          </div>
          <div className="form-submit"><button type="submit" >Submit</button></div>
      </form>
      </Modal>
    </div>
  )
}

export default Product
