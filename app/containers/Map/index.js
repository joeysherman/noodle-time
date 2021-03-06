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
import PulsingRamen from "../../components/PulsingRamen/pulsingRamen";

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

  componentWillUpdate() {

  }

  componentDidUpdate(prevProps, prevState, prevContext) {
    // location change?
    // show route to place?
    if (prevProps.viewIndex !== this.props.viewIndex) {
      if (Number.isInteger(this.props.viewIndex)) {
        this.extendMapBoundsForSelection();
        this.getDirections();
      } else {
        this.extendMapBoundsForAll();
      }
    }
  }

  handleApiLoaded(map, maps) {
    this.map = map;
    this.maps = maps;
    this.placeUserMarkerOnMap();
  }

  extendMapBoundsForSelection = () => {
    console.log('showSelectedPlacesOnMap');
    let _bounds = new this.maps.LatLngBounds();
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
      this.map.fitBounds(_bounds, { bottom: 20, left: 20, right: 20, top: 20 });
    }
  };

  placeUserMarkerOnMap() {
    let { longitude, latitude } = this.props.userLocation;
    this.userMarker = new this.maps.Marker({ position: { lat: latitude, lng: longitude }, map: this.map, icon: "http://maps.google.com/mapfiles/kml/shapes/man.png", zIndex: 999999999 });
  };

  checkDirectionsService = () => {
    if (!window.directionService) {
      window.directionService = new this.maps.DirectionsService();
    }
    return true;
  };

  checkRendererService = () => {
    if (!window.rendererService) {
      window.rendererService = new this.maps.DirectionsRenderer({
        map: this.map
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
        text: item.name,
        lat: item.coordinates.latitude,
        lng: item.coordinates.longitude
      };
    });
  };

  extendMapBoundsForAll() {
    let { places } = this.props;
    if (!places.length) return;
    let arrOfCoords = this.getPlaceCoords(places);
    let bounds = new this.maps.LatLngBounds();

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

  renderSingleMarker = () => {
    const { places, viewIndex } = this.props;
    const place = places[viewIndex];
    console.log(place);
    return (
      <PulsingRamen
        width={"32px"}
        height={"32px"}
        lat={place.coordinates.latitude}
        lng={place.coordinates.longitude}
        text={place.name}
        index={viewIndex}
        key={viewIndex}
        />
    );
  };

  renderPlaceMarkers = () => {
    if (Number.isInteger(this.props.viewIndex)) return this.renderSingleMarker();

    const { places } = this.props;
    const allCoords = this.getPlaceCoords(places);
    const placeMarkers = allCoords.map(function ({lat, lng, text}, index) {
      
      return (
        <PulsingRamen
          width={"32px"}
          height={"32px"}
          lat={lat}
          lng={lng}
          text={text}
          index={index}
          key={index}
          />
      )
    });

    return placeMarkers;
  };

  getDirectionsRequest = () => {
    const { places, viewIndex, userLocation } = this.props;
    const place = places[viewIndex];

    let origin = {
      lat: userLocation.latitude,
      lng: userLocation.longitude
    };
    let destination = {
      lat: place.coordinates.latitude,
      lng: place.coordinates.longitude
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
  console.log("Rendering Directions")
    if (this.checkRendererService()) {
      window.rendererService.setDirections(directions);
      window.rendererService.setMap(this.map);
    }
  };

  /*
   * DirectionsResult -
   * geocoded_waypoints: [DirectionsGeocodedWaypoint]
   * routes: [DirectionsRoute]
   *
   * */
  getDirections = () => {
    console.log("Getting Directions")
    if (this.checkDirectionsService()) {
      let request = this.getDirectionsRequest();
      console.log("Getting Directions inside")
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

  toggleDialog = () => {
    let { dialogOpen } = this.state;

    this.setState({
      dialogOpen: !dialogOpen
    });
  };

  mapChildClick(hoverKey, childProps) {
    this.props.setPlaceIndex(childProps.index);
    console.log(JSON.stringify(childProps));
  };

  render() {
    const { latitude, longitude } = this.props.userLocation;
    const { classNames, viewIndex } = this.props;
    const center = {};
    if (latitude && longitude) {
      center.lat = latitude;
      center.lng = longitude;
    }
    const markers = this.props.places.length ? this.renderPlaceMarkers() : false;

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
          onChildClick={this.mapChildClick.bind(this)}
        >
          {markers}
        </GoogleMapReact>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  userLocation: selectLocation(state),
  places: selectPlaces(state),
  viewIndex: selectIndex(state),
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
