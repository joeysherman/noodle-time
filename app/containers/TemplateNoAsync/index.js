/**
 *
 * TemplateNoAsync
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectReducer } from 'utils/injectReducer';
import makeSelectTemplateNoAsync from './selectors';
import reducer from './reducer';

export function TemplateNoAsync() {
  useInjectReducer({ key: 'templateNoAsync', reducer });

  return <div />;
}

TemplateNoAsync.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  templateNoAsync: makeSelectTemplateNoAsync(),
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

export default compose(withConnect)(TemplateNoAsync);
