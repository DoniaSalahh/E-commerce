import React, { useContext, useState } from 'react'
import Style from './Login.module.css'
import {Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate ,Link} from 'react-router-dom'
import {BallTriangle } from  'react-loader-spinner'
import { usercontext } from '../../Context/UserContext'


export default function Login() {
  let {setUsertoken,setuserData}=useContext(usercontext)
  let navigate=useNavigate();
  let [error,seterror]=useState(null);
  let [isloading,setisloading]=useState(false)
    async function LoginSubmit(values){
      setisloading(true);
    let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values)
    .catch((err)=>{
      setisloading(false)
      seterror(err.response.data.message)})
    if(data.message==='success'){
      setisloading(false)
      localStorage.setItem('usertoken',data.token)
      setUsertoken(data.token)
      setuserData(data.user)
      navigate('/')
    }
  }


  let passwordRegExp=/^[A-Z][a-z0-9]{5,10}$/
  let validatescheme=Yup.object({
    email:Yup.string().email("Email is invalid").required("Email is required"),
    password:Yup.string().matches(passwordRegExp,'Password must be start with Upercase leter then any leters').required('password is requried)'),
    

  })
  let formik=useFormik({
    initialValues:{
      email:'',
      password:'',
    },validationSchema:validatescheme,
    onSubmit:LoginSubmit
  })
  return <>
  <div className="container w-75 mx-auto py-5">
    {error!==null? <div className='alert alert-danger'>{error}</div>:''}
    <h3>Register Now</h3>
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="email" className='mb-2'>Email :</label>
      <input type='email' className='form-control mb-4' name='email' id='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.errors.email && formik.touched.email? <div className="alert alert-danger p-2 mt-2">{formik.errors.email}</div>:null}

      <label htmlFor="password" className='mb-2'>Password :</label>
      <input type='password' className='form-control mb-4' name='password' id='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.errors.password&& formik.touched.password ? <div className="alert alert-danger p-2 mt-2">{formik.errors.password}</div>:null}

      { isloading? <button  type='button' className='btn bg-main text-white mt-2'>
      <BallTriangle
                height={20}
                width={100}
                radius={5}
                color="#fff"
                ariaLabel="ball-triangle-loading"
                wrapperClass={{}}
                wrapperStyle=""
                visible={true}
              /></button>:<>
              <div className='d-flex align-items-center'>
                <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white mt-2 mx-2'>LogIn</button>
                <Link className='btn' to={'/register'}>Register Now</Link>
              </div>
              </>
      }
    </form>

  </div>
  </>
}

