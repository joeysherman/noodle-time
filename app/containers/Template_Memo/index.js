/**
 *
 * Example
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectExample from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function Example() {
  useInjectReducer({ key: 'home', reducer });
  useInjectSaga({ key: 'home', saga });

  return (
    <div>
      <h1>Bakerman</h1>
    </div>
  );
}

Example.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  example: makeSelectExample(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Example);
