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
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import styles from './styles.css';

// Injectors 
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

// Components
import AutoCompleteContainer from '../AutoComplete';
import LoadingSpinner from '../../components/LoadingSpinner';

// Images
import ramenImage from '../../assets/ramen-noodles-min.jpg';

// Actions
import { userLocationRequest } from '../App/actions';

// Selectors
import { selectHasGeo, selectLoadingGeo } from '../App/selectors';
export function HomePage({loadingGeo, hasGeo, fetchLocation }) {
  // eslint-disable-line react/prefer-stateless-function
  useInjectReducer({ key: 'home', reducer });
  useInjectSaga({ key: 'home', saga });

  return (
    <div className="mx-auto overflow-hidden" style={{
      backgroundImage: 'url(' + ramenImage +')',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
    }}>
      <div className="w-full">
        <div className="p-6 md:p-24">
          <h1 className="text-3xl left-align">Find ramen near you</h1>
        </div>
      </div>
      <div className={ "flex justify-center pb-16 " + styles.slideIn}>
      <div className="max-w-sm md:max-w-md w-1/3 rounded shadow-lg bg-gray-100">
        <div className="px-6 py-4 text-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={fetchLocation}>{ loadingGeo ? <LoadingSpinner/> : "Locate me" }</button>
          <p className="text-gray-600 text-base p-3">
            - or - 
          </p>
          <AutoCompleteContainer/>
        </div>
      </div>
      </div>
    </div>
  );
}

HomePage.PropTypes = {
  loadingGeo: PropTypes.bool.isRequired,
  hasGeo: PropTypes.bool.isRequired,
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
