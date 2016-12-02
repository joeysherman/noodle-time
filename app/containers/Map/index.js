/*
 *
 * Map
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import styles from './styles.css';
import CircularProgress from 'material-ui/CircularProgress';

// State Selectors
import {
  selectUserLocation,
} from '../HomePage/selectors';

import {
  selectMapsLoaded
} from './selectors';

import {
  mapLoadRequest,
} from './actions';

export class Map extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.dispatch(mapLoadRequest());
  }

  componentWillReceiveProps(nextProps, nextContext) {
    console.log(nextProps);
    if (nextProps.loaded === true) {
      console.log('inside')
      this.mountMap();
    }
  };

  mountMap = () => {
    console.log('mounting')
     let { longitude, latitude } = this.props.userLocation;
     let userLocation = { lat: latitude, lng: longitude };

     if (window.google) {
       window.map = new window.google.maps.Map(document.getElementById('map'), {
       center: userLocation,
       zoom: 15,
       });
     }
     this.createAndSetMarker(userLocation);
  };


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
    loaded: selectMapsLoaded(state),
  }
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);