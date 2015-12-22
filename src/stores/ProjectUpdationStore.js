export default class ProjectUpdationStore {
  constructor() {
    const projectUpdationActions = this.alt.getActions('projectUpdationActions');

    this.bindAction(projectUpdationActions.reset, this.onReset);
    this.bindAction(projectUpdationActions.fetchBefore, this.onFetchBefore);
    this.bindAction(projectUpdationActions.fetch, this.onFetch);
    this.bindAction(projectUpdationActions.updateName, this.onUpdateName);
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

  onUpdateError(errorMessage) {
    this.setState({ errorMessage });
  }

  onUpdateSuccess() {
    this.setState(this.getInitialState());
  }
}

export default ProjectUpdationStore;
