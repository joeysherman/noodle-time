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

  componentWillMount() {
    console.log('Map will mount')
  }
  
  componentDidMount() {
    console.log('Map mounted')
    this.props.dispatch(mapLoadRequest());
  }

  componentWillReceiveProps(nextProps, nextContext) {
    console.log('Map will rec. props');
    if (nextProps.loaded === true) {
      console.log('nextprops mapsloaded is true')
      this.mountMap();
    }
  };

  mountMap = () => {
    console.log('Mounting the google map')
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