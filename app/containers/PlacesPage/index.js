/*
 *
 * PlacesPage
 *
 */
// Dependencies 
import React from 'react';
import { connect } from 'react-redux';
import { replace, push } from 'react-router-redux';
import styles from './styles.css';

// Redux imports
import { placesRequest } from './actions';
import PlaceCard from '../../components/PlaceCard';
import List from '../../components/List';
import { userLocationRequest } from '../HomePage/actions';
import { selectPlaces } from './selectors';

// Material-ui imports
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ViewMap from 'material-ui/svg-icons/maps/map';
import ViewList from 'material-ui/svg-icons/action/view-list';

// Component imports
import LoadingIcon from '../../components/LoadingIcon';

import {
  selectUserLocation,
} from '../HomePage/selectors';

export class PlacesPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidUpdate(prevProps, prevState, prevContext) {
    if (!prevProps.userLocation.longitude && !prevProps.userLocation.latitude && this.locationValid()) {
      console.log('fetching places');
      let { latitude, longitude } = this.props.userLocation;

      this.props.fetchPlaces({
        latitude,
        longitude,
      });
    }
  }

  componentDidMount() {
    if (!this.locationValid()) {
      this.props.fetchLocation();
    } else if (!this.props.places) {
      /*this.props.fetchPlaces();*/
      console.log('No places!')
    }
  }

  locationValid = () => {
    let { longitude, latitude } = this.props.userLocation;
    let lat = parseInt(latitude),
        lng = parseInt(longitude);

    if (!(Number.isInteger(lat) && Number.isInteger(lng)))
      return false;

    return (lat < 90 && lat > -90 && lng < 180 && lng > -180);
  };

  renderMainContent = () => {

    if (this.locationValid() && this.props.places) {
      let { mode } = this.props.location.query;
      switch(mode) {
        case 'list':
          return (
            <List places={this.props.places.toJS()}/>
          )
        case 'map':
          return <h1>Map</h1>
        default :
          return (
            <div className={styles.placeCardWrapper}>
              <PlaceCard place={this.props.places.get(0).toJS()}/>
            </div>
          )
      }
    } else {
      return (
        <LoadingIcon status="Loading..."/>
      )
    }
  };

  renderActionButton = () => {
    if (!this.locationValid()) return;

    let { pathname } = this.props.location;
    let path = '',
        icon = '';

    switch (pathname) {
      case '/list' :
        path = '/map';
        icon = <ViewMap/>;
        break;
      case '/map' :
        path = '/list';
        icon = <ViewList/>;
        break;
    }

    return (
      <FloatingActionButton
        className={styles.actionButton}
        onTouchTap={() => { this.props.dispatch(push(path))}}>
        {icon}
      </FloatingActionButton>

    );
  };

  render() {
    let mainContent = this.renderMainContent();

    return (
      <div className={styles.placesPage}>
        {mainContent}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userLocation: selectUserLocation(state),
    places: selectPlaces(state),
  };
};

function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchLocation: () => dispatch(userLocationRequest()),
    fetchPlaces: (location) => dispatch(placesRequest(location)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlacesPage);
