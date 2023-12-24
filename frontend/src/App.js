import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
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

function App() {
  return (
    < >
    <Router>
    <ToastContainer />
    <NavBar/>
      <Routes> 
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/forgot-password' element={<ForgetPassword/>}/>
        <Route path='/category/:id' element={<CategoryProduct/>}/>
        <Route path='/product/:id' element={<ProductDetails/>}/>
        
{/* USER */}
        <Route path="/dashbord" element={<UserRoute/>}>
        <Route path="" element={<UserProfile/>}/>
        <Route path="logout" element={<LogOut/>}/>
        <Route path="wishlist" element={<Wishlist/>}/>
        <Route path="order" element={<UserOrder/>}/>
        <Route path="cart" element={<UserCart/>}/>
      </Route>

      </Routes>
    </Router>
    </>
  );
}

export default App;