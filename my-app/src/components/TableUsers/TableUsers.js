import React from 'react';
import {Table} from 'react-bootstrap'
import TableItem from '../TableItem/TableItem';
function TableUsers({heading,users}) {
    return (
        <Table hover responsive variant='dark'>
                <thead>
                    <tr>{heading.map((elem)=><th key={elem}> {elem}</th>)}</tr>                    
                </thead>
                <tbody>
                    {users.map((elem)=><TableItem key={elem.id} user={elem} />)}
                </tbody>
        </Table>
    );
}

export default TableUsers;