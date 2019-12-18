/*
 *
 * AutoComplete
 *
 */

import React from "react";
import { connect } from "react-redux";
import selectAutoComplete, { selectPredictions } from "./selectors";

import { autoCompleteRequest,
autoCompleteItemSelected } from "./actions";
class Autocomplete extends React.Component {
  static defaultProps = {
    suggestions: []
  };

  constructor(props) {
    super(props);

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: ""
    };
  }

  // Event fired when the input value is changed
  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;
    console.log("inside onChange");
    this.props.sendInputRequest(userInput);
    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = [];

    for (var i=0, l = Math.min(suggestions.length, 3); i<l; i++) {
      filteredSuggestions.push(suggestions[i]);
    }

    // Update the user input and filtered suggestions, reset the active
    // suggestion and make sure the suggestions are shown
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  // Event fired when the user clicks on a suggestion
  onClick = (e) => {
    console.log(e.currentTarget);
    const place_id = e.currentTarget.id;
    const selectedText = e.currentTarget.innerText;
    console.log(place_id);
    // Update the user input and reset the rest of the state
    this.props.autoCompleteSelection(place_id);
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: selectedText
    });
  };

  // Event fired when the user presses a key down
  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key, update the input and close the
    // suggestions
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    const { suggestions } = this.props;

    let suggestionsListComponent;

    if (filteredSuggestions) {
      suggestionsListComponent = (
        <ul className="suggestions">
          {filteredSuggestions.map((suggestion, index) => {
            let className;
            let _suggestion = suggestion.description;
            let _key = suggestion.place_id;

            // Flag the active suggestion with a class
            if (index === activeSuggestion) {
              className = "suggestion-active";
            }

            return (
              <li className={className} id={_key} key={_key} onClick={onClick}>
                {_suggestion}
              </li>
            );
          })}
        </ul>
      );
    } else {
      suggestionsListComponent = (
        <div className="no-suggestions">
          <em>No suggestions, try turning on your GPS.</em>
        </div>
      );
    }

    return (
      <div className="input-field">
        <input
          type="text"
          placeholder="Search Here"
          className="autocomplete"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
          id="autocomplete-input"
        />
        {suggestionsListComponent}
        <span className="helper-text">Powered by Google</span>
      </div>
    );
  }
}

const makeMapStateToProps = () => {

  const predictions = selectPredictions();

  const mapStateToProps = (state, props) => {
    return {
     suggestions: predictions(state)
    }
  }
  return mapStateToProps;
};

const mapDispatchToProps = dispatch => {
  return {
    sendInputRequest: input => dispatch(autoCompleteRequest(input)),
    autoCompleteSelection: index => dispatch(autoCompleteItemSelected(index)),
    push: path => dispatch(push(path)),
    dispatch
  };
};

export default connect(makeMapStateToProps, mapDispatchToProps)(Autocomplete);
