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
import PlaceCard from '../../components/PlaceCard';
import List from '../../components/List';
import { userLocationRequest } from '../App/actions';
import {
  incPlacesIndex,
  decPlacesIndex,
  setPlacesIndex
} from './actions';
import { selectPlaces } from './selectors';

// Material-ui imports
import RaisedButton from 'material-ui/RaisedButton';
import Badge from 'material-ui/Badge';
import NavBefore from 'material-ui/svg-icons/image/navigate-before';
import NavNext from 'material-ui/svg-icons/image/navigate-next';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import ViewListIcon from 'material-ui/svg-icons/action/view-list';
import MapIcon from 'material-ui/svg-icons/maps/map';

// Component imports
import LoadingIcon from '../../components/LoadingIcon';
import Map from '../Map';

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

  renderMainContent = () => {
    let { index, places } = this.props;

    if (places.length && this.locationValid()) {
      let { mode } = this.props.location.query;
      let size = places.length;
      switch(mode) {
        case 'list':
          return (
            <List
              places={this.props.places}
              onTouchTap={this.props.setIndex}
            />
          );
        case 'map':
          return <Map/>;
        default :
          return (
            <div className={styles.placeCardWrapper}>
              <div className={styles.navButtonsWrapper}>
                <RaisedButton
                  backgroundColor="#a4c639"
                  icon={<NavBefore/>}
                  onTouchTap={this.props.decIndex}
                  className={styles.decIndexButton}
                  disabled={index == 0}
                />
                <RaisedButton
                  backgroundColor="#a4c639"
                  icon={<NavNext/>}
                  onTouchTap={this.props.incIndex}
                  className={styles.incIndexButton}
                  disabled={index == size-1}
                />
              </div>
              
              <PlaceCard
                place={this.props.places[index]}
                showMapClick={this.props.goTo({
                  pathname: '/search',
                  query: {
                    mode: 'map'
                  },
                })}
              />
            </div>
          )
      }
    } else {
      return (
        <LoadingIcon status="Loading..."/>
      )
    }
  };

  renderFilterBar = () => {
    if (this.props.places && this.locationValid()) {
      let size = this.props.places.length;

      return (
        <Paper className={styles.filterBar}>
          <Badge
            badgeContent={size}
            secondary={true}
            badgeStyle={{top: 15, right: 15}}
          >
            <IconButton
            touch={true}
            onTouchTap={this.props.goTo({
              pathname: '/search',
              query: {
                mode: 'list'
              }
            })}>
            <ViewListIcon/>
          </IconButton>
          </Badge>
          <p>Found <strong>{size}</strong> noodle places near you!</p>
          <IconButton
            onTouchTap={this.props.goTo({
            pathname: '/search',
            query: {
            mode: 'map'
            }
            })}>
            <MapIcon/>
          </IconButton>
        </Paper>
      )
    }
    return null;
  };

  render() {
    let mainContent = this.renderMainContent();
    let filterBar = this.renderFilterBar();

    return (
      <div className={styles.placesPage}>
        {filterBar}
        {mainContent}
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
