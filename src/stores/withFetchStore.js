import mixin from '../core/mixin.js';

export default mixin({
  reset() {
    this.onReset();
  },

  fetchBefore() {
    this.onFetchBefore();
  },

  fetch(...args) {
    this.fetchBefore();
    return this.alt.getActions(this.fetchActionsName).fetch(...args);
  },

  onReset() {
    this.setState(this.getInitialState());
  },

  onFetchBefore() {
    this.setState({
      isFetching: true,
      isFetched: false,
      fetchErrorMessage: '',
    });
  },

  onFetchError(errorMessage) {
    this.setState({
      isFetching: false,
      isFetched: true,
      fetchErrorMessage: errorMessage,
    });
  },
});
