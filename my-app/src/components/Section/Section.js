import React from 'react';
import styles from "./Section.module.scss"
function Section(props) {
    return (
        <section className={styles.Section}>
            {props.children}
        </section>
    );
}

export default Section;