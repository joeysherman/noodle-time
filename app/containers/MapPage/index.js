/**
 * Created by Joey on 10/22/2016.
 */


import React from 'react';
import { connect } from 'react-redux';

import {
  selectMapLoaded
} from './selectors';

class MapPage extends React.Component {

}

const mapStateToProps = (state) => {
  return {
    loaded:
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
};

export default connect(mapStateToProps, mapDispatchToProps, MapPage);