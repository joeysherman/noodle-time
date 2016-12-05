/*
 *
 * Footer
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectFooter from './selectors';
import styles from './styles.css';
import YelpImg from './yelp-2c-outline.png';

// Material-ui imports
import Paper from 'material-ui/Paper';


export class Footer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {

    return (
      <Paper zDepth={1} className={styles.footer}>

        <p className={styles.footerAbout}>Crafted in SD by <strong>Joey</strong></p>
        <span className={styles.poweredBy}>Powered by</span>
        <img className={styles.yelpImg} src={YelpImg}/>
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
