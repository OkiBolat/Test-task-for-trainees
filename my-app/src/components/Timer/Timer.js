import React from 'react';

function Timer(props) {

    const startTimer =()=>{

    }
    const stopTimer =()=>{

    }
    return (
        <div>
            {count} <br/>
            <button onClick={startTimer}>start</button> &nbsp;
            <button onClick={stopTimer}>stop</button>
        </div>
    );
}

export default Timer;