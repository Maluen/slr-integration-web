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

    const searchUpdationActions = this.alt.getActions('searchUpdationActions');

    this.bindAction(searchUpdationActions.reset, this.onReset);
    this.bindAction(searchUpdationActions.fetchBefore, this.onFetchBefore);
    this.bindAction(searchUpdationActions.fetch, this.onFetch);
    this.bindAction(searchUpdationActions.updateName, this.onUpdateName);
    this.bindAction(searchUpdationActions.updateSettings, this.onUpdateSettings);
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
      'settings': [ ...defaultSettings ],
      'errorMessage': '',
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
    return this.alt.getActions('searchUpdationActions').fetch(...args);
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

  onUpdateSettings(settings) {
    this.setState({ settings });
  }

  onUpdateError(errorMessage) {
    this.setState({ errorMessage });
  }

  onUpdateSuccess() {
    this.setState(this.getInitialState());
  }
}

export default SearchUpdationStore;
