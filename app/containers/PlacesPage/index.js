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
import { selectLoading } from '../App/selectors';
import { selectPlaces } from './selectors';

// Component imports
import Map from '../Map';
import List from '../../components/List';
import ListItem from '../../components/ListItem';

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

  componentWillMount() {
    // has location
    // -- request places
    // doesn't have location
    // -- request location
    // location but no places
    // no location and no places
    if (!this.props.userLocation.geometry) {
      this.props.fetchLocation();
    } else {
      this.fetchPlaces();
    }
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
    if (prevProps.loadingLocation && !this.props.loadingLocation) {
      this.fetchPlaces();
    }
  }

  fetchPlaces = () => {
    let { latitude, longitude } = this.props.userLocation;

    this.props.fetchPlaces({
      latitude,
      longitude
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

  renderListItems = (places) => {
    if (!places) return false;

    return places.map((place) => (
      <ListItem place={place}/>
    ));
  };

  renderList = () => {
    let { places } = this.props;
    let count = places.length;
    let items = this.renderListItems(places);

    return (
      <List count={count}>
        {items}
      </List>
    )
  };

  render() {
    const List = this.renderList();

    return (
        <div className="row">
          <div className="col m7">
            <Map />
          </div>
          <div className="col m5">
            {List}
          </div>
        </div>
    );
  }
}

const makeMapStateToProps = () => {

  const location = selectLocation(),
        index = selectIndex(),
        places = selectPlaces(),
        loading = selectLoading();

  const mapStateToProps = (state, props) => {
    return {
      loadingLocation: loading(state),
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
