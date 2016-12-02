/*
 *
 * AppBar
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectAppBar from './selectors';
import styles from './styles.css';

import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Toggle from 'material-ui/Toggle';
import Divider from 'material-ui/Divider';

import MyLocation from 'material-ui/svg-icons/maps/my-location';
import LocationOff from 'material-ui/svg-icons/communication/location-on';
import LocationOn from 'material-ui/svg-icons/communication/location-off';

export class App_Bar extends React.Component { // eslint-disable-line react/prefer-stateless-function

  handleTitleClick = (event) => {
    console.log(event);

  };

  componentDidMount () {
    if ('geolocation' in navigator){
      // has nav
    } else {
      // no nav
    }
  };

  renderIconMenu = () => {

    return (
      <IconMenu
        useLayerForClickAway={true}
        iconButtonElement={<IconButton><MyLocation/></IconButton>}
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

export default connect()(App_Bar);
