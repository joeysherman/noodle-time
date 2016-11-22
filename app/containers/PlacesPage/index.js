/*
 *
 * PlacesPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { selectPlaces } from './selectors';
import styles from './styles.css';
import { placesRequest } from './actions';

import CircularProgress from 'material-ui/CircularProgress';

export class PlacesPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    if (this.locationValid()) {
      this.props.dispatch(placesRequest({
        lat: this.props.lat,
        lng: this.props.lng,
      }));
    }
  }

  locationValid = () => {
    let lat = parseInt(this.props.lat),
        lng = parseInt(this.props.lng);

    if (!(Number.isInteger(lat) && Number.isInteger(lng)))
      return false;

    return (lat < 90 && lat > -90 && lng < 180 && lng > -180);
  };


  render() {

    return (
      <div className={styles.placesPage}>
        {this.props.places ? 'Places Found!' : <div className={styles.loadingWrapper}><CircularProgress/></div>}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {

  return {
    lat: ownProps.location.query.lat,
    lng: ownProps.location.query.lng,
    places: selectPlaces(state),
  };
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlacesPage);
