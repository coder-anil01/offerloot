import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';
import CategoryProduct from "./pages/CategoryProduct";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";

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
        <Route path='/category/:id' element={<CategoryProduct/>}/>
        <Route path='/product/:id' element={<ProductDetails/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;