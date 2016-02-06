export default class SearchesStore {
  constructor() {
    this.exportPublicMethods({
      setState: this.setState,
      getInitialState: this.getInitialState,
      reset: this.reset,
      fetchBefore: this.fetchBefore,
      fetch: this.fetch,
      onReset: this.onReset,
      onFetchBefore: this.onFetchBefore,
    });

    const searchesActions = this.alt.getActions('searchesActions');
    const searchCreationActions = this.alt.getActions('searchCreationActions');
    const searchUpdationActions = this.alt.getActions('searchUpdationActions');

    this.bindAction(searchesActions.reset, this.onReset);

    this.bindAction(searchesActions.fetchBefore, this.onFetchBefore);
    this.bindAction(searchesActions.fetch, this.onFetch);
    this.bindAction(searchesActions.deleteSearch, this.onDeleteSearch);

    this.bindAction(searchCreationActions.createSuccess, this.onSearchCreationSuccess);
    this.bindAction(searchUpdationActions.updateSuccess, this.onSearchUpdationSuccess);

    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      isFetching: false,
      isFetched: false,
      searches: [],
    };
  }

  reset() {
    this.onReset();
  }

  fetchBefore() {
    this.onFetchBefore();
  }

  fetch(...args) {
    this.fetchBefore();
    return this.alt.getActions('searchesActions').fetch(...args);
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

  onFetch(searches = []) {
    this.setState({
      isFetching: false,
      isFetched: true,
      searches,
    });
  }

  onSearchCreationSuccess(search) {
    this.setState({
      searches: [
        ...this.state.searches,
        search,
      ],
    });
  }

  onSearchUpdationSuccess(search) {
    // update the search in the array accordingly
    const searches = this.state.searches;
    const searchIndex = searches.findIndex(aSearch => aSearch.id === search.id);
    if (searchIndex === -1) return;
    this.setState({
      searches: [
        ...searches.slice(0, searchIndex),
        search,
        ...searches.slice(searchIndex + 1),
      ],
    });
  }

  onDeleteSearch(search) {
    const searches = this.state.searches;
    const searchIndex = searches.findIndex(aSearch => aSearch.id === search.id);
    if (searchIndex === -1) return;
    this.setState({
      searches: [
        ...searches.slice(0, searchIndex),
        ...searches.slice(searchIndex + 1),
      ],
    });
  }

}
