import React from 'react';

function TableItem({user:{id,name,age,gender,address,url}}) {
    let styles={
        width:"100px",
        height:"100px"
    }
    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{age}</td>
            <td>{gender}</td>
            <td>{address}</td>
            <td><img src={url} alt={name} style={styles}/></td>

        </tr>
    );
}

export default TableItem;