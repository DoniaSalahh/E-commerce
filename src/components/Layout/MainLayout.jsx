import React, { useContext, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Style from './Layout.module.css'
import { usercontext } from '../../Context/UserContext'
import { Offline, Online } from "react-detect-offline";
export default function MainLayout() {
  let {setUsertoken}=useContext(usercontext)
  useEffect(()=>{
    if(localStorage.getItem('usertoken')!==null){
      setUsertoken(localStorage.getItem('usertoken'))
    }

  },[])
  return <>
  <Navbar/>
  <Outlet></Outlet>
  <div>
    
    <Offline>
      <div className='network'>
        <i className='fas fa-wifi'></i>
        you are offline

      </div>
    </Offline>
  </div>
  <Footer/>
  </>
}
