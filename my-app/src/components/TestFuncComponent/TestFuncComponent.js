import React, { useEffect, useRef, useState } from 'react';
import useInput from '../../hook/useInput';
import styles from "./TestFuncComponent.module.scss"
function TestFuncComponent(props) {
    const [state,setState]=useState(10);
    const [num,setNum]=useState("");
    const [num2,setNum2]=useState("");
    const [res,setRes]=useState("");
    const [opertor,setOperator]=useState("");
    let inputVal=useInput()

    let elemInput=useRef()
useEffect(()=>{
    elemInput.current.style.color='red'
},[])

    const handlerClickUp=(num)=>{
        setState(state+num)
    }
    const Sum=()=>{
        setRes(Number(num)+ +num2)
    }
    // const changeNum=(x)=>{
    //     setNum(x);
    //     setRes(0)
    // }
    // const changeNum2=(x)=>{
    //     setNum2(x);
    //     setRes(Number(num)+ +x)
    // }
    useEffect(()=>{
        fetch('https://pokeapi.co/api/v2/pokemon/ditto').then(res=>res.json()).then(data=>
        setRes(data.name)
        )  
    },[])
    const Sub=()=>{
        setRes(Number(num)- num2)
        setOperator('вычитания')
    }
    const Multi=()=>{
        setRes(Number(num)* num2)
        setOperator('умножения')
    }
    const Div=()=>{
        setRes(Number(num)/ num2)
        setOperator('деления')
    }
    
    return (
        <div>
            <button onClick={()=>handlerClickUp(1)}>Click 1</button> &nbsp;
            <button onClick={()=>handlerClickUp(5)}>Click 5</button> &nbsp;
            <button onClick={()=>handlerClickUp(10)}>Click 10</button>
            <p>{state}</p>
            <input type="text" value={num} onChange={event=>setNum(event.target.value)}/> &nbsp;
            
            <div>
                <button className={styles.Btn} onClick={Sum}>+</button> &nbsp;
                <button className={styles.Btn} onClick={Sub}>-</button> &nbsp;
                <button className={styles.Btn} onClick={Multi}>*</button> &nbsp;
                <button className={styles.Btn} onClick={Div}>/</button> &nbsp;
            </div>
            
            <input type="text" value={num2} onChange={event=>setNum2(event.target.value)}/>
            <p>Результат: {opertor}</p>
            <p>{res}</p>
            <input ref={elemInput} type="text" {...inputVal}/>

        </div>
    );
}

export default TestFuncComponent;