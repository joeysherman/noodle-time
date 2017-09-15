/*
 *
 * PlacesPage
 *
 */
// Dependencies 
import React from 'react';
import { connect } from 'react-redux';
import { replace, push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import styles from './styles.css';

// Redux imports
import { placesRequest } from './actions';
import { userLocationRequest } from '../App/actions';
import {
  incPlacesIndex,
  decPlacesIndex,
  setPlacesIndex
} from './actions';
import { selectPlaces } from './selectors';

// Component imports
import Map from '../Map';

import Card from '../../components/Card';

import {
  incrementIndex,
  decrementIndex,
} from './actions';

import {
  selectIndex,
} from './selectors';

import {
  selectLocation,
} from '../App/selectors';

export class PlacesPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
    console.log('Places page did update')
    if (!prevProps.userLocation.geometry && !prevProps.userLocation.geometry && this.locationValid()) {
      console.log('fetching places did update');
      this.fetchPlaces();
    }
  }

  componentDidMount() {
    console.log('Places page mounted')
    if (!this.locationValid()) {
      return this.props.fetchLocation();
    } else {
      this.fetchPlaces();
    }
  }



  fetchPlaces = () => {
    let { geometry: { location: { lat, lng }}} = this.props.userLocation;

    this.props.fetchPlaces({
      latitude: lat,
      longitude: lng,
    });
  };

  locationValid = () => {
    let { geometry } = this.props.userLocation;

    if (!geometry) return false;
    let { location: { lat, lng }} = geometry;

    let latitude = parseInt(lat),
        longitude = parseInt(lng);

    if (!(Number.isInteger(latitude) && Number.isInteger(longitude)))
      return false;

    return (latitude < 90 && latitude > -90 && longitude < 180 && longitude > -180);
  };

  handleListItemClick = (index) => {
    this.props.setIndex(index);
    this.props.goTo('/search')();
  };

  renderCards() {
    return this.props.places.map((data, i) => <div className="col s6 m4 l3"><Card key={i} place={data}/></div>);
  }

  render() {
    let count = <h1>Found {this.props.places.length} ramen places nearby...</h1>;
    let placeCards = this.renderCards();
    return (
      <div>
        <div className="row">
          <div className="col s12 m6 l4">
            <Map/>
          </div>
          <div className="col s12 m6 l8">
            <div className="row">
              {placeCards}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const makeMapStateToProps = () => {

  const location = selectLocation(),
        index = selectIndex(),
        places = selectPlaces();
  const mapStateToProps = (state, props) => {
    return {
      userLocation: location(state),
      index: index(state),
      places: places(state),
    }
  }
  return mapStateToProps;
};

function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchLocation: () => dispatch(userLocationRequest()),
    fetchPlaces: (location) => dispatch(placesRequest(location)),
    incIndex: () => dispatch(incPlacesIndex()),
    decIndex: () => dispatch(decPlacesIndex()),
    setIndex: (index) => dispatch(setPlacesIndex(index)),
    goTo: (address) => ()=> dispatch(push(address)),
    dispatch,
  };
}

export default connect(makeMapStateToProps, mapDispatchToProps)(PlacesPage);
