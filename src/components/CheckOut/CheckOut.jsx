import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { CartContext } from '../../Context/CartContext'
import { useParams } from 'react-router-dom'

export default function CheckOut() {
   let {id}= useParams()
    let {checkPayment}=useContext(CartContext)
  let ShippingForm=  useFormik({
        initialValues:{
            details:" ",
            phone:" ",
            city:" "
        },onSubmit:function(val){
            payShipping(val)

        }
    })
   async function payShipping(val){
       let {data}= await checkPayment(id,val)
       console.log(data)
       if(data.status==='success'){
       window.location.href= data.session.url
       }


    }
  return (
    <div className="container w-75 mx-auto py-5">
    <form onSubmit={ShippingForm.handleSubmit}>
        <label htmlFor="details">Details</label>
        <input onChange={ShippingForm.handleChange} type="text" name="details" className='form-control mt-2' id="details"/>

        <label htmlFor="phone">phone</label>
        <input  onChange={ShippingForm.handleChange} type="tel" name="phone" className='form-control mt-2' id="phone"/>

        <label htmlFor="city">city</label>
        <input  onChange={ShippingForm.handleChange} type="text" name="city" className='form-control mt-2' id="city"/>
        <button className='w-100 d-block btn bg-main text-white mt-2'>Pay</button>
    </form>
    </div>
  )
}
