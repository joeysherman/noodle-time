/**
 *
 * Example2
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectExample2 from './selectors';
import reducer from './reducer';
import saga from './saga';

export function Example2() {
  useInjectReducer({ key: 'example2', reducer });
  useInjectSaga({ key: 'example2', saga });

  return (
    <div>
      <Helmet>
        <title>Example2</title>
        <meta name="description" content="Description of Example2" />
      </Helmet>
    </div>
  );
}

Example2.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  example2: makeSelectExample2(),
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

export default compose(withConnect)(Example2);
