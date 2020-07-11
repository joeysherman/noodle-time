/**
 *
 * Review
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Rating from './../Rating'

// 
const ReviewText = styled.p`
  
`;

const UserAvatar = styled.img`

`;

function Review(props) {
  let { data } = props;
  let { user: { name, image_url, profile_url }} = data;
  let { text, rating, time_created } = data;

  return (
  <div className="flex justify-between p-4 border-gray-500 rounded-sm shadow">
    <div className="flex flex-col w-2/6">
      <div className="flex">
      <img className="h-12 w-12 m-2 rounded-full" src={image_url}></img>
      <p className="px-2 py-4 leading-tight font-semibold">{name}</p>
      </div>
      <Rating rating={rating}></Rating>
    </div>
    <ReviewText className="w-4/6 p-4">{text}</ReviewText>
  </div>);
}

Review.propTypes = {};

export default Review;
