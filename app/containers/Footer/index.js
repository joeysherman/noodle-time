/*
 *
 * Footer
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectFooter from './selectors';
import styles from './styles.css';

import Paper from 'material-ui/Paper';
import { BottomNavigationItem, BottomNavigation } from 'material-ui/BottomNavigation';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

export class Footer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Paper zDepth={1}>
        <BottomNavigation selectedIndex={0}>
          <BottomNavigationItem
            label="Nearby"
            icon={<IconLocationOn/>}
          />
        </BottomNavigation>
      </Paper>
    );
  }
}

const mapStateToProps = selectFooter();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default Footer;
