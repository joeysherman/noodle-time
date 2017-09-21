/**
*
* ListWrapper
*
*/

import React from 'react';


import styles from './styles.css';

function ListWrapper(props) {
  return (
    <ul className="collection">
      {props.children}
    </ul>
  );
}

export default ListWrapper;
