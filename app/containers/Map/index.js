/*
 *
 * Map
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectMap from './selectors';
import styles from './styles.css';

// State Selectors
import {
  selectUserLocation,
} from '../HomePage/selectors';

export class Map extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    let { longitude, latitude } = this.props.userLocation;
    let userLocation = { lat: latitude, lng: longitude };

    if (window.google) {
      window.map = new window.google.maps.Map(document.getElementById('map'), {
        center: userLocation,
        zoom: 15,
      });
    }
    this.createAndSetMarker(userLocation);
  }

  createAndSetMarker(location) {
    if (!window.mapMarkers){
      window.mapMarkers = [];
    }
    let marker = new window.google.maps.Marker({
      map: window.map,
      position: location,
    });
    window.mapMarkers.push(marker);
  }

  render() {
    return (
      <div className={styles.mapWrapper}>
        <div className={styles.map} id='map'></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userLocation: selectUserLocation(state),
  }
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
