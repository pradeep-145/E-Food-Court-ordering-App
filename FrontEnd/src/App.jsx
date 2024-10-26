import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './pages/Hero';
import Cart from './pages/Cart';
import ContactUs from './pages/ContactUs'; 

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/cart" element={<Cart />} />
          {/* <Route path="/contact-us" element={<ContactUs />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
