import React, {Component, PropTypes} from 'react';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import styles from './styles.css';


let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
  return class SelectableList extends Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
      defaultValue: PropTypes.number.isRequired,
    };

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
      });
    }

    handleRequestChange = (event, index) => {
      console.log(index);
      this.setState({
        selectedIndex: index,
      });
    };

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
          className={this.props.className}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

SelectableList = wrapState(SelectableList);

const renderListItem = (props, index, onTouchTap) => {
  let style = index > 1 ? { marginTop: '10px' } : {};
  return (
    <ListItem
      key={index}
      value={index}
      primaryText={props.name}
      leftAvatar={<Avatar src={props.image_url}/>}
      rightAvatar={<img src={props.rating_img_url}/>}
      className={styles.listItem}
      style={style}
      onTouchTap={() => {onTouchTap(index-1)}}
    />
  );
};

const ListExampleSelectable = (props) => {
  let { onTouchTap } = props;
  return (
    <Paper className={styles.listWrapper}>
      <SelectableList defaultValue={1} className={styles.list}>
        {props.places.map((item, i) => {
          return renderListItem(item, i+1, onTouchTap);
        })}
      </SelectableList>
    </Paper>
  );
}

export default ListExampleSelectable;
