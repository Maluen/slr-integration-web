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
    this.bindAction(searchActions.startSearchError, this.onStartSearchError);
    this.bindAction(searchActions.startSearchSuccess, this.onStartSearchSuccess);
    this.bindAction(searchActions.stopSearchError, this.onStopSearchError);
    this.bindAction(searchActions.stopSearchSuccess, this.onStopSearchSuccess);
    this.bindAction(searchActions.extendSearchState, this.onExtendSearchState);
    this.bindAction(searchActions.resetSearchStateStatus, this.onResetSearchStateStatus);

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
      'state': {},
      project: null,
      machineId: null,
      startSearchErrorMessage: '',
      stopSearchErrorMessage: '',
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

  onFetchSuccess({ search, project }) {
    this.setState({
      isFetching: false,
      isFetched: true,
      ...search,
      project,
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

  onStartSearchError(errorMessage) {
    this.setState({ startSearchErrorMessage: errorMessage });
  }

  onStartSearchSuccess() {
    this.setState({ startSearchErrorMessage: '' });
  }

  onStopSearchError(errorMessage) {
    this.setState({ stopSearchErrorMessage: errorMessage });
  }

  onStopSearchSuccess() {
    this.setState({ stopSearchErrorMessage: '' });
  }

  onExtendSearchState({ searchStateChanges, type }) {
    const oldSearchState = this.state.state;

    // default 'extend' type behaviour
    const newSearchState = {
      ...oldSearchState,
      ...searchStateChanges,
    };

    if (type === 'push') {
      newSearchState.output = [
        ...oldSearchState.output,
        ...searchStateChanges.output,
      ];
    }

    this.setState({ state: newSearchState });
  }

  onResetSearchStateStatus() {
    this.setState({
      state: {
        ...this.state.state,
        status: 'created',
      },
    });
  }
}

export default SearchUpdationStore;
