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

export class Footer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {

    return (
      <Paper zDepth={1} className={styles.footer}>

          <p className={styles.footerAbout}>Crafted in SD by <strong>Joey</strong></p>
          
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
