/**
 * Created by Joey on 10/22/2016.
 */


import React from 'react';
import { connect } from 'react-redux';

import {
  selectMapLoaded
} from './selectors';

class MapPage extends React.Component {

  render = () => {
    return (
      <h1>Working!</h1>
    )
  };
};

const mapStateToProps = (state) => {
  return {
    loaded: selectMapLoaded(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);