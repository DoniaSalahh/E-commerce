import React, { useContext, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import Layout from './components/Layout/MainLayout'
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import Products from './components/Products/Products';
import Register from './components/Register/Register';
import NotFound from './components/Notfound/Notfound';
import Catogries from './components/categories/Catogories';
import Brands from './components/Brands/Brands';
import Login from './components/Login/Login';

import UserContextProvider, { usercontext } from './Context/UserContext';
import ProdectedRoute from './components/prodectedRoute/ProdectedRoute';
import ProductDetails from './components/productDetails/ProductDetails';
import CartContextProvider from './Context/CartContext';
import CheckOut from './components/CheckOut/CheckOut';
import Profile from './components/Profile/Profile'

let routers=createHashRouter([
  {path:'/',element:<Layout/>,children:[
    {index:true,element:<ProdectedRoute><Home/></ProdectedRoute> },
    {path:'/home',element:<ProdectedRoute><Home/></ProdectedRoute>},
    {path:'/cart',element:<ProdectedRoute><Cart/></ProdectedRoute> },
    {path:'/Products',element:<ProdectedRoute><Products/></ProdectedRoute> },
    {path:'/checkOut/:id',element:<ProdectedRoute><CheckOut/></ProdectedRoute> },
    {path:'/profile',element:<ProdectedRoute><Profile/></ProdectedRoute> },



    {path:'/catogries',element:<ProdectedRoute><Catogries/></ProdectedRoute>},
    {path:'/register',element:<Register/>},
    {path:'/brands',element:<ProdectedRoute><Brands/></ProdectedRoute>},
    {path:'/productdetails/:id',element:<ProdectedRoute><ProductDetails/></ProdectedRoute>},

    {path:'/login',element:<Login/>},

    {path:'*',element:<NotFound/>}
  ]}
])
export default function App() {
  return<>
  <CartContextProvider>
  <UserContextProvider>
            <RouterProvider router={routers}></RouterProvider>
      </UserContextProvider>

  </CartContextProvider>
  </>
  
}
