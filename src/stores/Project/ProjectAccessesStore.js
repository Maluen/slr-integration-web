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

    const projectAccessesActions = this.alt.getActions('projectAccessesActions');

    this.bindAction(projectAccessesActions.reset, this.onReset);
    this.bindAction(projectAccessesActions.fetchBefore, this.onFetchBefore);
    this.bindAction(projectAccessesActions.fetchSuccess, this.onFetchSuccess);
    this.bindAction(projectAccessesActions.fetchError, this.onFetchError);
    this.bindAction(projectAccessesActions.deleteProjectAccess, this.onDeleteProjectAccess);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      isFetching: false,
      isFetched: false,
      fetchErrorMessage: '',
      project: null,
      projectAccesses: [],
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
    return this.alt.getActions('projectAccessesActions').fetch(...args);
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

  onFetchSuccess({ project, projectAccesses }) {
    this.setState({
      isFetching: false,
      isFetched: true,
      project,
      projectAccesses,
    });
  }

  onFetchError(errorMessage) {
    this.setState({
      isFetching: false,
      isFetched: true,
      fetchErrorMessage: errorMessage,
    });
  }

  onDeleteProjectAccess(projectAccess) {
    // update the project in the array accordingly
    const projectAccesses = this.state.projectAccesses;
    const projectAccessIndex = projectAccesses.findIndex(aProjectAccess => aProjectAccess.id === projectAccess.id);
    if (projectAccessIndex === -1) return;
    this.setState({
      projectAccesses: [
        ...projectAccesses.slice(0, projectAccessIndex),
        ...projectAccesses.slice(projectAccessIndex + 1),
      ],
    });
  }
}

export default ProjectUpdationStore;
