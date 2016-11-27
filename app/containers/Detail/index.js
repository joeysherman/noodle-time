/*
 *
 * Detail
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { selectIndex } from './selectors';
import styles from './styles.css';

export class Detail extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.detail}>
        DetailPage!
      </div>
    );
  }
}

const mapStateToProps = (state) => {

  return {
    index: selectIndex(state),
  }
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
