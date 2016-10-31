/**
 * Created by Joey on 10/22/2016.
 */


import React from 'react';
import { connect } from 'react-redux';
import { push, replace } from 'react-router-redux';
import styles from './styles.css';

import PlaceCard from '../../components/PlaceCard';

import {
  selectMapLoaded
} from './selectors';

import {
  selectPlaces,
  selectUserLocation,
  selectDistances,
} from '../HomePage/selectors';

import {
  mapLoadRequest
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

    console.log(loaded + typeof loaded);
    if ((loaded) && (typeof loaded == 'boolean')){
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
      label: 'You',
    });
    window.mapMarkers.push(marker);
  };

  placeNoodleMarkers = () => {
    window.mapMarkers = [];
    this.props.places.forEach((place) => {
      window.mapMarkers.push(new window.google.maps.Marker({
        map: window.map,
        position: place.geometry.location,
      }));
    });
  };

  renderCardList = () => {
    let { places } = this.props;
    if (places) {
      return places.map((place, i) => <PlaceCard key={i} place={place}/>);
    }
  };

  renderCard = () => {
    if (this.props.distances) {
      let index = this.props.distances[0].place_index;

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
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadGoogleMaps : () => dispatch(mapLoadRequest()),
    dispatch,

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);