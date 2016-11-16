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

// Material UI components
import Paper from 'material-ui/Paper';
import AutoComplete from 'material-ui/AutoComplete';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import IconButton from 'material-ui/IconButton';
// Self-made components
import RamenButton from '../../components/RamenButton/ramenButton';
import Map from '../../containers/Map';
import PlaceCard from '../../components/PlaceCard';

// Actions
import {
  userLocationRequest,
  autoCompleteRequest,
  googleMapsLoadRequest,
  setDisplayMode,
  incrementSelectedIndex,
  decrementSelectedIndex,
} from './actions';

// Selectors
import {
  selectStatusMessage,
  selectLoading,
  selectError,
  selectDistances,
  selectPlaces,
  selectAutoCompleteData,
  selectDisplayMode,
  selectIndex,
} from './selectors';

class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    this.props.loadMaps();
  }

  autoCompleteNeededForLocation = () => {
    return this.props.displayMode == 'AutoComplete';
  };

  setDisplayMode = (mode) => {
    return this.props.setDisplayMode.bind(this, mode);
  };

  shouldShowMap = () => {
    let { displayMode } = this.props;

    return displayMode == 'Map';
  };

  handleClick = () => {
    console.log('Clicked');
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
      main = ( <Paper className={styles.autoCompleteWrapper}><AutoComplete
        className={styles.autoComplete}
        hintText="Search for your location"
        dataSource={this.props.autoCompleteDataSource || []}
        filter={AutoComplete.noFilter}
        openOnFocus={true}
        onUpdateInput={(input) => { this.props.dispatch(autoCompleteRequest(input))}}
        style={{ margin: 'auto'}}
      /></Paper> )
    } else if (this.shouldShowCard()) {
      let { selectedIndex } = this.props;
      let place = this.props.places.get(selectedIndex).toJS();

      main = (
        <div className={styles.place_card_wrapper}>
          <div className={styles.leftDecrement}>
            <IconButton onClick={this.props.decrementSelectedIndex}>
              <ChevronLeft />
            </IconButton>
          </div>
          <PlaceCard onClick={this.setDisplayMode('Map')} place={place}/>
          <div className={styles.rightIncrement}>
            <IconButton onClick={this.props.incrementSelectedIndex}>
              <ChevronRight />
            </IconButton>
          </div>
        </div>
      )
    } else if (this.shouldShowMap()) {

      main = (
        <Map></Map>
      )
    } else {
      main = (
        <div className={styles.ramen_wrapper}>
            <RamenButton onClick={this.props.noodleTime}></RamenButton>
            <h1 className={styles.ramen_message}>{statusMessage}</h1>
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
    selectedIndex: selectIndex(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    noodleTime: () => dispatch(userLocationRequest()),
    loadMaps: () => dispatch(googleMapsLoadRequest()),
    setDisplayMode: (mode) => dispatch(setDisplayMode(mode)),
    incrementSelectedIndex: () => dispatch(incrementSelectedIndex()),
    decrementSelectedIndex: () => dispatch(decrementSelectedIndex()),
    dispatch,
    }
};



export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
