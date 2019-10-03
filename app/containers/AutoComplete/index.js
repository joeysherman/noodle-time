/*
 *
 * AutoComplete
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectAutoComplete from './selectors';

export class AutoComplete extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <h1>Balls</h1>
      </div>
    );
  }
}

const mapStateToProps = selectAutoComplete();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AutoComplete);
