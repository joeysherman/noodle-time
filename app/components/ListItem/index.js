/**
 *
 * ListItem
 *
 */

import React from 'react';
import Rating from '../Rating';

import styles from './styles.css';

function ListItem(props) {
  let { name, image_url, review_count, rating, distance, id } = props.place;

  // mile to meter = 1609.34
  let distanceByMile = (distance / 1609.34).toFixed(1);

  return (
    <li
      className="py-4 border-gray-200 border-b-2"
      key={id}
      onClick={props.onClick}
    >
      <div className="flex justify-between">
        <div className="relative pb-1/5 w-24 md:w-48 bg-white flex-shrink-0">
          <img
            src={image_url}
            alt=""
            className="absolute h-full w-full object-cover rounded"
          />
        </div>
        <div className="flex flex-col justify-between w-full ml-2 pr-2 truncate">
          <span className="whitespace-no-wrap truncate text-xl font-semibold mb-2">{name}</span>
          <div className="">
            <Rating rating={rating} />
          </div>
            <span className="text-gray-600">{review_count} Reviews.</span>
        </div>
        <p className="flex-shrink-0 text-gray-600">{distanceByMile} mi.</p>
      </div>
    </li>
  );
}

export default ListItem;
