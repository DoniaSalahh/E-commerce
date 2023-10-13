import React from 'react'
import Slider from "react-slick";
import slide1 from '../../Assets/images/blog-img-1.jpeg'
import slide2 from '../../Assets/images/blog-img-2.jpeg'
import img1 from '../../Assets/images/slider-2.jpeg'
import img2 from '../../Assets/images/grocery-banner-2.jpeg'


export default function MainSlider() {
    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
  return (
    <div className="container">
        <div className="mainslider mt-4">
            <div className="row">
                <div className="col-md-9 p-0">
                <Slider {...settings}>
                        <img className='w-100' height={500} src={slide1}  />
                        <img className='w-100' height={500} src={slide2} />
                  </Slider>
                </div>
                <div className="col-md-3 p-0">
                    <img className='w-100' src={img1} height={250} alt="" />
                    <img  className='w-100' src={img2} height={250} alt="" />
                </div>
            </div>
        </div>
    </div>
  )
}
