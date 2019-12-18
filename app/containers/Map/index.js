/*
 *
 * Map
 *
 */

import React from "react";
import { connect } from "react-redux";
import styles from "./styles.css";
import { createStructuredSelector } from "reselect";

// State Selectors
import { selectLocation } from "../App/selectors";

import { selectPlaces, selectPlaceByIndex } from "../PlacesPage/selectors";

import { selectMapsLoaded } from "./selectors";
import { selectIndex } from "../PlacesPage/selectors";

import { mapLoadRequest } from "./actions";
import { setPlacesIndex } from "../PlacesPage/actions";
import { loadGoogleMapsPromise } from "./actions";

export class Map extends React.Component {
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
    if (!this.googleMap) {
      loadGoogleMapsPromise().then(() => {
        this.mountMap();
      });
    }
  }

  mountMap = () => {
    let {
      userLocation: { latitude: lat, longitude: lng }
    } = this.props;
    console.log("mounting map");
    this.googleMap = new window.google.maps.Map(
      document.getElementById("map"),
      {
        center: { lat, lng },
        zoom: 15,
        disableDefaultUI: true
      }
    );
    console.log('wtf')
    this.userMarker = new window.google.maps.Marker({ position: { lat, lng }, map: this.googleMap });
  };

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

  placeUserMarkerOnMap = () => {
    let {
      userLocation: { longitude: lng, latitude: lat }
    } = this.props;
    console.log(userLocation);
    console.log("blahhhhh");
    this.userMarker = new google.maps.Marker({ position: { lat, lng }, map: this.googleMap});
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

    googleMap.fitBounds(bounds);
  };

  /**
   *
   *
   * @memberof Map
   */
  placeAllPlacesOnMap = arrOfCoords => {
    let markers = [];
    arrOfCoords.map((coords, i) => {
      markers.push(new window.google.maps.Marker({
        map: googleMap,
        position: coords,
        label: i.toString(),
      }));
    });
    return markers;
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

  render() {
    let { viewIndex } = this.props;
    
    if (Number.isInteger(viewIndex)) {
      this.showSelectedPlaceOnMap();
    }

    return (
      <div className={styles.mapWrapper}>
        <div className={styles.map} id="map"></div>
      </div>
    );
  }
}

const makeMapStateToProps = () => {
  return (state, props) => {
    let viewIndex = selectIndex(),
      loaded = selectMapsLoaded(),
      userLocation = selectLocation(),
      places = selectPlaces();
    return {
      loaded: loaded(state),
      userLocation: userLocation(state),
      viewIndex: viewIndex(state),
      places: places(state)
    };
  };
};

function mapDispatchToProps(dispatch) {
  return {
    loadMaps: () => dispatch(mapLoadRequest()),
    setPlaceIndex: index => dispatch(setPlacesIndex(index)),
    dispatch
  };
}

export default connect(makeMapStateToProps(), mapDispatchToProps)(Map);
