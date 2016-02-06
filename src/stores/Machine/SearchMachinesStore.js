export default class searchMachinesStore {
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

    const searchMachinesActions = this.alt.getActions('searchMachinesActions');

    this.bindAction(searchMachinesActions.reset, this.onReset);
    this.bindAction(searchMachinesActions.fetchBefore, this.onFetchBefore);
    this.bindAction(searchMachinesActions.fetch, this.onFetch);

    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      isFetching: false,
      isFetched: false,
      machines: [],
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
    return this.alt.getActions('searchMachinesActions').fetch(...args);
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

  onFetch(machines = []) {
    this.setState({
      isFetching: false,
      isFetched: true,
      machines,
    });
  }

}

export default searchMachinesStore;
