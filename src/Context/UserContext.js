import { createContext, useState } from "react";

export let usercontext=createContext();
export default function UserContextProvider(props){
    let[Usertoken,setUsertoken]=useState(null)
    let [userData,setuserData]=useState(null)
    return<>
    <usercontext.Provider value={{Usertoken,setUsertoken,setuserData,userData}}>
        {props.children}
    </usercontext.Provider>
    </>

}