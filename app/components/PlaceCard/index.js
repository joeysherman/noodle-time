/**
*
* PlaceCard
*
*/

import React from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import styles from './styles.css';

function PlaceCard(props) { // eslint-disable-line react/prefer-stateless-function
  let name = props.place.get('name');
  let display_phone = props.place.get('display_phone');
  let distance = props.place.get('distance');
  
  return (

      <Card>
        <CardHeader
          title={name}
          subtitle={display_phone}
        />
        <CardActions>
          <FlatButton label="Show on Map" />
          <FlatButton label="More Details" />
          <div className={styles.distance_wrapper}>
            <h3>{distance} away</h3>
          </div>
        </CardActions>
      </Card>
    );
}

export default PlaceCard;
