import React, { useContext } from 'react';
import Style from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import image from '../../Assets/images/freshcart-logo.svg';

import { usercontext } from '../../Context/UserContext';


export default function Navbar() {
  let {Usertoken, setUsertoken}=useContext(usercontext);
  let navigate=useNavigate();
  function logout(){
    localStorage.removeItem('usertoken')
    setUsertoken(null)
    navigate('/login')

}
  return <>
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container">
    <Link className="navbar-brand" to="/">
      <img src={image} alt="" />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {Usertoken!==null?  <>
        <li className="nav-item">
          <Link className="nav-link " to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/cart">Cart</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/products">Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/catogries">Catogries</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/brands">Brands</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/profile">Profile</Link>
        </li>
        </>:''}

      </ul>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className='d-flex align-items-center'>
          <i class="fa-brands fa-instagram mx-2"></i>
          <i class="fa-brands fa-facebook mx-2"></i>
          <i class="fa-brands fa-tiktok mx-2"></i>
          <i class="fa-brands fa-linkedin mx-2"></i>
          <i class="fa-brands fa-youtube mx-2"></i>
        </li>
        {Usertoken!==null?
        <>
        <li className="nav-item">
          <span onClick={()=>logout()} className="nav-link cursor-pointer" >Logout</span>
        </li>
        </>:<><li className="nav-item">
                <Link className="nav-link " to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
        </>}
        
        
      </ul>

    </div>
  </div>
</nav>


  </>

}
