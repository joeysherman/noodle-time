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
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

// Injectors

// Components
import AutoCompleteContainer from '../AutoComplete';
import LoadingSpinner from '../../components/LoadingSpinner';

// Images
import ramenImage from '../../assets/ramen-noodles-min.jpg';

// Actions
import { userLocationRequest } from '../App/actions';

// Selectors
import { selectHasGeo, selectLoadingGeo, selectError } from '../App/selectors';
export function HomePage({ loadingGeo, hasGeo, fetchLocation, error }) {
  // eslint-disable-line react/prefer-stateless-function
  useInjectReducer({ key: 'home', reducer });
  useInjectSaga({ key: 'home', saga });

  return (
    <div
      className="relative h-screen w-full overflow-hidden"
      style={{
        backgroundImage: `url(${ramenImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        marginTop: '-72px',
        paddingTop: '72px',
      }}
    >
      <div
        style={{ backgroundColor: 'rgba(45, 55, 72, 0.3)' }}
        className="absolute h-full w-full top-0 bottom-0 left-0 right-0"
      />
      <div className="w-full relative z-10">
        <div className="p-6 md:p-24">
          <h1 className="text-5xl left-align">
            Find ramen
            <span className="text-gray-200 relative"> near you.</span>
          </h1>
        </div>
      </div>
      <div className="flex relative justify-center p-4 md:pb-16 z-10">
        <div className="max-w-sm md:max-w-md w-full rounded shadow-lg bg-gray-100">
          <div className="flex flex-col items-center px-6 py-4 relative">
            {loadingGeo ? (
              <LoadingSpinner className="w-20" />
            ) : (
              <button
                className="bg-red-500 text-white font-bold py-2 pl-4 pr-2 rounded"
                onClick={fetchLocation}
              >
                Locate me
                <img
                  className="inline-block w-6 h-6"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAACXklEQVRIie2Wu2sUQRzHP2dhEjvF+Lq9QqM26YP/ghhTSlohgppLwCcWCnbWVuLjXwjiK9FGUQvPSlFBDCiIEa3CXXwEcznXYr7Lzs3Nzu2GXOcXhp39/h7fndnfPGD90QdMAzXgp1oNmJKtJygDr4E4o72Sz7qir4uoLV5o5BWgCswB7zFT+Bs4Kvt0DtGkVfMIloGbwGpGkmH5vXT4+4qNgFnH9qKb6BiwJOc/wF/13wBDwH5go3x/OMkjK0/FsS2FRKeAlhxngAn168Auj/9iAeHF0EhbGuEpcY8UdDEjpuYkn5V4BVMXtq3mS1Amnd7T4rZg/vEqMJghPOkkD7VJX4JbMt6xuHFxjzNEIf9yegcMuMEVsqs31I4rfghYCPgtyKcD1TWIxsAvYEQ59gDzHp952bxI1tu4w3+gfc36EAEH1B/E7FD2bpVVG20C7pd9F+9bRgl2YkZ+UO/DlnDog4G0mjc5/LL4jqKw0C+fZYt7DjxTf3OvhAc8wjZO2C8bHOM3PXc4fEPP0FcntobD9wMXgJMh4Y96jjh8EeG6w48BV4DPgdhCu89a17oXEdDsgWiTHDePG3KeA0riki3zSSDuqXyOWNw9cde6iYJZq0l1nxVnHxLbPDHbZWuS/uvzylGns1gzcZj0WDwj7qESXfL4XyY9CkvAOcW2gEN5RRNUSS8Ct4Fj6jdo38Ei0hmawJxqsWK9x18ejEooBlZIrz5vgb3APswxF8u2Qjq9hUfqYitwlXzV3gSuY/btIErdHCyUMZvBKLAbc3YDfAE+AQ+Au8DXAjn/o/f4B6+MPYaVc7Q8AAAAAElFTkSuQmCC"
                />
              </button>
            )}
            {error && (
              <p className="py-2">{`Location is ${error} at this time.`}</p>
            )}
            <p className="text-gray-600 text-base p-3">- or -</p>
            <AutoCompleteContainer />
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

const mapStateToProps = state => ({
  loadingGeo: selectLoadingGeo(state),
  hasGeo: selectHasGeo(state),
  error: selectError(state),
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

export default compose(withConnect)(HomePage);
