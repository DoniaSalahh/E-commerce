import jwtDecode from 'jwt-decode'
import React, { useContext } from 'react'
import { Helmet } from 'react-helmet'
import { usercontext } from '../../Context/UserContext'



export default function Profile() {
  let {userData}=useContext(usercontext)
  let encodedtoken=localStorage.getItem('usertoken')
  let decodedtoken=jwtDecode(encodedtoken)
  return (
    <div className='container'>
      <h1>Hello:{userData?.name}</h1>
      <h2>Your Email is :{userData?.email}</h2>
        <Helmet>
                    <meta charSet="utf-8" />
                    <title>Your Profile</title>
                    <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
    </div>
  )
}
