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
    <ul className="collection with-header">
    <li class="collection-header"><h4>{header}</h4></li>
      {props.children}
    </ul>
  );
}

export default List;
