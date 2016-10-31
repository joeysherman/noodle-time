/**
 * Created by Joey on 10/22/2016.
 */


import React from 'react';
import { connect } from 'react-redux';
import { push, replace } from 'react-router-redux';
import styles from './styles.css';

import PlaceCard from '../../components/PlaceCard';

import {
  selectMapLoaded,
  selectPlaceIndex,
} from './selectors';

import {
  selectPlaces,
  selectUserLocation,
  selectDistances,
} from '../HomePage/selectors';

import {
  mapLoadRequest,
  mapMarkerClicked,
} from './actions';


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
    if (!window.google){
      this.props.loadGoogleMaps();
    } else {
      this.mountMap();
    }
  }

  componentWillReceiveProps(nextProps) {
    let { loaded } = nextProps;

    if ((loaded) && (typeof loaded == 'boolean') && (this.props.loaded == 'pending')){
      let { longitude, latitude } = this.props.userLocation;
      let userLocation = { lat: latitude, lng: longitude };

      this.mountMap(userLocation);
      this.placeUserLocationMarker(userLocation);
      this.placeNoodleMarkers();
    }
  }

  mountMap = (center) => {
    window.map = new window.google.maps.Map(document.getElementById('map'), {
      center: center,
      zoom: 15,
    });
  };

  placeUserLocationMarker = (location) => {
    if (!window.mapMarkers){
      window.mapMarkers = [];
    }
    let marker = new window.google.maps.Marker({
      map: window.map,
      position: location,
    });
    window.mapMarkers.push(marker);
  };

  placeNoodleMarkers = () => {
    var marker;
    window.mapMarkers = [];
    this.props.places.forEach((place, index) => {
      marker = new window.google.maps.Marker({
        map: window.map,
        position: place.geometry.location,
      });
      marker.addListener('click', () => { this.props.markerClicked(index) });
      window.mapMarkers.push(marker);
    });
  };

  renderCardList = () => {
    let { places } = this.props;
    if (places) {
      return places.map((place, i) => <PlaceCard key={i} place={place}/>);
    }
  };

  determineSelectedIndex = () => {
    if (this.props.selectedPlaceIndex){
      return this.props.selectedPlaceIndex;
    } else {
      return this.props.distances[0].place_index;
    }
  };

  renderCard = () => {
    if (this.props.distances) {
      let index = this.determineSelectedIndex();

      return <PlaceCard place={this.props.places[index]}/>
    }
  };

  render = () => {
    let cards = null;

    if (this.props.listMode && this.props.places) {
      cards = this.renderCardList();
    } else {
      cards = this.renderCard();
    }

    return (
      <div className={styles.mapWrapper}>
        <div id="map" className={styles.map}>
        </div>
        <div className={styles.cardWrapper}>
          {cards}
        </div>
      </div>
    )
  };
};

const mapStateToProps = (state) => {
  return {
    loaded: selectMapLoaded(state),
    places: selectPlaces(state),
    distances: selectDistances(state),
    userLocation: selectUserLocation(state),
    selectedPlaceIndex: selectPlaceIndex(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadGoogleMaps : () => dispatch(mapLoadRequest()),
    markerClicked: (index) => dispatch(mapMarkerClicked(index)),
    dispatch,

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);