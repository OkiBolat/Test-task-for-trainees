import React, { Component } from 'react';

class TestClassComponent extends Component {
constructor(props){
    super(props)
    this.state={
        name:"Rinat",
        age:33,
        address:"Kazan"
    }
}
    handlerClickAgeDown(){
        this.setState(prevstate=>({age:prevstate.age-1}))
    }
    handlerClickAgeUp(){
        // вариант1
        // let {age}=this.state
        //  this.setState({age:age+1})
        //  вариант2
        this.setState(prevstate=>({age:prevstate.age+1}))
    }
    render() {
        const {name,age,address}=this.state;
        let styles={
            border:"2px solid grey",
            borderRadius:"5px",
            padding:"10px",
            marginTop:"10px",
            display:"inline-block"
        }
        return (
            <div style={styles}>
                <h3>{name}</h3>
                <p>{age}</p>
                <p>{address}</p>
                <button onClick={()=>this.handlerClickAgeUp()}>ClickUp</button> &nbsp;
                <button onClick={()=>this.handlerClickAgeDown()}>ClickDown</button>
            </div>
        );
    }
}

export default TestClassComponent;