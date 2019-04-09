import React, { Component } from 'react'
import axios from 'axios'
import { debounce } from 'throttle-debounce'
import Autosuggest from 'react-autosuggest'
import Brewery from '../components/Brewery';
import { Button, Collapse } from 'reactstrap';
import { connect } from 'react-redux';
import { actions } from '../store';

const API_SERVER_HOST = process.env.REACT_APP_API_SERVER_HOST || "https://api.openbrewerydb.org"

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
  <div className="text-lg mb-2 rounded">
    { suggestion.name }<br />
    { suggestion.city !== '' || suggestion.state !== '' ? <span>{suggestion.city}, {suggestion.state} </span> : '' }<br />
  </div>
);

class BrewerySearch extends Component {
  constructor() {
    super();

    this.debouncedGetSuggestions = debounce(500, this.getSuggestions)
    this.toggle = this.toggle.bind(this);

    this.state = {
      value: '',
      brewery: {},
      suggestions: []
    }
  }

  getSuggestions = value => {
    const params = { query: value }

    axios.get(`${API_SERVER_HOST}/breweries/search`, { params: params })
      .then(res => {
        this.setState({ suggestions: res.data })
      })
      .catch(error => {
        this.setState({ suggestions: [] })
      })
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.debouncedGetSuggestions(value)
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected = (_event, { suggestion }) => {
    const brewery = suggestion

    axios.get(`${API_SERVER_HOST}/breweries/${brewery.id}`)
      .then(res => {
        this.setState({ brewery: res.data }, 
            () => {
                this.props.onSetFocusedBrewery(res.data);
            })
      })
      .catch(error => {})
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }


  render() {
    const { brewery, suggestions, value } = this.state

    const inputProps = {
      placeholder: 'Search by city, state or brewery name',
      value,
      onChange: this.onChange,
      className: 'appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline mb-4'
    };

    return (
      <div>
      <div className='row'>
        <div className='column'>
          <Button size='lg' color="primary" onClick={this.toggle}>Search</Button>
        </div>
      </div>
        <div className="mb-4 searchBox">
          <Collapse
            isOpen={this.state.collapse}
          >
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            onSuggestionSelected={this.onSuggestionSelected}
          />
        <Brewery brewery={brewery} />
        </Collapse>
        </div>
      </div>
    )
  }
}


function mapStateToProps(state){
    return {
        brewery: state.brewery
    };
  }
  
  function mapDispatchToProps(dispatch){
    return {
        onSetFocusedBrewery(brewery){
            dispatch(actions.setFocusedBrewery(brewery));
        }
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(BrewerySearch);
