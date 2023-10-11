import { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { makeQueryStr } from '../../utils/input';
import { DEFAULT_INPUT } from '../../constants/misc';

class SearchBar extends Component {
  state = {
    input: DEFAULT_INPUT,
  };

  resetInput = () => {
    this.inputDOM.blur();
    this.setState({ input: DEFAULT_INPUT });
  };

  handleChange = e => {
    const text = e.target.value.toUpperCase();
    this.setState({ input: text });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { input } = this.state;
    const { searchPlace } = this.props;
    const queryStr = makeQueryStr(input);
    // if (!queryStr) return showInfo(VALIDATE_ERROR);
    searchPlace(queryStr);
    this.resetInput();
  };

  render() {
    const { input } = this.state;
    const { isSearching } = this.props;

    return (
      <div className="w-90 center tc " style={{ marginTop: 50 }}>
        <form onSubmit={this.handleSubmit}>
          <input
            ref={inputDOM => {
              this.inputDOM = inputDOM;
            }}
            disabled={isSearching ? true : false}
            className={'input-color input-reset outline-none ba b--gray ma2 pa2 tc i br4 f6'}
            type="search"
            value={input}
            onChange={this.handleChange}
            placeholder="CITY, STATE"
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isSearching: state.isSearching,
});

const mapDispatchToProps = dispatch => ({
  searchPlace: input => dispatch(actions.searchPlace(input)),
});

const _Search = connect(mapStateToProps, mapDispatchToProps)(SearchBar);
export default _Search;
