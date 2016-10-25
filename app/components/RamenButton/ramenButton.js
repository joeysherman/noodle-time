/**
 * Created by Joey on 9/22/2016.
 */

var React = require('react');
import ramenBowl from './ramen.svg';

const RamenButton = function(props) {
  return (
    <img onClick={props.onClick} style={props.style} src={ramenBowl} className={props.className}></img>
  )
}
export default RamenButton;