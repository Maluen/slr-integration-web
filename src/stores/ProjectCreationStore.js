import projectSettings from '../constants/projectSettings';

const defaultSettings = Object.keys(projectSettings).map((settingName) => {
  return { name: settingName, value: projectSettings[settingName].defaultValue };
});

export default class ProjectCreationStore {
  constructor() {
    const projectCreationActions = this.alt.getActions('projectCreationActions');

    this.bindAction(projectCreationActions.updateName, this.onUpdateName);
    this.bindAction(projectCreationActions.updateSettings, this.onUpdateSettings);
    this.bindAction(projectCreationActions.createError, this.onCreateError);
    this.bindAction(projectCreationActions.createSuccess, this.onCreateSuccess);

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

export default ProjectCreationStore;
