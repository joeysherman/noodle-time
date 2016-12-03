/*
 *
 * List
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { selectPlaces } from '../PlacesPage/selectors';
import styles from './styles.css';

import SelectableList from '../../components/List';

export class List extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    console.log('list will mount')
  }

  componentDidMount() {
    console.log('list mounted')
  }

  componentWillReceiveProps() {
    console.log('List will rec. props')
  }

  render() {
    let main = (
      <h1>No places!</h1>
    );
    if (this.props.places){
      main = <SelectableList places={this.props.places.toJS()}/>
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
    places: selectPlaces(state),
  }
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
