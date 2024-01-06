import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';
import CategoryProduct from "./pages/CategoryProduct";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgetPassword from "./pages/ForgetPassword";
import UserProfile from "./pages/user/UserProfile";
import UserRoute from "./routes/UserRoute";
import LogOut from "./pages/user/LogOut";
import Wishlist from "./pages/user/Wishlist";
import UserOrder from "./pages/user/UserOrder";
import UserCart from "./pages/user/UserCart";
import NavCartPage from "./pages/NavCartPage";
import PaymentPage from "./pages/user/PaymentPage";
import UserDashbord from "./pages/user/UserDashbord";
import AdminRoutes from "./routes/AdminRoutes";
import AdminDashbord from "./pages/admin/AdminDashbord";
import AdminProfile from "./pages/admin/AdminProfile";
import AllOrders from "./pages/admin/AllOrders";
import AllUsers from "./pages/admin/AllUsers";
import AllAdmin from "./pages/admin/AllAdmin";
import Category from "./pages/admin/Category";
import Product from "./pages/admin/Product";
import Logout from "./pages/admin/Logout";
import PaymentBuy from "./pages/user/PaymentBuy";

function App() {
  return (
    < >
    <Router>
    <ToastContainer
    autoClose={2000}
    transition={Flip}/>

    <NavBar/>
      <Routes> 
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/cart' element={<NavCartPage/>}/>
        <Route path='/forgot-password' element={<ForgetPassword/>}/>
        <Route path='/category/:id' element={<CategoryProduct/>}/>
        <Route path='/product/:id' element={<ProductDetails/>}/>
        <Route path="buy/:id" element={<PaymentBuy/>}/>
        
{/* USER */}
        <Route path="/dashbord" element={<UserRoute/>}>
        <Route path="" element={<UserDashbord/>}/>
        <Route path="profile" element={<UserProfile/>}/>
        <Route path="logout" element={<LogOut/>}/>
        <Route path="wishlist" element={<Wishlist/>}/>
        <Route path="order" element={<UserOrder/>}/>
        <Route path="cart" element={<UserCart/>}/>
        <Route path="payment" element={<PaymentPage/>}/>
        
      </Route>
{/* ADMIN */}
        <Route path="/admin" element={<AdminRoutes/>}>
        <Route path="" element={<AdminDashbord/>}/>
        <Route path="profile" element={<AdminProfile/>}/>
        <Route path="order" element={<AllOrders/>}/>
        <Route path="users" element={<AllUsers/>}/>
        <Route path="admins" element={<AllAdmin/>}/>
        <Route path="categories" element={<Category/>}/>
        <Route path="products" element={<Product/>}/>
        <Route path="logout" element={<Logout/>}/>
      </Route>

      </Routes>
    </Router>
    </>
  );
}

export default App;