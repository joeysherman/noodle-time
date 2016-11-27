/*
 *
 * PlacesPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { selectPlaces } from './selectors';
import { replace } from 'react-router-redux';
import styles from './styles.css';
import { placesRequest } from './actions';
import PlaceCard from '../../components/PlaceCard';
import List from '../../components/List';

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

  render() {
    let mainContent = [];
    let { children } = this.props;

    if (children) {
      mainContent = React.Children.toArray(this.props.children);
    } else {
      mainContent = <PlaceCard/>
    }
    return (
      <div className={styles.placesPage}>
        {}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {

  return {
    userLocation: selectUserLocation(state),
  };
};

function mapDispatchToProps(dispatch, ownProps) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlacesPage);
