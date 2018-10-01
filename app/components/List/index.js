/**
*
* List
*
*/

import React from 'react';

import styles from './styles.css';

function List(props) {
  let header = props.count > 0 ? props.count + ' - found near you' : 'No places found' 
  return (
    <ul className="collection">
      {props.children}
    </ul>
  );
}

export default List;
