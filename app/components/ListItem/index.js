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

  let no_star = 	<svg className="w-4 h-4" viewBox="0 0 32 32"><g id="icon-star">
  <path fill="#a4a4a4" d="M20.388,10.918L32,12.118l-8.735,7.749L25.914,31.4l-9.893-6.088L6.127,31.4l2.695-11.533L0,12.118
l11.547-1.2L16.026,0.6L20.388,10.918z"></path>
  </g></svg>,
      half_star = 	<svg className="w-4 h-4" viewBox="0 0 32 32"><g id="half-star"> 
      <polygon fill="#a4a4a4" points="32,12.118 20.389,10.918 16.026,0.6 16,0.66 16,25.325 16.021,25.312 25.914,31.4 23.266,19.867
  "></polygon>
<polygon fill="#FFAA00" points="11.547,10.918 0,12.118 8.822,19.867 6.127,31.4 16,25.325 16,0.66 	"></polygon>
  </g></svg>,
      star = 	<svg className="w-4 h-4" viewBox="0 0 32 32"><g id="icon-star">
      <path fill="#FFAA00" d="M20.388,10.918L32,12.118l-8.735,7.749L25.914,31.4l-9.893-6.088L6.127,31.4l2.695-11.533L0,12.118
    l11.547-1.2L16.026,0.6L20.388,10.918z"></path>
      </g></svg>;
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
    <li className="flex justify-between md:p-4" key={id} onClick={props.onClick}>
      <img src={image_url} alt="" className="w-24 h-24 md:w-32 md:h-32 m-2"></img>
      <div className="ml-2 flex-1">
      <span className="">{name}</span>
       <div className="flex">{stars_html}</div>
       <span>{review_count} Reviews.</span>
      </div>
      <p className="">{distanceByMile} mi.</p>
    </li>
  );
}

export default ListItem;
