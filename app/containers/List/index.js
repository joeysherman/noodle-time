/*
 *
 * List
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectList from './selectors';
import styles from './styles.css';

export class List extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.list}>
        List container!
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    list: selectList(state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
