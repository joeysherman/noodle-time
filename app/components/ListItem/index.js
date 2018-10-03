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
    distance,
    rating
  } = props.place;

  return (
    <li className="collection-item">
      <div className="row lighten-2 z-depth-1-half">
        <div className='col s5 m4 l3'>
          <img src={image_url} alt="" className="responsive-img"></img>
        </div>
        <div className="col s7 m8 l9">
          <h2>{name}</h2>
        </div>
      </div>
    </li>
  );
}

export default ListItem;
