/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import styles from './styles.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Footer from '../Footer';
import ramenImage from '../../assets/ramen-noodles-min.jpg';

export default class App extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return (
      <MuiThemeProvider>
          <div className={styles.container} style={{ background: 'url(' + ramenImage + ') no-repeat center/cover' }}>
          <AppBar
            title={<span>Noodle Time</span>}
            showMenuIconButton={false}/>
            {React.Children.toArray(this.props.children)}
          <Footer/>
        </div>
      </MuiThemeProvider>
    );
  }
}
