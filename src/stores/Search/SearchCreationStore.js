export default class SearchCreationStore {
  constructor() {
    const searchCreationActions = this.alt.getActions('searchCreationActions');

    this.bindAction(searchCreationActions.updateName, this.onUpdateName);
    this.bindAction(searchCreationActions.createError, this.onCreateError);
    this.bindAction(searchCreationActions.createSuccess, this.onCreateSuccess);

    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      'name': '',
      'errorMessage': '',
    };
  }

  onUpdateName(name) {
    this.setState({ name });
  }

  onCreateError(errorMessage) {
    this.setState({ errorMessage });
  }

  onCreateSuccess() {
    this.setState(this.getInitialState());
  }
}

export default SearchCreationStore;
