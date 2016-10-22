/**
 * Created by Joey on 10/22/2016.
 */


import React from 'react';
import { connect } from 'react-redux';
import { push, replace } from 'react-router-redux';

import {
  selectMapLoaded
} from './selectors';
import {
  selectPlaces,
  selectUserLocation
} from '../HomePage/selectors';

class MapPage extends React.Component {

  constructor(props) {
    super(props);

  };

  componentWillMount() {
    let { userLocation, places } = this.props;

    if ((!userLocation) || (!places)) {
      this.props.dispatch(replace('/'));
    }
  };

  componentDidMount() {
    if (!window.Google){
      this.props.loadGoogleMaps();
    }
  }

  render = () => {

    let { loaded } = this.props;


    return (
      <div>
        <div id="map">
        </div>
      </div>
    )
  };
};

const mapStateToProps = (state) => {
  return {
    loaded: selectMapLoaded(state),
    places: selectPlaces(state),
    userLocation: selectUserLocation(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadGoogleMaps : () => dispatch(loadGoogleMaps)
    dispatch,

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);