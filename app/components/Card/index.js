/**
*
* Card
*
*/

import React from 'react';



function Card(props) {
  let { name,
    display_phone,
    distance,
    image_url,
    rating_img_url_large,
    review_count,
    snippet_text,
    snippet_image_url
} = props.place;

  return (
    <div className="card">
      <div className="card-image">
        <img src={image_url}/>
        <span className="card-title">
          {name}
        </span>
      </div>
      <div className="card-content">
        <i className="material-icons">place</i>
         {distance}
         <br/>
         <img src={rating_img_url_large} alt="star rating of ramen image"/>
         <br/>
         <p>{snippet_text}</p>
         <br/>
         <p>{display_phone}</p>

      </div>
    </div>
  );
}

export default Card;
