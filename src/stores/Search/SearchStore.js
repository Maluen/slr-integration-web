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
    this.bindAction(searchActions.fetchSuccess, this.onFetchSuccess);
    this.bindAction(searchActions.fetchError, this.onFetchError);
    this.bindAction(searchActions.selectMachine, this.onSelectMachine);

    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      isFetching: false,
      isFetched: false,
      fetchErrorMessage: '',
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
      fetchErrorMessage: '',
    });
  }

  onFetchSuccess(search) {
    this.setState({
      isFetching: false,
      isFetched: true,
      ...search,
      errorMessage: '',
      machineId: null,
    });
  }

  onFetchError(errorMessage) {
    this.setState({
      isFetching: false,
      isFetched: true,
      fetchErrorMessage: errorMessage,
    });
  }

  onSelectMachine(machineId) {
    this.setState({ machineId });
  }
}

export default SearchUpdationStore;
