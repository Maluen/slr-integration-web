export default class ProjectsStore {
  constructor() {
    this.exportPublicMethods({
      setState: this.setState,
      getInitialState: this.getInitialState,
      fetchBefore: this.fetchBefore,
      fetch: this.fetch,
      onFetchBefore: this.onFetchBefore,
    });

    const projectsActions = this.alt.getActions('projectsActions');
    const projectCreationActions = this.alt.getActions('projectCreationActions');
    const projectUpdationActions = this.alt.getActions('projectUpdationActions');

    this.bindAction(projectsActions.fetchBefore, this.onFetchBefore);
    this.bindAction(projectsActions.fetch, this.onFetch);
    this.bindAction(projectsActions.deleteProject, this.onDeleteProject);

    this.bindAction(projectCreationActions.createSuccess, this.onProjectCreationSuccess);
    this.bindAction(projectUpdationActions.updateSuccess, this.onProjectUpdationSuccess);

    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      isFetching: false,
      isFetched: false,
      projects: [],
    };
  }

  fetchBefore() {
    this.onFetchBefore();
  }

  fetch(...args) {
    this.fetchBefore();
    return this.alt.getActions('projectsActions').fetch(...args);
  }

  onFetchBefore() {
    this.setState({
      isFetching: true,
      isFetched: false,
    });
  }

  onFetch(projects = []) {
    this.setState({
      isFetching: false,
      isFetched: true,
      projects,
    });
  }

  onProjectCreationSuccess(project) {
    this.setState({
      projects: [
        ...this.state.projects,
        project,
      ],
    });
  }

  onProjectUpdationSuccess(project) {
    // update the project in the array accordingly
    const projects = this.state.projects;
    const projectIndex = projects.findIndex(aProject => aProject.id === project.id);
    if (projectIndex === -1) return;
    this.setState({
      projects: [
        ...projects.slice(0, projectIndex),
        project,
        ...projects.slice(projectIndex + 1),
      ],
    });
  }

  onDeleteProject(project) {
    const projects = this.state.projects;
    const projectIndex = projects.findIndex(aProject => aProject.id === project.id);
    if (projectIndex === -1) return;
    this.setState({
      projects: [
        ...projects.slice(0, projectIndex),
        ...projects.slice(projectIndex + 1),
      ],
    });
  }

}
