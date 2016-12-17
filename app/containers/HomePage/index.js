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

// Material UI components
import Paper from 'material-ui/Paper';
import AutoComplete from 'material-ui/AutoComplete';

// Self-made components
import RamenButton from '../../components/RamenButton/ramenButton';
import CryEmojiSvg from '../../assets/cry_emoji.svg';

// Actions
import {
  noodleTime,
  autoCompleteRequest,
  autoCompleteItemSelected,
  setStatusMessage,
} from './actions';

import { userLocationRequest } from '../App/actions';

// Selectors
import{
  selectStatusMessage,
  selectAutoCompleteData,
  selectNoodleTime,
} from './selectors';


class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.fetchLocation();
  }
  
  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.noodleTime == true && !this.props.noodleTime) {
      this.props.push('/search');
    }
  }

  componentWillUnmount() {
    this.props.itsNoodleTime();
    this.props.setStatus('Click to begin!');
  }

  shouldRenderAutoComplete = () => {
    let { state } = this.props.location;

    return state && state.mode === 'autocomplete';
  };

  render() {

    let main;

    let { statusMessage } = this.props;

    if (this.shouldRenderAutoComplete()) {
      let { autoCompleteDataSource } = this.props;
      main = (
        <Paper className={styles.autoCompleteWrapper}>
          <img className={styles.cryEmojiImage} src={CryEmojiSvg}/>
          <h3 className={styles.autoCompleteHeader}>Couldn't find your location... Where are you?</h3>
          <AutoComplete
            floatingLabelText='Search for your location..'
            filter={AutoComplete.fuzzyFilter}
            dataSourceConfig={{ text: 'description', value: 'place_id',}}
            dataSource={autoCompleteDataSource || []}
            openOnFocus={true}
            fullWidth={true}
            onUpdateInput={(input) => {
              if (input == '') return;
              this.props.dispatch(autoCompleteRequest(input))
            }}
            onNewRequest={(text, index) => {
              // handle case when index is -1 - user hits enter
              if (index == -1) return;
              
              this.props.dispatch(autoCompleteItemSelected(text));
            }}
          />
        </Paper> );
    } else {
      main = (
        <Paper
          onTouchTap={this.props.itsNoodleTime}
          className={styles.ramenWrapper}
          zDepth={3}>
          <RamenButton />
          <h2 className={styles.ramen_message}>{statusMessage}</h2>
        </Paper> );
    }

    return (
      <div className={styles.wrapper}>
        {main}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  statusMessage: selectStatusMessage(),
  noodleTime: selectNoodleTime(),
  autoCompleteDataSource: selectAutoCompleteData(),
});

const mapDispatchToProps = (dispatch) => {
  return {
    itsNoodleTime: () => dispatch(noodleTime()),
    fetchLocation: () => dispatch(userLocationRequest()),
    setStatus: (status) => dispatch(setStatusMessage(status)),
    push: (path) => dispatch(push(path)),
    dispatch,
    }
};



export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
