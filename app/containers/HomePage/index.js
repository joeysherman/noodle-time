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
  selectStatusMessage,
  selectLoading,
  selectError,
  selectUserLocation,
  selectAutoCompleteData,
} from './selectors';

class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function


  autoCompleteNeededForLocation = () => {
    return this.props.error;
  };

  render() {

    let main;
    let { userLocation, places } = this.props;
    let { statusMessage } = this.props;

    if (this.autoCompleteNeededForLocation()){
      main = ( <AutoComplete
        hintText="Search for your location"
        dataSource={this.props.autoCompleteDataSource || []}
        filter={AutoComplete.noFilter}
        openOnFocus={true}
        /*onUpdateInput={(input) => { this.props.dispatch(autoCompleteRequest(input)) }}*/
      /> )
    } else {
      main = (
        <div className={styles.ramen_wrapper}>
            <Paper zDepth={5} className={styles.ramen_paper}>
              <RamenButton onClick={this.props.noodleTime}></RamenButton>
              <h1 className={styles.ramen_message}>{statusMessage}</h1>
            </Paper>
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
    statusMessage: selectStatusMessage(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    noodleTime: () => dispatch(userLocationRequest()),
    dispatch,
    }
};



export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
