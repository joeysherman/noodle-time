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
import Paper from 'material-ui/Paper';
import AutoComplete from 'material-ui/AutoComplete';
import { connect } from 'react-redux';

import {

  userLocationRequest,
  autoCompleteRequest,

} from './actions';

import {

  selectLoading,
  selectError,
  selectUserLocation,
  selectAutoCompleteData,

} from './selectors';

class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {

    var main;

    if (this.props.error){
      main = ( <AutoComplete
        hintText="Type anything"
        dataSource={this.props.autoCompleteDataSource || []}
        onUpdateInput={(input) => { this.props.dispatch(autoCompleteRequest(input)) }}
      /> )
    } else {
      main = (
        <div>
          <RamenButton onClick={() => {this.props.dispatch(userLocationRequest())}} style={{ margin: 'auto'}}></RamenButton>
        <h1 style={{ margin: 'auto'}}>Lets find ramen!</h1>
        </div> )
    }

    return (
      <div>
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
    dispatch
  }
};



export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
