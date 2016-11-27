/*
 *
 * PlacesPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { selectPlaceByIndex } from './selectors';
import { replace, push } from 'react-router-redux';
import styles from './styles.css';
import { placesRequest } from './actions';
import PlaceCard from '../../components/PlaceCard';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ViewList from 'material-ui/svg-icons/action/view-list';

import CircularProgress from 'material-ui/CircularProgress';

import {
  selectUserLocation,
} from '../HomePage/selectors';

export class PlacesPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    console.log('mounted');
    if (this.locationValid()) {
      let { latitude, longitude } = this.props.userLocation;

      this.props.dispatch(placesRequest({
        lat: latitude,
        lng: longitude,
      }));
    } else {
      this.props.dispatch(replace('/'));
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

  renderActionButton = () => {
    return (
      <FloatingActionButton className={styles.actionButton} onTouchTap={() => { this.props.dispatch(push('/near/list'))}}>
        <ViewList/>
      </FloatingActionButton>
    );
  };

  render() {
    let mainContent = [],
        actionButton = [];
    let { children, place } = this.props;

    if (children) {
      mainContent = React.Children.toArray(this.props.children);
    } else if (place) {
      mainContent = (
        <div className={styles.placeCardWrapper}>
          <PlaceCard place={place}/>
        </div>
      )
    } else {
      mainContent = (
        <div className={styles.loadingWrapper}>
          <CircularProgress className={styles.loadingIcon}/>
        </div>
      )
    }

    actionButton = this.renderActionButton();

    return (
      <div className={styles.placesPage}>
        {actionButton}
        {mainContent}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let selectFirstPlace = selectPlaceByIndex(0);
  return {
    userLocation: selectUserLocation(state),
    place: selectFirstPlace(state),
  };
};

function mapDispatchToProps(dispatch, ownProps) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlacesPage);
