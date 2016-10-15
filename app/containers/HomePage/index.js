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

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import RamenButton from '../../components/RamenButton/ramenButton';
import styles from './styles.css';
import Paper from 'material-ui/Paper';
import AutoComplete from 'material-ui/AutoComplete';
import { connect } from 'react-redux';

import {

  userLocationRequest,
  autoCompleteRequest,

} from './actions';

import {
  USER_LOCATION_REQUEST
} from './constants';

import {

  selectLoading,
  selectError,
  selectUserLocation,
  selectAutoCompleteData,

} from './selectors';

class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function



  autoCompleteNeededForLocation = () => {
    return this.props.error;
  };

  noodleTimeClickHandler = () => {
    if (this.props.userLocation) return null;

    return this.props.noodleTime;
  };

  determineHeaderMessage = () => {
    let { userLocation, error, loading, autoCompleteDataSource } = this.props;
    if (userLocation) {

    }
  };

  render() {

    var main;

    if (this.autoCompleteNeededForLocation()){
      main = ( <AutoComplete
        hintText="Search for your location"
        dataSource={this.props.autoCompleteDataSource || ['hi','hello','San Diego']}
        filter={AutoComplete.noFilter}
        openOnFocus={true}
        /*onUpdateInput={(input) => { this.props.dispatch(autoCompleteRequest(input)) }}*/
      /> )
    } else {
      main = (
        <div className={styles.ramen_wrapper}>
          <RamenButton onClick={this.noodleTimeClickHandler()}></RamenButton>
        </div> )
    }

    return (
      <div className={styles.wrapper}>
        {main}
      </div>
    );
  }
}

const mapStateToProps = (state) => {

  return {
    error: selectError(state),
    loading: selectLoading(state),
    autoCompleteDataSource: selectAutoCompleteData(state),
    userLocation: selectUserLocation(state),

  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    noodleTime: () => {
      let action = userLocationRequest();
      dispatch(action);
    },
    dispatch,
    }
};



export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
