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
import Loader from '../../components/LoadingSpinner';
import Card from '../../components/Card';
import ListWrapper from '../../components/ListWrapper';
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
    if (!prevProps.userLocation.geometry && this.props.userLocation.geometry) {
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

  renderCard() {
    const { index } = this.props;
    const place = this.props.places[index];
    if (this.props.places.length) {
      console.log('rendering single card')
      return <div className="col s12 l6"><Card place={place}/></div>
    }
  }

  renderList() {
    const listItems = this.props.places.map((place) => <ListItem place={place}/>);

    return (
      <ListWrapper>
        {listItems}
      </ListWrapper>
    )
  }

  renderCards() {
    return this.props.places.length ?
      this.props.places.map((data, i) => <div className="col s12 l6" key={i}><Card place={data}/></div>) : false;
  }

  renderContent() {
    if (this.props.loadingLocation || !this.props.userLocation.geometry) {
      console.log('Loading spinner for location')
      return (
        <Loader/>
      )
    } else {
      return (
        <div className="row">
          <div className="col s12 m5">
            <Map/>
          </div>
          <div className="col s12 m7">
            <div className="row">
              {this.props.index === false ? this.renderList() : this.renderCard()}
            </div>
          </div>
        </div>
      )
    }
  }

  render() {
    let main = this.renderContent();
    return (
      <div>
        {main}
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
