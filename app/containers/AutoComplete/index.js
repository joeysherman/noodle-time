/*
 *
 * AutoComplete
 *
 */
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import reducer from './reducer';
import saga from './saga';

// Selectors
import selectAutoComplete, {
  selectPredictions,
  makeSelectSuggestions,
} from './selectors';

// Actions
import { autoCompleteRequest, autoCompleteItemSelected } from './actions';

// Injectors
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

class Autocomplete extends React.Component {
  static defaultProps = {
    suggestions: [],
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
      userInput: '',
    };
  }

  // Event fired when the input value is changed
  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;
    console.log('inside onChange');
    this.props.sendInputRequest(userInput);
    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = [];

    for (var i = 0, l = Math.min(suggestions.length, 3); i < l; i++) {
      filteredSuggestions.push(suggestions[i]);
    }

    // Update the user input and filtered suggestions, reset the active
    // suggestion and make sure the suggestions are shown
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value,
    });
  };

  // Event fired when the user clicks on a suggestion
  onClick = e => {
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
      userInput: selectedText,
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
        userInput: filteredSuggestions[activeSuggestion],
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
        userInput,
      },
    } = this;

    let suggestionsListComponent;

    if (filteredSuggestions.length) {
      suggestionsListComponent = (
        <ul className="absolute">
          {filteredSuggestions.map((suggestion, index) => {
            let className;
            let _suggestion = suggestion.description;
            let _key = suggestion.place_id;

            // Flag the active suggestion with a class
            if (index === activeSuggestion) {
              className =
                'bg-red-200 focus:outline-none focus:shadow-outline border border-gray-300 py-2 px-4 block w-full appearance-none leading-normal';
            } else {
              className =
                'bg-white hover:bg-gray-300 focus:outline-none focus:shadow-outline border border-gray-300 py-2 px-4 block w-full appearance-none leading-normal';
            }

            return (
              <li className={className} id={_key} key={_key} onClick={onClick}>
                {_suggestion}
              </li>
            );
          })}
        </ul>
      );
    } else if (userInput.length) {
      suggestionsListComponent = (
        <ul className="absolute mx-2 my-1">
          <li className="bg-red-200 focus:outline-none focus:shadow-outline border border-gray-300 py-2 px-4 block w-full appearance-none leading-normal">
            No suggestions, try turning on your GPS.
          </li>
        </ul>
      );
    }
    return (
      <div className="w-full relative">
        <input
          type="text"
          placeholder="New York"
          className="relative bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
          id="autocomplete-input"
        />
        {suggestionsListComponent}
        <span className="text-sm text-gray-500 block text-right">
          Powered by Google
        </span>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  suggestions: makeSelectSuggestions(),
});

const mapDispatchToProps = dispatch => {
  return {
    sendInputRequest: input => dispatch(autoCompleteRequest(input)),
    autoCompleteSelection: index => dispatch(autoCompleteItemSelected(index)),
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'autoComplete', reducer });

const withSaga = injectSaga({ key: 'autoComplete', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Autocomplete);
