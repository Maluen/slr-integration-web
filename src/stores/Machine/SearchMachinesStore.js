export default class searchMachinesStore {
  constructor() {
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
