
import axios from 'axios';
import React, {useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext'
import toast, { Toaster } from 'react-hot-toast'
import { Helmet } from 'react-helmet';


export default function ProductDetails() {
  let {addcart}=useContext(CartContext)
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
let params=useParams();
let [productdetails,setproductdetails]=useState(null);
let [isloading,setisloading]=useState(false)

let settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

async function getproductDetails(productid){
  setisloading(true)
  let {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/products/' + productid)
  setisloading(false)
  setproductdetails(data.data)

}
useEffect(()=>{
  getproductDetails(params.id)

},[]);
  return (
    isloading?<>
      <div className='d-flex justify-content-center align-items-center my-5 py-5'>
        <i className='fas fa-spin fa-spinner fa-2x'></i>
      </div>
      </>:
      <>
      <Toaster></Toaster>
      
              <div className="container">
                <div className="row align-items-center py-2">
                  <div className="col-md-4">
                  <Slider {...settings}>
                           {productdetails?.images?.map((img,index)=>{
                              return <img key={index} className='w-100' src={img} />
                 
                          })}
                  </Slider>

                  </div>
                  <div className="col-md-8">
                    <h2 className='mt-2'>{productdetails?.title}</h2>
                    <p>{productdetails?.description}</p>
                    <h6 className='text-main mt-2 font-sm'>{productdetails?.category.name}</h6>
                    <p className='d-flex justify-content-between mt-2'>
                      <span>{productdetails?.price} EGP</span>
                      <span>
                        <i className='fas fa-star me-1 rating-color'></i>
                        <span>{productdetails?.ratingsAverage}</span>
                      </span>
                    </p>
                    <button onClick={()=>addDataToCart(productdetails?._id)} className='btn bg-main text-white btn-sm w-100 mt-2'>Add To Cart</button>

                  </div>
                </div>
              </div>
              <Helmet>
                    <meta charSet="utf-8" />
                    <title>{productdetails?.title}</title>
                    <link rel="canonical" href="http://mysite.com/example" />
                </Helmet>
      </>
  
    
  )
}
