/*
 *
 * Map
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectMap from './selectors';
import styles from './styles.css';

export class Map extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.map}>
      </div>
    );
  }
}

const mapStateToProps = selectMap();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
