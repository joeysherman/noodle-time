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
} from './actions';

// Selectors
import {
  selectStatusMessage,
  selectLoading,
  selectError,
} from './selectors';

class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {

    let main;

    let { statusMessage } = this.props;

    main = (
      <div className={styles.ramen_wrapper}>
          <RamenButton onClick={this.props.noodleTime}></RamenButton>
          <h1 className={styles.ramen_message}>{statusMessage}</h1>
      </div> );

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
