/*
 *
 * AppBar
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import styles from './styles.css';

import {
  selectLocation,
  selectHasGeo,
  selectAddress,
  selectLoading,
} from '../App/selectors';

import { userHasGeo } from '../App/actions';

import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';

import MyLocation from 'material-ui/svg-icons/maps/my-location';
import GpsOffIcon from 'material-ui/svg-icons/device/gps-off';
import GpsFixedIcon from 'material-ui/svg-icons/device/gps-fixed';
import GpsNotFixedIcon from 'material-ui/svg-icons/device/gps-not-fixed';
import HelpIcon from 'material-ui/svg-icons/action/help';
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

    let { hasGeo, loading, address} = this.props;
    let icon = '',
        gpsText = '',
        locationText = 'Searching...';

    if (!loading && address){
      locationText = address;
    }

    hasGeo ? icon = <LocationOn/> : icon = <LocationOff/>;
    gpsText = hasGeo ? 'GPS on' : 'GPS unavailable';



    return (
      <IconMenu
        useLayerForClickAway={true}
        iconButtonElement={<IconButton>{icon}</IconButton>}
        anchorOrigin={{horizontal: 'middle', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        className={styles.menu}
      >
        <MenuItem
          primaryText={locationText}
          leftIcon={icon}
        />
        <MenuItem
          primaryText={gpsText}
          leftIcon={ hasGeo ? <GpsFixedIcon color="#4CAF50"/> : <GpsOffIcon/> }
        />
        <Divider/>
        <MenuItem primaryText="Help" rightIcon={<HelpIcon/>}/>
      </IconMenu>
    )
  };

  render() {
    const menu = this.renderIconMenu();

    return (
      <AppBar
        className={styles.appbar}
        title='Noodle Time'
        onTitleTouchTap={() => { this.props.dispatch(push('/'))}}
        iconElementLeft={menu}
        iconStyleLeft={{ marginLeft: 0 }}
      />
    );
  }
}

const mapStateToProps = createStructuredSelector(

  {
    hasGeo : selectHasGeo(),
    loading: selectLoading(),
    userLocation: selectLocation(),
    address: selectAddress(),
  });

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App_Bar);
