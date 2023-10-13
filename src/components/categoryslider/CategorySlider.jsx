import React, { useEffect, useState } from 'react'
import style from './CategorySlider.module.css'
import Slider from "react-slick";
import axios from 'axios';


export default function CategorySlider() {

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3
  };
let[categories,setcategories]=useState([])
useEffect(()=>{
  GetAllCategory()

},[]);
async function GetAllCategory(){
  let {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  setcategories(data.data)
}

  return (
    <Slider {...settings} className='mb-4'>
              {categories.map((category)=>{
                return <>
                <img height={200} src={category.image} alt={category.name} />
                <h5 className='text-main font-sm'>{category.name}</h5>
                </>
              })}
    </Slider>
  )
}
