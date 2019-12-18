/**
*
* OverView
*
*/

import React from 'react';


import styles from './styles.css';

function OverView(props) {
  let name = props.name;
  return (
    <div className={styles.overView}>
        <h1>{{name}}</h1>
    </div>
  );
}

export default OverView;
