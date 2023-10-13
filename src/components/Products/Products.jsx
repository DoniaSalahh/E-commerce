import React, { useContext, useEffect, useState } from 'react'
import Style from './Products.module.css'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import toast, { Toaster } from 'react-hot-toast'




export default function Products() {
  let {addcart}=useContext(CartContext)
let [isloading,setisloading]=useState(false)

  async function addDataToCart(id){
    let {data}=await addcart(id)
    if(data.status === 'success')
    {
      toast.success(data.message)
    }
    else{
      toast.error("Error")
    }
    console.log(data.data)
}

  const[products,setproducts]=useState([])
useEffect(()=>{
  GetAllProducts();

},[])
async function GetAllProducts(){
  setisloading(true)
  let{data}=await axios.get('https://ecommerce.routemisr.com/api/v1/products')
  setisloading(false)

  console.log(data.data)
  setproducts(data.data)
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
        <title>Products</title>
        <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        <div className="row">
          {products.map((product)=>{
            return  <div className="col-md-3" key={product._id}>
            <div className="product px-2 py-3 cursor-pointer">
                <Link to={`/productdetails/${product._id}`}>
                      <img className='w-100' src={product.imageCover} alt="" />
                      <h5 className='font-sm text-main'>{product.category.name}</h5>
                      <h4>{product.title.split(" ").slice(0,2).join(" ")}</h4>
                      <p className='d-flex justify-content-between'>
                      <span>{product.price} EGP</span>
                      <span >
                      <i className='fas fa-star rating-color me-1'></i>
                          {product.ratingsAverage}
                      </span>
                      </p>
                </Link>
        <button onClick={()=>addDataToCart(product._id)} className='btn bg-main text-white btn-sm mt-2 w-100'>+Add To Cart</button>
    </div>

</div>
      })
      }

      </div>
  
  </div>
    
      </>
    
  
    
  )
}
