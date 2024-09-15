import React, { useState } from 'react';

function useInput(defaultValue='') {
    let [value,setValue]=useState(defaultValue);
    const onChange=(event)=>{
        setValue(event.target.value)
    }
    return {
            value,onChange
    };
}

export default useInput;