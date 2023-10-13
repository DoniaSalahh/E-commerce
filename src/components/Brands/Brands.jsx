import React, { useEffect, useState } from 'react'
import Style from './Brands.module.css'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Catogories() {
let [isloading,setisloading]=useState(false)
const[brands,setbrands]=useState([])
useEffect(()=>{
  GetAllBrands();

},[])
async function GetAllBrands(){
  setisloading(true)
  let{data}=await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
  setisloading(false)

  console.log(data.data)
  setbrands(data.data)
}
  return (
    isloading?<>
      <div className='d-flex justify-content-center align-items-center my-5 py-5'>
        <i className='fas fa-spin fa-spinner fa-2x'></i>
      </div>
      </>:<>
      <div className='container'>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Categories</title>
        <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        <div className="row">
          {brands.map((brand)=>{
            return  <div className="col-md-3" key={brand._id}>
            <div className="category cursor-pointer">
              <div className="row">
              <div className="col-md-10">
                <img className='w-100'  src={brand.image} alt="" />
                <p className='text-center text-main'>{brand.name}</p>
              </div>
              </div>
    </div>
</div>
      })
      }
      </div>
  </div>
      </>
  )
}

