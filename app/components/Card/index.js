/**
*
* Card
*
*/

import React from 'react';



function Card(props) {
  const { name, image_url, snippet_text } = props.place;
  return (
    <div className="card">
      <div className="card-image">
        <img className="img-responsive" src={image_url}></img>
          <span className="card-title">{name}</span>
          <a className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">add</i></a>
      </div>
      <div className="card-content">
        <p>{snippet_text && snippet_text.slice(0, 50)}</p>
        <a>Read More</a>
      </div>
    </div>
  );
}

export default Card;
