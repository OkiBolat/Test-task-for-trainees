import React from 'react';
import useCounter from '../../hook/useCounter';


function Counter(props) {

    let {count, add, subtract} =useCounter(100)

    return (
        <div>
            {count} &nbsp;
            <button onClick={add}>+</button>  &nbsp;
            <button onClick={subtract}>-</button>
        </div>
    );
}

export default Counter;