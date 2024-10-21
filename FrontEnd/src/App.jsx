import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Cart from './components/Cart';
import ContactUs from './components/ContactUs'; 

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
