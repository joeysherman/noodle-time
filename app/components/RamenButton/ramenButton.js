/**
 * Created by Joey on 9/22/2016.
 */

var React = require('react');
import { findDOMNode } from 'react-dom';
import ramenBowl from './ramen.svg';

class RamenButton extends React.Component {

  componentWillAppear (callback) {
    var el = findDOMNode(this);
    if (window.TweenMax) {
      console.log('animating el...')
      window.TweenMax.to(el, 1, {
        scale: 2,
        opacity: 0,
        onComplete: callback,
      });

    }
    console.log('will appear')
  }

  componentWillEnter (callback){
    console.log('will enter');
    callback();
  };

  componentWillLeave (callback){
    console.log('will leave')
    callback();
  }

  render() {
    return (
      <img onClick={this.props.onClick} style={this.props.style} src={ramenBowl} className={this.props.className}></img>
    )
  }
}
export default RamenButton;