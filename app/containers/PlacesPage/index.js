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
import { Link } from 'react-router-dom';
import queryString from 'query-string';

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
import Review from '../../components/Review';
import ActionBar from '../../components/ActionBar';
import { Trail } from 'react-spring/renderprops';

import { incrementIndex, decrementIndex } from './actions';

import { selectIndex } from './selectors';

import { selectLocation } from '../App/selectors';
import { SET_SELECTED_INDEX } from './constants';
import PulsingRamen from '../../components/PulsingRamen/pulsingRamen';
export class PlacesPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = { showMap: window.innerWidth >= 768 };
  }

  componentDidMount() {
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

  componentWillUnmount() {}

  componentWillMount() {
    if (window.innerWidth >= 768) {
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
    let placeData = this.props.places[this.props.index];
    let loading = this.props.loading === 'details';
    let detailData = this.props.detail;
    let reviewsObject = detailData && detailData.reviews;
    let details = detailData && detailData.detail;

    return (
      <div className="w-full md:w-3/5">
        <Card place={placeData} detail={details} loading={loading}>
          {reviewsObject ? (
            <Trail
              keys={item => item.id}
              items={reviewsObject.reviews}
              from={{ opacity: 0, transform: 'translate3d(-40px,0,0)' }}
              to={{ opacity: 1, transform: 'translate3d(0,0px,0)' }}
              delay={100}
            >
              {item => props => <Review data={item} style={props} />}
            </Trail>
          ) : (
            <LoadingSpinner />
          )}
        </Card>
      </div>
    );
  };

  handleListItemClick = ({ id, index }) => {
    this.props.history.push({
      pathname: '/places',
      search: `?detail=${id}`,
    });
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
      let placesToRender = places.slice(0, count >= 5 ? 5 : count);
      let items = this.renderListItems(placesToRender);
      return (
        <div className="w-full md:w-3/5 bg-white rounded shadow-md">
          <Trail
            items={items}
            keys={item => item.key}
            from={{ opacity: 0, transform: 'translate3d(-20px,0px,0)' }}
            to={{ opacity: 1, transform: 'translate3d(0,0px,0)' }}
            delay={100}
          >
            {item => props => <div style={props}>{item}</div>}
          </Trail>
        </div>
      );
    } else {
      console.log('no places');
      return false;
    }
  };

  renderBackButton = () => {
    return (
      <Link to={{
        pathname: "/places"
      }} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
      Back
    </Link>
    )
  }

  renderActionButton = () => {
    return (
      <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
            Filter
          </button>
    )
  }

  render() {
    const { loadingLocation, loading } = this.props;
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
    const qs = queryString.parse(this.props.history.location.search);
    const showMap = this.state.showMap || (qs.mode && qs.mode == 'map');
    const mapLink = {
      ...qs,
      mode: 'map',
    };
    const showDetail = qs && qs.detail && length;

    return (
      <div className="container mx-auto">
        <ActionBar className="p-2 flex justify-between items-center bg-white">
          {showDetail ? this.renderBackButton() : this.renderActionButton()}
          <div>{!showDetail && <h3>Showing {length} places near you.</h3>}</div>
          <div className="inline-flex">
            <Link
              to={{
                pathname: '/places',
                search: queryString.stringify(mapLink),
              }}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
            >
              Map
            </Link>
            <Link
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
              to={{
                pathname: '/places',
              }}
            >
              List
            </Link>
          </div>
        </ActionBar>
        <div className="flex flex-wrap flex-col-reverse md:flex-row md:flex-no-wrap">
          {loadingLocation ||
            (loading === 'places' && (
              <div className="w-full md:w-3/5 text-center">
                <h1 className="font-semibold leading-relaxed text-4xl mb-4">
                  {loadingText}
                </h1>
                <div className="flex justify-center">
                  <LoadingSpinner className="w-32" />
                </div>
              </div>
            ))}
          {showDetail ? this.renderCardView() : this.renderList()}
          {showMap ? (
            <Map classNames="w-full md:w-2/5 h-48 md:h-64 md:ml-8" />
          ) : (
            false
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  loadingLocation: selectLoadingGeo(state),
  loading: selectPlacesLoading(state),
  userLocation: selectLocation(state),
  places: selectPlaces(state),
  index: selectIndex(state),
  detail: selectDetailById(
    state,
    queryString.parse(ownProps.history.location.search),
  ),
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
