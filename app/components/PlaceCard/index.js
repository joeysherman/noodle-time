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
  return (
      <Card>
        <CardHeader
          title={props.place.name}
          subtitle={props.place.formatted_address}
        />
        <CardActions>
          <FlatButton label="Expand" />
          <FlatButton label="Reduce" />
        </CardActions>
      </Card>
    );
}

export default PlaceCard;
