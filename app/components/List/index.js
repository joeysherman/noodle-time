/**
*
* List
*
*/

import React from 'react';

import styles from './styles.css';

function List(props) { 
  return (
    <ul className="collection">
      {props.children}
    </ul>
  );
}

export default List;
