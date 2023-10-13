import React from 'react'
import style from './prodectedroute.module.css'
import { Navigate } from 'react-router-dom'

export default function ProdectedRoute(props) {
    if(localStorage.getItem('usertoken')!==null){
        return props.children
    }
    else{
        return <Navigate to={'/login'}></Navigate>
    }
}
