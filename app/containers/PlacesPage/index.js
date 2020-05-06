/*
 *
 * PlacesPage
 *
 */
// Dependencies
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import saga from './saga';
import reducer from './reducer';
import { push } from 'connected-react-router';

// Redux imports
import { placesRequest } from './actions';

import { userLocationRequest } from '../App/actions';

import {
  incPlacesIndex,
  decPlacesIndex,
  setPlacesIndex,
  detailRequest,
} from './actions';

import { selectLoadingGeo } from '../App/selectors';
import {
  selectPlaces,
  selectDetailById,
  selectPlacesLoading,
} from './selectors';

// Component imports
import Map from '../Map';
import List from '../../components/List';
import ListItem from '../../components/ListItem';
import LoadingSpinner from '../../components/LoadingSpinner';
import Card from '../../components/Card';

import { incrementIndex, decrementIndex } from './actions';

import { selectIndex } from './selectors';

import { selectLocation } from '../App/selectors';
import { SET_SELECTED_INDEX } from './constants';
import PulsingRamen from '../../components/PulsingRamen/pulsingRamen';
export class PlacesPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(typeof this.props.userLocation);
    if (typeof this.props.userLocation === 'boolean') {
      this.props.fetchLocation();
    } else {
      this.fetchPlaces();
    }
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
    if (
      prevProps.userLocation.error == undefined &&
      this.props.userLocation.error
    ) {
      console.log('error in geolocation');
    }
    if (prevProps.loadingLocation && !this.props.loadingLocation) {
      this.fetchPlaces();
    }
  }

  fetchPlaces = () => {
    let { latitude, longitude } = this.props.userLocation;

    this.props.fetchPlaces({
      latitude,
      longitude,
    });
  };

  locationValid = () => {
    let { geometry } = this.props.userLocation;

    if (!geometry) return false;
    let {
      location: { lat, lng },
    } = geometry;

    let latitude = parseInt(lat),
      longitude = parseInt(lng);

    if (!(Number.isInteger(latitude) && Number.isInteger(longitude)))
      return false;

    return (
      latitude < 90 && latitude > -90 && longitude < 180 && longitude > -180
    );
  };

  renderCardView = () => {
    let data = this.props.places[this.props.index];

    return (
      <div className="w-full md:w-2/3">
        <Card place={data} />
      </div>
    );
  };

  handleListItemClick = ({ id, index }) => {
    this.props.fetchDetail(id);
    this.props.setIndex(index);
  };

  renderListItems = places => {
    return places.map((place, i) => (
      <ListItem
        key={i}
        place={place}
        index={i + 1}
        onClick={this.handleListItemClick.bind(this, {
          id: place.id,
          index: i,
        })}
      />
    ));
  };

  showList = () => {
    this.props.setIndex(false);
  };

  renderList = () => {
    if (this.props.places.length) {
      console.log('inside renderlist');
      let { places } = this.props;
      let count = places.length;
      let items = this.renderListItems(places);

      return (
        <div className="w-full md:w-2/3">
          <List count={count}>{items}</List>;
        </div>
      );
    } else {
      console.log('no places');
      return false;
    }
  };

  render() {
    const { loadingLocation, loadingPlaces } = this.props;
    const length = this.props.places && this.props.places.length;
    const arrOfLoadingText = [
      'Simmering the broth..',
      'Pulling the noodles..',
      'Prepping the toppings..',
      'Cutting the Nori..',
      'Warming the bowl..',
    ];
    const rand = Math.floor(Math.random() * 5);
    const loadingText = arrOfLoadingText[rand];
    const index = this.props.index;

    return (
      <div className="container mx-auto">
        <div className="flex w-full">
          <button className="p-2 m-2 rounded bg-gray-600" onClick={this.props.setIndex.bind(this, false)}>View List</button>
        </div>
        <div className="flex flex-wrap flex-col-reverse md:flex-row md:p-4">
          {loadingLocation ||
            (loadingPlaces && (
              <div className="w-full md:w-2/3 text-center">
                <h1 className="font-semibold leading-relaxed text-4xl mb-4">
                  {loadingText}
                </h1>
                <div className="flex justify-center">
                  <LoadingSpinner className="w-32" />
                </div>
              </div>
            ))}
          {Number.isInteger(index) && length
            ? this.renderCardView()
            : this.renderList()}
          
            <Map classNames="w-full md:w-1/3 h-48 md:30vh"/>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  loadingLocation: selectLoadingGeo(state),
  loadingPlaces: selectPlacesLoading(state),
  userLocation: selectLocation(state),
  places: selectPlaces(state),
  index: selectIndex(state),
  detail: selectDetailById(state, ownProps),
});

function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchLocation: () => dispatch(userLocationRequest()),
    fetchPlaces: location => dispatch(placesRequest(location)),
    fetchDetail: id => dispatch(detailRequest(id)),
    incIndex: () => dispatch(incPlacesIndex()),
    decIndex: () => dispatch(decPlacesIndex()),
    setIndex: index => dispatch(setPlacesIndex(index)),
    goTo: location => dispatch(push(location)),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'places', saga });

export default compose(
  withConnect,
  withSaga,
)(PlacesPage);
