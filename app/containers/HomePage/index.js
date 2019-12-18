/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

// Library dependencies
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
import styles from './styles.css';
import saga from './saga';
import messages from './messages';

import { selectHasGeo, selectLoadingGeo } from '../App/selectors';
export function HomePage() {
  // eslint-disable-line react/prefer-stateless-function
  useInjectReducer({ key: 'home', reducer });
  useInjectSaga({ key: 'home', saga });

  return (
    <div className="flex">
      
    </div>
  );
}

HomePage.PropTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loadingGeo: selectLoadingGeo(),
  hasGeo: selectHasGeo(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchLocation: () => dispatch(userLocationRequest()),
    push: path => dispatch(push(path)),
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
)(HomePage);
