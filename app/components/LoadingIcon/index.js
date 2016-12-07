/**
*
* LoadingIcon
*
*/

import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

import styles from './styles.css';

function LoadingIcon(props) {
  let { status } = props;

  return (
    <div className={styles.loadingIcon}>
      <CircularProgress/>
      {status ? <h1>{status}</h1> : null}
    </div>
  );
}

export default LoadingIcon;
