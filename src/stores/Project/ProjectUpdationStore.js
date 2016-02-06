import projectSettings from '../../constants/projectSettings';

const defaultSettings = Object.keys(projectSettings).map((settingName) => {
  return { name: settingName, value: projectSettings[settingName].defaultValue };
});

export default class ProjectUpdationStore {
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

    const projectUpdationActions = this.alt.getActions('projectUpdationActions');

    this.bindAction(projectUpdationActions.reset, this.onReset);
    this.bindAction(projectUpdationActions.fetchBefore, this.onFetchBefore);
    this.bindAction(projectUpdationActions.fetch, this.onFetch);
    this.bindAction(projectUpdationActions.updateName, this.onUpdateName);
    this.bindAction(projectUpdationActions.updateSettings, this.onUpdateSettings);
    this.bindAction(projectUpdationActions.updateError, this.onUpdateError);
    this.bindAction(projectUpdationActions.updateSuccess, this.onUpdateSuccess);

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
    return this.alt.getActions('projectUpdationActions').fetch(...args);
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

  onFetch(project) {
    this.setState({
      isFetching: false,
      isFetched: true,
      ...project,
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

export default ProjectUpdationStore;
