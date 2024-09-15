import React from 'react';
import styles from "./Navbar.module.scss"
import NavbarItem from '../NavbarItem/NavbarItem';
function Navbar(props) {
    const ListMenu=["Home","About Me","Skills","Portfolio","Contacts"]
    return (
       <nav>
            <ul className={styles.Navbar}>
    {
        ListMenu.map((elem,i)=>(<NavbarItem menuItem={elem} key={i}/>))
    }
            </ul>
       </nav>
    );
}

export default Navbar;