/**
*
* List
*
*/

import React from 'react';

import styles from './styles.css';

function List(props) { 
  return (
    <ul className="flex flex-col p-4">
      {props.children}
    </ul>
  );
}

export default List;
