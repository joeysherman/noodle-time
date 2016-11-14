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
  let name = props.place.get('name');
  let display_phone = props.place.get('display_phone');
  let distance = props.place.get('distance').toString();
  let avatar_url = props.place.get('image_url');
  let rating_url = props.place.get('rating_img_url_large');
  let address = props.place.getIn(['location', 'display_address']).join(' ');
  let review_count = props.place.get('review_count');

  let index = distance.indexOf('.');
  if (index != -1) {
    var trimmed_distance = distance.substring(0, index);
  }
  
  return (

      <Card>
        <CardHeader
          title={<h1>{name}</h1>}
          subtitle={<h3>{address}</h3>}
          avatar={<Avatar src={avatar_url} className={styles.cardAvatar}/>}
          className={styles.cardHeader}
          showExpandableButton={true}>
          
          <img src={rating_url} className={styles.cardRatingImg}/>
          <div className={styles.distanceWrapper}>
            <h3>{review_count}<span> Reviews</span></h3>
          </div>
        </CardHeader>


        <CardText
          children={<h3>{review_count}<span> Reviews</span></h3>}
          expandable={true}>
        </CardText>
        <CardActions className={styles.cardActions}>
          <FlatButton onClick={props.onClick} label="Show on Map" icon={<Explore/>} />
          <div className={styles.verticalSpacer}></div>
          <FlatButton label="Call" icon={<Call/>} />
        </CardActions>
      </Card>
    );
}

export default PlaceCard;
