/*
 *
 * Map
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import styles from './styles.css';
import { createStructuredSelector } from 'reselect';

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
    this.loadMapsIfNeeded();
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.loaded === true) {
      this.mountMap();
      this.setDirections();
    }
  };

  loadMapsIfNeeded = () => {
    let { loaded } = this.props;

    if (loaded && window.google){
      this.mountMap();
      this.setDirections();
    } else {
      this.props.loadMaps();
    }
  };

  mountMap = () => {
     let { geometry } = this.props.userLocation;
     let userLocation = geometry.location;

     if (window.google) {
       window.map = new window.google.maps.Map(document.getElementById('map'), {
       center: userLocation,
       zoom: 15,
       });
     }
  };

  checkDirectionsService = () => {
    if (!window.directionService){
      window.directionService = new window.google.maps.DirectionsService();
    }
    return true;
  };

  checkRendererService = () => {
    if (!window.rendererService) {
      window.rendererService = new window.google.maps.DirectionsRenderer({
        map: window.map,
      });
    }
    return true;
  };

  checkDirectionsStatus = (status) => {
    switch (status){
      case 'INVALID_REQUEST' :
        break;
      case 'MAX_WAYPOINTS_EXCEEDED' :
        break;
      case 'NOT_FOUND' :
        break;
      case 'OK' :
        break;
      case 'OVER_QUERY_LIMIT' :
        break;
      case 'REQUEST_DENIED' :
        break;
      case 'UNKNOWN_ERROR' :
        break;
      case 'ZERO_RESULTS' :
        break;
      default:
        break;
    }
  };

  getDirectionsRequest = () => {
    let origin = {
      lat: this.props.userLocation.geometry.location.lat,
      lng: this.props.userLocation.geometry.location.lng,
    };
    let destination = {
      lat: this.props.destination.location.coordinate.latitude,
      lng: this.props.destination.location.coordinate.longitude,
    };
    let query = {
      origin,
      destination,
      travelMode: 'DRIVING',
    };

    return query;

  };

  renderDirectionsOnMap = (directions) => {
    if (this.checkRendererService()){
      window.rendererService.setDirections(directions);
      window.rendererService.setMap(window.map);
    }
  };

  /*
  * DirectionsResult -
  * geocoded_waypoints: [DirectionsGeocodedWaypoint]
  * routes: [DirectionsRoute]
  *
  * */
  getDirections = () => {
    if (this.checkDirectionsService()) {
      let request = this.getDirectionsRequest();

      window.directionService.route(request, (result, status) => {
        if (result) {
          console.log(result);
          console.log(status);
          this.renderDirectionsOnMap(result);
          // check status
          // renderDirections
        }
      });
    }
  };

  setDirections = () => {
    // DirectionsRenders.setDirections(result)
    this.getDirections();
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

const mapStateToProps = createStructuredSelector({
    loaded: selectMapsLoaded(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadMaps: () => dispatch(mapLoadRequest()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);