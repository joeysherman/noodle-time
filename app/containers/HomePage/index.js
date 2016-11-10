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
import PlaceCard from '../../components/PlaceCard';
import { connect } from 'react-redux';

import {
  userLocationRequest,
  autoCompleteRequest,
  googleMapsLoadRequest,
  setDisplayMode,
} from './actions';

import {
  selectStatusMessage,
  selectLoading,
  selectError,
  selectDistances,
  selectPlaces,
  selectAutoCompleteData,
  selectDisplayMode,
} from './selectors';

class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    this.props.loadMaps();
  }

  autoCompleteNeededForLocation = () => {
    return this.props.error;
  };

  setDisplayMode = (mode) => {
    return this.props.setDisplayMode.bind(this, mode);
  };

  shouldShowMap = () => {
    let { displayMode } = this.props;

    return displayMode == 'Map';
  };

  shouldShowCard = () => {
    let { error, displayMode, places, distances } = this.props;
    let mode = displayMode == "Card";
    return (!error && places && mode);
  };

  render() {

    let main;

    let { statusMessage } = this.props;

    if (this.autoCompleteNeededForLocation()){
      main = ( <AutoComplete
        hintText="Search for your location"
        dataSource={this.props.autoCompleteDataSource || []}
        filter={AutoComplete.noFilter}
        openOnFocus={true}
        /*onUpdateInput={(input) => { this.props.dispatch(autoCompleteRequest(input)) }}*/
      /> )
    } else if (this.shouldShowCard()) {
      let place = this.props.places.get(0);

      main = (
        <div className={styles.place_card_wrapper}>
          <PlaceCard onClick={this.setDisplayMode('Map')} place={place}/>
        </div>
      )
    } else if (this.shouldShowMap()) {

      main = (
        <div>
          <h1>Map holder</h1>
        </div>
      )
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
    places: selectPlaces(state),
    displayMode: selectDisplayMode(state),
    autoCompleteDataSource: selectAutoCompleteData(state),
    statusMessage: selectStatusMessage(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    noodleTime: () => dispatch(userLocationRequest()),
    loadMaps: () => dispatch(googleMapsLoadRequest()),
    setDisplayMode: (mode) => dispatch(setDisplayMode(mode)),
    dispatch,
    }
};



export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
