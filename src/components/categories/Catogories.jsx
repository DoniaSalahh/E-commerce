import React, { useEffect, useState } from 'react'
import Style from './Catogries.module.css'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import { Link } from 'react-router-dom'





export default function Catogories() {
  // let {addcart}=useContext(CartContext)
let [isloading,setisloading]=useState(false)

 

  const[categories,setcategories]=useState([])
useEffect(()=>{
  GetAllCategories();

},[])
async function GetAllCategories(){
  setisloading(true)
  let{data}=await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  setisloading(false)

  console.log(data.data)
  setcategories(data.data)
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
          {categories.map((category)=>{
            return  <div className="col-md-3" key={category._id}>
            <div className="category px-2 py-3 cursor-pointer">
              <div className="row">
              <div className="col-md-10">
                <img className='w-100' height={150} src={category.image} alt="" />
                <p className='text-center text-main mt-2'>{category.name}</p>
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
