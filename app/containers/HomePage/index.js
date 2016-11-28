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

// Self-made components
import RamenButton from '../../components/RamenButton/ramenButton';

// Actions
import {
  userLocationRequest,
  autoCompleteRequest,
  autoCompleteItemSelected,
} from './actions';

// Selectors
import {
  selectStatusMessage,
  selectUserLocation,
  selectAutoCompleteData,
  selectLoading,
  selectError,
} from './selectors';

class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  shouldRenderAutoComplete = () => {
    let {error} = this.props.userLocation;

    return error;
  };

  render() {

    let main;

    let { statusMessage } = this.props;

    if (this.shouldRenderAutoComplete()) {
      main = (
        <Paper className={styles.autoCompleteWrapper}>
          <AutoComplete
            floatingLabelText='Search for your location e.g. San Diego'
            dataSourceConfig={{
              text: 'text',
              value: 'place_id',
            }}
            dataSource={this.props.autoCompleteDataSource || []}
            filter={AutoComplete.noFilter}
            openOnFocus={true}
            fullWidth={true}
            onUpdateInput={(input) => {
              if (input == '') return;
              this.props.dispatch(autoCompleteRequest(input))
            }}
            onNewRequest={(text, index) => {
              let { place_id } = text;
              // handle case when index is -1 - user hits enter
              if (index == -1) return;
              this.props.dispatch(autoCompleteItemSelected(place_id))
            }}
          />
        </Paper> );
    } else {
      main = (
        <div className={styles.ramen_wrapper}>
          <RamenButton onClick={this.props.noodleTime}></RamenButton>
          <h1 className={styles.ramen_message}>{statusMessage}</h1>
        </div> );
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
