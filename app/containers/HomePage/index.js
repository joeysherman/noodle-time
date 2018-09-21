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
import { connect } from 'react-redux';
import styles from './styles.css';
import { createStructuredSelector } from 'reselect';
import { push } from 'react-router-redux';

// Self-made components
import RamenButton from '../../components/RamenButton/ramenButton';
import CryEmojiSvg from '../../assets/cry_emoji.svg';

// Actions
import {
  noodleTime,
  autoCompleteRequest,
  autoCompleteItemSelected,
} from './actions';

import { userLocationRequest } from '../App/actions';

class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {

    return (
      <div className="section">
      <div className="row">
        <div className="col s12 center">
          <div className="section">
            <h1>Find Ramen Now.</h1>
          </div>
          <button onClick={() => this.props.push('/search')} className="btn waves-effect waves-light" name="action">Search near me</button>
        </div>
      </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      fetchLocation: () => dispatch(userLocationRequest()),
      push: (path) => dispatch(push(path)),
      dispatch,
    }
};



export default connect(false, mapDispatchToProps)(HomePage);
