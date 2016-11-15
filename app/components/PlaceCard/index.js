/**
*
* PlaceCard
*
*/

import React from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Call from 'material-ui/svg-icons/communication/call';
import Explore from 'material-ui/svg-icons/action/explore';
import Avatar from 'material-ui/Avatar';
import styles from './styles.css';

function PlaceCard(props) { // eslint-disable-line react/prefer-stateless-function
  let { name,
        display_phone,
        distance,
        image_url,
        rating_img_url_large,
        review_count } = props.place;

  let { display_address } = props.place.location;

  return (

      <Card>
        <CardHeader
          title={<h3>{name}</h3>}
          subtitle={<h3>{display_address.join(' ')}</h3>}
          avatar={<Avatar src={image_url} className={styles.cardAvatar}/>}
          className={styles.cardHeader}>
          
          <img src={rating_img_url_large} className={styles.cardRatingImg}/>
          <div className={styles.distanceWrapper}>
            <h3>{review_count}<span> Reviews</span></h3>
          </div>

        </CardHeader>

        <CardActions className={styles.cardActions}>
          <FlatButton onClick={props.onClick} label="Show on Map" icon={<Explore/>} />
          <div className={styles.verticalSpacer}></div>
          <FlatButton label="Call" icon={<Call/>} />
        </CardActions>
      </Card>
    );
}

export default PlaceCard;
