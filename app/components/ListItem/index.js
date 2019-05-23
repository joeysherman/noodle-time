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
    rating,
    distance,
  } = props.place;

  return (
    <li className="collection-item">
      <div className="row no-pad-bot lighten-2 z-depth-1-half">
      <a className="btn-floating btn waves-effect waves-light red right-align">{props.index}</a>
        <div className='col s5 m4 l3'>
          <div className="section">
            <img src={image_url} alt="" className="responsive-img"></img>
          </div>
        </div>
        <div className="col s7 m8 l9">
          <h5>{name}</h5>
          <p>{rating + ' based off of ' + review_count}</p> 
        </div>
      </div>
    </li>
  );
}

export default ListItem;
