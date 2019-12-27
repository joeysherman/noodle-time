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
    id,
  } = props.place;

  let no_star = <i className="material-icons">star_border</i>,
      half_star = <i className="material-icons">star_half</i>,
      star = <i className="material-icons">star</i>;
// mile to meter = 1609.34
  let distanceByMile = (distance / 1609.34).toFixed(1);
  let stars_html = [];
  let count = 0;
  // Show the proper amount of stars based on the rating.
  while (count != 5) {
    // rating = 0 
    // rating = 2.5
    // rating = 5
    if (rating == 0) {
      stars_html.push(<p>No Rating</p>);
    }
    count += 1; 
    if (rating >= count) {
      stars_html.push(star);
    } else if (count-0.5 == rating) {
      stars_html.push(half_star);
    } else {
      stars_html.push(no_star);
    }
  }

  return (
    <li className="flex justify-between p-4" key={id} onClick={props.onClick}>
      <img src={image_url} alt="" className="w-24 h-24 m-2"></img>
      <div className="ml-2 w-auto">
      <span className="">{name}</span>
       <div>{stars_html}</div>
       <span>{review_count} Reviews.</span>
      </div>
      <p className="w-1/5">{distanceByMile} mi.</p>
    </li>
  );
}

export default ListItem;
