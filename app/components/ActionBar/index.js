/**
 *
 * ActionBar
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function ActionBar(props) {
  return <div className={props.className}>
    {props.children}
  </div>;
}

ActionBar.propTypes = {};

export default ActionBar;
