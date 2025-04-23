
import React from 'react';
import { Routes, Route, useLocation  } from 'react-router-dom';
import SignUp from './Pages/Signup';
// import Home from './Pages/Home';
import Navigation from './components/Navigation';
// import Contact from './Pages/Contact';
// import About from './Pages/About';
import Footer from './components/Footer';
import LoginPage from './Pages/LoginPage';
// import Cart from "./Pages/Cart" 
import Logout from "./Pages/Logout" 
import Profile from "./Pages/Profile"
import Admin from "./Pages/AdminPage"
// import Products from './Pages/Products';
import Update from './Pages/Update';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const location = useLocation();
  const adminPage = location.pathname === '/admin'; 
  return (
    <>
      {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}
    
      {!adminPage && <Navigation />} 
      <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} /> */}
        {/* <Route path="/cart" element={<Cart />} /> */}
        <Route path="/logout" element={<Logout />} />
        <Route path="/admin" element={<Admin />} />
        {/* <Route path='/products' element={<Products />} /> */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/update" element={<Update />} />
    </Routes>
    {!adminPage && <Footer />}
    </>
  );
};

export default App;