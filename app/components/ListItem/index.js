/**
*
* ListItem
*
*/

import React from 'react';


import styles from './styles.css';

function ListItem(props) {
  let { 
    name,
    image_url,
    review_count,
  } = props.place;

  return (
    <li className="collection-item avatar">
      <img src={image_url} alt="" className="responsive-img circle"></img>
      <span className="title">{name}</span>
    </li>
  );
}

export default ListItem;
