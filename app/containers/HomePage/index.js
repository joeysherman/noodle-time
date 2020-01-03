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
import { Link } from 'react-router-dom';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectExample from './selectors';
import reducer from './reducer';
import styles from './styles.css';
import saga from './saga';
import messages from './messages';

import { userLocationRequest } from '../App/actions';

import { selectHasGeo, selectLoadingGeo } from '../App/selectors';
export function HomePage(props) {
  // eslint-disable-line react/prefer-stateless-function
  useInjectReducer({ key: 'home', reducer });
  useInjectSaga({ key: 'home', saga });
  
  return (
    <div className="container mx-auto">
      <div className="w-full text-center">
        <div className="p-24">
          <h1 className="text-3xl">Find ramen near you</h1>
        </div>
      </div>
      <div className="flex justify-center">
      <div className="w-full max-w-sm rounded overflow-hidden shadow-lg bg-gray-100">
        <div className="px-6 py-4 text-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={props.fetchLocation}>Locate me</button>
          <p className="text-gray-600 text-base p-3">
            - or - 
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}

HomePage.PropTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  loadingGeo: selectLoadingGeo(state),
  hasGeo: selectHasGeo(state),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchLocation: () => dispatch(userLocationRequest()),
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
