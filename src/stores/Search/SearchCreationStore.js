import searchSettings from '../../constants/searchSettings';

const defaultSettings = Object.keys(searchSettings).map((settingName) => {
  return { name: settingName, value: searchSettings[settingName].defaultValue };
});

export default class SearchCreationStore {
  constructor() {
    const searchCreationActions = this.alt.getActions('searchCreationActions');

    this.bindAction(searchCreationActions.updateName, this.onUpdateName);
    this.bindAction(searchCreationActions.updateSettings, this.onUpdateSettings);
    this.bindAction(searchCreationActions.createError, this.onCreateError);
    this.bindAction(searchCreationActions.createSuccess, this.onCreateSuccess);

    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      'name': '',
      'settings': [ ...defaultSettings ],
      'errorMessage': '',
    };
  }

  onUpdateName(name) {
    this.setState({ name });
  }

  onUpdateSettings(settings) {
    this.setState({ settings });
  }

  onCreateError(errorMessage) {
    this.setState({ errorMessage });
  }

  onCreateSuccess() {
    this.setState(this.getInitialState());
  }
}

export default SearchCreationStore;
