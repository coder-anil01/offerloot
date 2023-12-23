import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';
import CategoryProduct from "./pages/CategoryProduct";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    < >
    <Router>
    <NavBar/>
      <Routes> 
        <Route path='/' element={<HomePage/>}/>
        <Route path='/category/:id' element={<CategoryProduct/>}/>
        <Route path='/product/:id' element={<ProductDetails/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;