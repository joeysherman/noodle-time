/**
 * Created by Joey on 9/22/2016.
 */

var React = require('react');
import ramenBowl from './ramen.svg';

class RamenButton extends React.Component {
  render(){
    return (
      <img src={ramenBowl}></img>
    )
  }
}

export default RamenButton;