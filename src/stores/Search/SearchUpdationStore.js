export default class SearchUpdationStore {
  constructor() {
    const searchUpdationActions = this.alt.getActions('searchUpdationActions');

    this.bindAction(searchUpdationActions.reset, this.onReset);
    this.bindAction(searchUpdationActions.fetchBefore, this.onFetchBefore);
    this.bindAction(searchUpdationActions.fetch, this.onFetch);
    this.bindAction(searchUpdationActions.updateName, this.onUpdateName);
    this.bindAction(searchUpdationActions.updateError, this.onUpdateError);
    this.bindAction(searchUpdationActions.updateSuccess, this.onUpdateSuccess);

    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      isFetching: false,
      isFetched: false,
      'id': '',
      'name': '',
      'errorMessage': '',
    };
  }

  onReset() {
    this.setState(this.getInitialState());
  }

  onFetchBefore() {
    this.setState({
      isFetching: true,
      isFetched: false,
    });
  }

  onFetch(search) {
    this.setState({
      isFetching: false,
      isFetched: true,
      ...search,
      errorMessage: '',
    });
  }

  onUpdateName(name) {
    this.setState({ name });
  }

  onUpdateError(errorMessage) {
    this.setState({ errorMessage });
  }

  onUpdateSuccess() {
    this.setState(this.getInitialState());
  }
}

export default SearchUpdationStore;
