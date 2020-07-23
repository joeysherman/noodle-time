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
  <div className="flex flex-col p-2 border-gray-500 rounded-sm shadow">
    <div className="flex w-full justify-between items-center">
      <div className="flex justify-center items-center">
      <img className="h-12 w-12 m-2 rounded-full" src={image_url}></img>
      <p className="px-2 py-4 leading-tight font-semibold">{name}</p>
      </div>
      <Rating rating={rating}></Rating>
    </div>
    <ReviewText className="w-full p-1">{text}</ReviewText>
  </div>);
}

Review.propTypes = {};

export default Review;
