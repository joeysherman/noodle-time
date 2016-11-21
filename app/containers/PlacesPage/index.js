/*
 *
 * PlacesPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectPlacesPage from './selectors';
import { selectPlaces } from './selectors';
import styles from './styles.css';
import { createStructuredSelector } from 'reselect';

import CircularProgress from 'material-ui/CircularProgress';

export class PlacesPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    console.log(this.props.places);

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
