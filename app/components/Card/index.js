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
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-auto">
        <img className="w-full" src={image_url}/>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{name}</div>
          <p className="text-gray-700 text-base">{snippet_text}</p>
        </div>
    </div>
  );
}

export default Card;
