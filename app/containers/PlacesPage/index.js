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
import { userLocationRequest } from '../HomePage/actions';
// Material-ui imports
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ViewMap from 'material-ui/svg-icons/maps/map';
import ViewList from 'material-ui/svg-icons/action/view-list';
import CircularProgress from 'material-ui/CircularProgress';

import {
  selectUserLocation,
} from '../HomePage/selectors';

export class PlacesPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    console.log('places mounted')
  }

  componentWillReceiveProps(nextProps) {
    console.log('places will rec. props')
    console.log(nextProps)
  }

  componentWillMount() {
    if (!this.locationValid()) {
      console.log('fetching location will mount')
      this.props.dispatch(userLocationRequest());
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
    let { children } = this.props;

    if (children && this.locationValid()) {
      return React.Children.toArray(this.props.children);
    } else {
      return (
        <div className={styles.loadingWrapper}>
          <CircularProgress className={styles.loadingIcon}/>
        </div>
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
    let mainContent = this.renderMainContent(),
        actionButton = [];this.renderActionButton();

    return (
      <div className={styles.placesPage}>
        {actionButton}
        {mainContent}
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
