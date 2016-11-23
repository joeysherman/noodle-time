/*
 *
 * PlacesPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { selectPlaces } from './selectors';
import { push } from 'react-router-redux';
import styles from './styles.css';
import { placesRequest } from './actions';
import PlaceCard from '../../components/PlaceCard';
import List from '../../components/List';

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

  getMainContent = () => {
    switch (this.props.mode) {
      case 'list' :
        return (
          <List places={this.props.places.toJS()}/>
        );
      default :
        return (
          <div className={styles.ramenWrapper}><PlaceCard place={this.props.places.get(this.props.index).toJS()}/></div>
        )
    }
  };

  render() {

    return (
      <div className={styles.placesPage}>
        {this.props.places ? this.getMainContent.call(this) : <div className={styles.loadingWrapper}><CircularProgress/></div>}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {

  return {
    lat: ownProps.location.query.lat,
    lng: ownProps.location.query.lng,
    index: ownProps.location.query.i || 0,
    places: selectPlaces(state),
    mode: ownProps.location.query.mode,
  };
};

function mapDispatchToProps(dispatch, ownProps) {
  return {
    extendQuery: (query) => {
      dispatch(push(Object.assign(ownProps.location.query, query)));
    },
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlacesPage);
