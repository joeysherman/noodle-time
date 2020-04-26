/**
 *
 * Card
 *
 */

import React from 'react';

function Card(props) {
  let { name, display_phone, distance, is_closed, categories, image_url } = props.place;

  return (
    <div className="flex flex-col md:flex-row rounded overflow-hidden shadow-lg m-auto">
      <div className="w-1/2 p-2 self-center">
        <img className="w-full" src={image_url} />
      </div>
      <div className="w-full px-6 py-4">
        <div className="flex flex-col h-full justify-around">
          <h1 className="font-bold text-3xl mb-1">{name}</h1>
          <h2 className={is_closed ? "inline-block mr-2 font-semibold text-red-600" : "font-semibold text-green-600"}>{is_closed ? "Closed" : "Open"}</h2>
        
          <div className="flex mb-2">
            
          {categories.length &&
            categories.map(function(val, ind) {
              return (
                <p className="bg-blue-400 px-2 py-1 mr-2 rounded-full w font-light text-xs" key={ind}>{val.title}</p>
                );
              })}
              </div>

          <div className="flex w-full justify-around">
          <button className="rounded shadow-md text-gray-700 bg-blue-500 leading-normal font-bold py-3 px-5">Take me there</button>
          <a href={`tel:${display_phone}`} className="transition duration-300 ease-in-out bg-red-500 hover:opacity-75 rounded shadow-md text-gray-700 leading-normal font-bold py-3 px-5">
            {display_phone}
          </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
