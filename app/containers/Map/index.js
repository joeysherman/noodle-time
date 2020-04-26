/*
 *
 * Map
 *
 */

import React from "react";
import { connect } from "react-redux";
import { compose } from 'redux';
import styles from "./styles.css";
import injectReducer from "utils/injectReducer";
import { createStructuredSelector } from "reselect";

// State Selectors
import { selectLocation } from "../App/selectors";

import { selectPlaces, selectPlaceByIndex } from "../PlacesPage/selectors";

import { selectIndex } from "../PlacesPage/selectors";

import { mapLoadRequest } from "./actions";
import { setPlacesIndex } from "../PlacesPage/actions";

import GoogleMapReact from 'google-map-react';

import reducer from "./reducer";

class Map extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  
  constructor(props) {
    super(props);
    this.googleMap = undefined;
    this.markers = [];
    this.state = {
      map: {}
    };
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
    // location change?
    // show route to place?
    //
  }

  componentDidMount() {
    
  }

  handleApiLoaded(map, maps) {
    this.map = map;
    this.maps = maps;
    this.placeUserMarkerOnMap();
    this.placeAllPlacesOnMap();
  }

  showSelectedPlaceOnMap = () => {
    console.log('showSelectedPlacesOnMap');
    let _bounds = new google.maps.LatLngBounds();
    let {
      userLocation: { latitude: lat, longitude: lng }
    } = this.props;
    let { viewIndex } = this.props;
    let selectedPlace = this.props.places[viewIndex];
    if (selectedPlace) {
      let userCoords = {
        lat,
        lng,
      };
      let placeCoords = {
        lat: selectedPlace.coordinates.latitude,
        lng: selectedPlace.coordinates.longitude,
      };
      _bounds = _bounds.extend(userCoords);
      _bounds = _bounds.extend(placeCoords);
      this.markers.push(new google.maps.Marker({ position: placeCoords, map: this.googleMap }));
      this.googleMap.fitBounds(_bounds, { bottom: 20, left: 20, right: 20, top: 60 });
    }
  };

  placeUserMarkerOnMap() {
    let { longitude, latitude } = this.props.userLocation;
    this.userMarker = new this.maps.Marker({ position: { lat: latitude, lng: longitude }, map: this.map, icon: "http://maps.google.com/mapfiles/kml/shapes/man.png" });
  };

  attachListenerToMarker = (marker, index) => {
    marker.addListener("click", () => {
      console.log("You clicked: " + index);
      this.props.setPlaceIndex(index);
    });
  };

  checkDirectionsService = () => {
    if (!window.directionService) {
      window.directionService = new window.google.maps.DirectionsService();
    }
    return true;
  };

  checkRendererService = () => {
    if (!window.rendererService) {
      window.rendererService = new window.google.maps.DirectionsRenderer({
        map: window.map
      });
    }
    return true;
  };

  checkDirectionsStatus = status => {
    switch (status) {
      case "INVALID_REQUEST":
        break;
      case "MAX_WAYPOINTS_EXCEEDED":
        break;
      case "NOT_FOUND":
        break;
      case "OK":
        break;
      case "OVER_QUERY_LIMIT":
        break;
      case "REQUEST_DENIED":
        break;
      case "UNKNOWN_ERROR":
        break;
      case "ZERO_RESULTS":
        break;
      default:
        break;
    }
  };

  /**
   * getPLaceCoords
   * 
   * @param Places Array of place locations from props. 
   * @memberof Map
   */
  getPlaceCoords = places => {
    return places.map(item => {
      return {
        lat: item.coordinates.latitude,
        lng: item.coordinates.longitude
      };
    });
  };

  extendMapBounds = arrOfCoords => {
    let bounds = new google.maps.LatLngBounds();

    arrOfCoords.forEach(coords => {
      bounds = bounds.extend(coords);
    });

    this.map.fitBounds(bounds);
  };

  /**
   *
   *
   * @memberof Map
   */
  placeAllPlacesOnMap() {
    let { places } = this.props;
    if (!places.length) return;
    let self = this;
    let arrOfCoords = this.getPlaceCoords(places);
    let markers = [];
    arrOfCoords.map((coords, i) => {
      let marker = new self.maps.Marker({
        map: self.map,
        position: coords,
        label: i.toString(),
      });
      markers.push(marker);
    });
    return markers;
  };

  renderPlaceMarkers = () => {
    const AnyReactComponent = ({ text }) => <div>{text}</div>;
    const { places } = this.props;
    const allCoords = this.getPlaceCoords(places);

    const placeMarkers = allCoords.map(function ({lat, lng}) {
      
      return (
        <AnyReactComponent
          lat={lat}
          lng={lng}
          text="My Marker"
          />
      )
    });

    return placeMarkers;
  };

  removeMarkersFromMap = (id) => {
    if (id) {
      delete this.markers[id]; 
    } else {
      this.markers = {};
    }
  };

  getDirectionsRequest = () => {
    let origin = {
      lat: this.props.userLocation.geometry.location.lat,
      lng: this.props.userLocation.geometry.location.lng
    };
    let destination = {
      lat: this.props.destination.location.coordinate.latitude,
      lng: this.props.destination.location.coordinate.longitude
    };
    let query = {
      origin,
      destination,
      travelMode: "DRIVING"
    };

    return query;
  };
/**
 *
 *
 * @memberof Map
 */
renderDirectionsOnMap = directions => {
    if (this.checkRendererService()) {
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

  toggleDialog = () => {
    let { dialogOpen } = this.state;

    this.setState({
      dialogOpen: !dialogOpen
    });
  };

  testChildClick(hoverKey, childProps) {
    console.log(JSON.stringify(childProps));
  };

  render() {
    const { latitude, longitude } = this.props.userLocation;
    const { classNames } = this.props;
    const center = {};
    if (latitude && longitude) {
      center.lat = latitude;
      center.lng = longitude;
    }

    return (
      // Important! Always set the container height explicitly
      <div className={classNames || false}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBUXW19bkxMuxxTC3it0l_3lG1c8CPSCQc' }}
          defaultCenter={center}
          center={{lat: latitude, lng: longitude }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({map, maps}) => this.handleApiLoaded(map, maps)}
          defaultZoom={11}
          onChildClick={this.testChildClick}
        >
        </GoogleMapReact>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  userLocation: selectLocation(state),
  places: selectPlaces(state),
});

function mapDispatchToProps(dispatch) {
  return {
    loadMaps: () => dispatch(mapLoadRequest()),
    setPlaceIndex: index => dispatch(setPlacesIndex(index)),
    dispatch
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'map', reducer });

export default compose(
  withReducer,
  withConnect,
  )(Map);
