import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './pages/Hero';
import Cart from './pages/Cart';
import ContactUs from './pages/ContactUs'; 
import UserRegister from './pages/UserRegister';
import AdminRegister from './pages/AdminRegister';
import UserLogin from './pages/UserLogin';
import AdminLogin from './pages/AdminLogin';


function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/adminRegister" element={<AdminRegister />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/contactUs" element={<ContactUs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
