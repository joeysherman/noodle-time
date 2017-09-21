/**
*
* ListItem
*
*/

import React from 'react';


import styles from './styles.css';

function ListItem(props) {
  const { name, image_url, snippet_text, rating_img_url } = props.place;
  return (
    <li className="collection-item avatar">
      <img src={image_url} alt="" className="circle"></img>
        <span className="title">{name}</span>
      <p>{snippet_text}</p>
      <img src={rating_img_url} className="secondary-content" alt=""/>
    </li>
  );
}

export default ListItem;
