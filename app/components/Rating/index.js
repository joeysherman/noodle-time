/**
 *
 * Rating
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import stars from "../../assets/stars.png";

const Wrapper = styled.div`
color: #333;
    text-size-adjust: 100%;
    border-spacing: 0;
    border-collapse: separate;
    text-align: left;
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    background: url(https://s3-media2.fl.yelpcdn.com/assets/srv0/yelp_design_web/9b34e39ccbeb/assets/img/stars/stars.png) no-repeat;
    background-size: 132px 560px;
    display: inline-block;
    vertical-align: middle;
    width: 132px;
    height: 24px;
    background-position: 0 ${props => (((props.rating/.5) *-24) + 24)}px;
    position: relative;
    overflow: hidden;

`;
const styles = {
  position: "absolute",
  left: "-9999px",
  top: "auto",
  overflow: "hidden",
  width: "1px",
  height: "1px"
};


function Rating(props) {
  return (
    <Wrapper rating={props.rating}>
      <img className="offscreen" style={styles} height="303" src="https://s3-media2.fl.yelpcdn.com/assets/srv0/yelp_design_web/9b34e39ccbeb/assets/img/stars/stars.png" width="84" alt="2.0 star rating">
        </img>
    </Wrapper>
  );
}

Rating.propTypes = {};

export default Rating;
