import React, { useState } from 'react';

function useCounter(defaultVal=0) {
    let [count,setCount]=useState(defaultVal);
 const add=()=>{
    setCount(count+1)
 }
 const subtract=()=>{
    setCount(count-1)
 }
    return {
        count,add,subtract
    };
}

export default useCounter;