/*
 *
 * AppBar
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import styles from './styles.css';
import {
  selectUserLocation,
  selectHasGeo,
} from '../HomePage/selectors';

import { userHasGeo } from '../HomePage/actions';

import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';

import MyLocation from 'material-ui/svg-icons/maps/my-location';
import LocationOn from 'material-ui/svg-icons/communication/location-on';
import LocationOff from 'material-ui/svg-icons/communication/location-off';

export class App_Bar extends React.Component { // eslint-disable-line react/prefer-stateless-function

  handleTitleClick = (event) => {
    console.log(event);

  };

  componentDidMount () {
    if ('geolocation' in navigator){
      this.props.dispatch(userHasGeo(true));
    } else {
      this.props.dispatch(userHasGeo(false));
    }
  };

  renderIconMenu = () => {

    let { hasGeo } = this.props,
        icon;

    hasGeo ? icon = <LocationOn/> : icon = <LocationOff/>;

    return (
      <IconMenu
        useLayerForClickAway={true}
        iconButtonElement={<IconButton>{icon}</IconButton>}
        anchorOrigin={{horizontal: 'middle', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
      >
        <MenuItem primaryText="My Location:"/>
        <MenuItem primaryText="Use GPS - " />
        <Divider/>
        <MenuItem primaryText="Help"/>
      </IconMenu>
    )
  };

  render() {
    const menu = this.renderIconMenu();

    return (
      <AppBar
        className={styles.appbar}
        title='Noodle Time'
        onTitleTouchTap={this.handleTitleClick.bind(this)}
        iconElementLeft={menu}
      />
    );
  }
}

const mapStateToProps = (state) => {

  return {
    userLocation: selectUserLocation(state),
    hasGeo : selectHasGeo(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    noodleTime: () => dispatch(userLocationRequest()),
    dispatch,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App_Bar);
