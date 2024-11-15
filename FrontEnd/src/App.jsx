import { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminLogin from './pages/Admin/AdminLogin';
import Cart from './pages/Cart';
import ContactUs from './pages/ContactUs';
import Hero from './pages/Hero';
import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import Home from './pages/Admin/Home';
import axios from 'axios';
function App() {
    
    return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Hero />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/" element={<UserLogin />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path='/admin' element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;