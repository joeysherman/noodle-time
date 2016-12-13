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
import { selectPlaces } from './selectors';

// Material-ui imports
import RaisedButton from 'material-ui/RaisedButton';
import NavBefore from 'material-ui/svg-icons/image/navigate-before';
import NavNext from 'material-ui/svg-icons/image/navigate-next';


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

  componentDidUpdate(prevProps, prevState, prevContext) {
    if (!prevProps.userLocation.longitude && !prevProps.userLocation.latitude && this.locationValid()) {
      console.log('fetching places did update');

      this.fetchPlaces();
    }
  }

  componentDidMount() {
    if (!this.locationValid()) {
      this.props.fetchLocation();
    } else if (!this.props.places) {
      console.log('No places!')
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
    let { longitude, latitude } = this.props.userLocation;
    let lat = parseInt(latitude),
        lng = parseInt(longitude);

    if (!(Number.isInteger(lat) && Number.isInteger(lng)))
      return false;

    return (lat < 90 && lat > -90 && lng < 180 && lng > -180);
  };

  // type :
  // inc 1
  // dex -1
  renderNavButton = (type) => {
    let { index } = this.props;
    let { size } = this.props.places;

    if (type === 1) {
      if (index !== size-1) {
        return (
          <RaisedButton
            backgroundColor="#a4c639"
            icon={<NavNext/>}
            onTouchTap={this.props.incIndex}
          />
        )
      }
    } else {
      if (index > 0) {
        return (
          <RaisedButton
            backgroundColor="#a4c639"
            icon={<NavBefore/>}
            onTouchTap={this.props.decIndex}
          />
        )
      }
    }
  };

  renderMainContent = () => {
    let { index } = this.props;

    if (this.locationValid() && this.props.places) {
      let { mode } = this.props.location.query;
      switch(mode) {
        case 'list':
          return (
            <List places={this.props.places.toJS()}/>
          );
        case 'map':
          return <Map userLocation={this.props.userLocation} destination={this.props.places.get(index).toJS()}></Map>
        default :
          return (
            <div className={styles.placeCardWrapper}>
              {this.renderNavButton(-1)}
              <PlaceCard
                place={this.props.places.get(index).toJS()}
                showMapClick={() => this.props.dispatch(push({
                  pathname: '/search',
                  query: {
                    mode: 'map'
                  },
                }))}
              />
              {this.renderNavButton(1)}
            </div>
          )
      }
    } else {
      return (
        <LoadingIcon status="Loading..."/>
      )
    }
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

const mapStateToProps = createStructuredSelector({
    userLocation: selectLocation(),
    index: selectIndex(),
    places: selectPlaces(),
});

function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchLocation: () => dispatch(userLocationRequest()),
    fetchPlaces: (location) => dispatch(placesRequest(location)),
    goTo: (address) => ()=> dispatch(push(address)),
    incIndex: () => dispatch(incrementIndex()),
    decIndex: () => dispatch(decrementIndex()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlacesPage);
