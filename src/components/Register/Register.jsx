import React, { useState } from 'react'
import Style from './Register.module.css'
import {Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Audio } from  'react-loader-spinner'

export default function Register() {
  let navigate=useNavigate();
  let [error,seterror]=useState(null);
  let [isloading,setisloading]=useState(false)
    async function submitRegister(values){
      setisloading(true);
    let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
    .catch((err)=>{
      setisloading(false)
      seterror(err.response.data.message)})
    if(data.message==='success'){
      setisloading(false)
      navigate('/login')
    }
  }


  let phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  let passwordRegExp=/^[A-Z][a-z0-9]{5,10}$/
  let validatescheme=Yup.object({
    name:Yup.string().min(3,"name is minlength is 3").max(10,"name is maxlenght is 10").required("name is requied"),
    email:Yup.string().email("Email is invalid").required("Email is required"),
    phone:Yup.string().matches(phoneRegExp,'phone is invalid').required('Phone is requried'),
    password:Yup.string().matches(passwordRegExp,'Password must be start with Upercase leter then any leters').required('password is requried)'),
    rePassword:Yup.string().oneOf([Yup.ref("password")],'password and repassword don not match').required('RePassword is requried'),

  })
  let formik=useFormik({
    initialValues:{
      name:'',
      email:'',
      phone:'',
      password:'',
      rePassword:''
    },validationSchema:validatescheme,
    onSubmit:submitRegister
  })
  return <>
  <div className="container w-75 mx-auto py-5">
    {error!==null? <div className='alert alert-danger'>{error}</div>:''}
    <h3>Register Now</h3>
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="name" className='mb-2'>Name :</label>
      <input className='form-control mb-4' name='name' id='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} type='text'/>
      {formik.errors.name && formik.touched.name ? <div className="alert alert-danger p-2 mt-2">{formik.errors.name}</div>:null}
      <label htmlFor="email" className='mb-2'>Email :</label>
      <input type='email' className='form-control mb-4' name='email' id='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.errors.email && formik.touched.email? <div className="alert alert-danger p-2 mt-2">{formik.errors.email}</div>:null}
      <label htmlFor="phone" className='mb-2'>Phone :</label>
      <input  type='tel' className='form-control mb-4' name='phone' id='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.errors.phone&& formik.touched.phone ? <div className="alert alert-danger p-2 mt-2">{formik.errors.phone}</div>:null}

      <label htmlFor="password" className='mb-2'>Password :</label>
      <input type='password' className='form-control mb-4' name='password' id='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.errors.password&& formik.touched.password ? <div className="alert alert-danger p-2 mt-2">{formik.errors.password}</div>:null}

      <label htmlFor="repassword" className='mb-2'>RePassword :</label>
      <input type='password' className='form-control mb-4' name='rePassword' id='repassword' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.errors.rePassword && formik.touched.rePassword? <div className="alert alert-danger p-2 mt-2">{formik.errors.rePassword}</div>:null}
      { isloading? <button  type='button' className='btn bg-main text-white mt-2'>
      <Audio
            height = "30"
            width = "80"
            radius = "9"
            color = 'white'
            ariaLabel = 'three-dots-loading'     
            wrapperStyle
            wrapperClass
          /></button>:
      <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white mt-2'>Register</button>
      }
    </form>

  </div>
  </>
}
