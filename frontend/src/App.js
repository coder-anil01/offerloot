import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';

function App() {
  return (
    < >
    <NavBar/>
    <Router>
      <Routes> 
        <Route path='/' element={<HomePage/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;