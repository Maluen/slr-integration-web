import searchSettings from '../../constants/searchSettings';

const defaultSettings = Object.keys(searchSettings).map((settingName) => {
  return { name: settingName, value: searchSettings[settingName].defaultValue };
});

export default class SearchUpdationStore {
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

    const searchActions = this.alt.getActions('searchActions');

    this.bindAction(searchActions.reset, this.onReset);
    this.bindAction(searchActions.fetchBefore, this.onFetchBefore);
    this.bindAction(searchActions.fetch, this.onFetch);
    this.bindAction(searchActions.selectMachine, this.onSelectMachine);

    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      isFetching: false,
      isFetched: false,
      'id': '',
      'name': '',
      'settings': [ ...defaultSettings ],
      'errorMessage': '',
      machineId: null,
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
    return this.alt.getActions('searchActions').fetch(...args);
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
      machineId: null,
    });
  }

  onSelectMachine(machineId) {
    this.setState({ machineId });
  }
}

export default SearchUpdationStore;
