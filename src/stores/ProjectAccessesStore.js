export default class ProjectUpdationStore {
  constructor() {
    const projectAccessesActions = this.alt.getActions('projectAccessesActions');

    this.bindAction(projectAccessesActions.reset, this.onReset);
    this.bindAction(projectAccessesActions.fetchBefore, this.onFetchBefore);
    this.bindAction(projectAccessesActions.fetch, this.onFetch);
    this.bindAction(projectAccessesActions.deleteProjectAccess, this.onDeleteProjectAccess);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      isFetching: false,
      isFetched: false,
      project: null,
      projectAccesses: [],
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

  onFetch({ project, projectAccesses }) {
    this.setState({
      isFetching: false,
      isFetched: true,
      project,
      projectAccesses,
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
