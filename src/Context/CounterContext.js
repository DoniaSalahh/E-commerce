import { useState } from "react";
import { createContext} from "react";

export let counterContext=createContext();
export default function CounterContextprovider(props){
    let [counter,setCounter]=useState(0)  
    return<counterContext.Provider value={{counter}}>
        {props.children}

    </counterContext.Provider>

}