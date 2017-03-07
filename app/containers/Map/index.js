/*
 *
 * Map
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import styles from './styles.css';
import { createStructuredSelector } from 'reselect';

import Dialog from 'material-ui/Dialog';
import Chip from 'material-ui/Chip'

// State Selectors
import {
  selectLocation,
} from '../App/selectors';

import {
  selectPlaces,
  selectPlaceByIndex,
} from '../PlacesPage/selectors';

import {
  selectMapsLoaded,
  selectViewIndex,
} from './selectors';

import {
  mapLoadRequest,
} from './actions';

export class Map extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);

    this.state = {
      dialogOpen: false,
      detailIndex: 0,
    }
  }

  componentDidMount() {
    this.loadMapsIfNeeded();
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (!this.props.loaded && nextProps.loaded === true) {
      this.mountMap();
      this.placeUserLocationOnMap();
      this.listener = window.map.addListener('tilesloaded', () => {
        this.extendMapBounds();
      });
      this.placeAllPlacesOnMap();
    }
  };

  loadMapsIfNeeded = () => {
    let { loaded } = this.props;

    if (loaded && window.google){
      this.mountMap();
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

  getMapBounds = () => {
    return window.map.getBounds();
  };

  getPlacesCoords = () => {
    return this.props.places.map((item) => {

      return {
        lat: item.location.coordinate.latitude,
        lng: item.location.coordinate.longitude,
      };
    });
  };

  extendMapBounds = () => {
    let bounds = this.getMapBounds();
    let placesCoords = this.getPlacesCoords();

    placesCoords.forEach((item) => {
      console.log(item);
      bounds = bounds.extend(item);
    });

    window.map.fitBounds(bounds);
    this.listener.remove();

  };

  placeUserLocationOnMap = () => {
    let { geometry } = this.props.userLocation;
    let userLocation = geometry.location;

    let marker = new window.google.maps.Marker({
      map: window.map,
      position: userLocation,
      label: 'Your location',
    });
  };

  attachListenerToMarker = (marker, index) => {

    marker.addListener('click', () => {
      console.log('You clicked: ' + index)
      this.setState({
        dialogOpen: true,
        detailIndex: index,
      });
    });
  };

  placeAllPlacesOnMap = () => {
    let { places } = this.props;

    if (places.length){
      var holder;

      places.map((item, i) => {
        holder = this.createAndSetMarker({
          lat: item.location.coordinate.latitude,
          lng: item.location.coordinate.longitude,
        });

        this.attachListenerToMarker(holder, i);

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


  createAndSetMarker = (location) => {
    if (!window.mapMarkers){
      window.mapMarkers = [];
    }
    let marker = new window.google.maps.Marker({
      map: window.map,
      position: location,
      clickable: true,
    });

    marker.addListener('click', function() {
      console.log
    });

    window.mapMarkers.push(marker);

    return marker;
  };

  toggleDialog = () => {
    let { dialogOpen } = this.state;

    this.setState({
      dialogOpen: !dialogOpen
    });
  };

  render() {
    let placeCard = false,
      { detailIndex, dialogOpen } = this.state;

    if (dialogOpen) {
      placeCard =
        <Dialog
          title={ this.props.places[detailIndex].name }
          modal={false}
          open={dialogOpen}
          onRequestClose={this.toggleDialog}
        >

          <img src={this.props.places[detailIndex].image_url }/>
          <span>{ this.props.places[detailIndex].snippet_text }</span>
        </Dialog>
    }
    return (
      <div className={styles.mapWrapper}>
        <div className={styles.map} id='map'></div>
        {placeCard}
      </div>
    );
  }
}

const makeMapStateToProps = () => {
  return (state, props) => {
    let viewIndex = selectViewIndex(),
        loaded = selectMapsLoaded(),
        userLocation = selectLocation(),
        places = selectPlaces();
    return {
      loaded: loaded(state),
      userLocation: userLocation(state),
      selectViewIndex: viewIndex(state),
      places: places(state),
    };
  }
};

function mapDispatchToProps(dispatch) {
  return {
    loadMaps: () => dispatch(mapLoadRequest()),
    dispatch,
  };
}

export default connect(makeMapStateToProps(), mapDispatchToProps)(Map);