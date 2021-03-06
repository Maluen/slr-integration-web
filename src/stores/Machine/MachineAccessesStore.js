import withFetchStore from '../withFetchStore';

export default class MachineUpdationStore {
  constructor() {
    this.fetchActionsName = 'machineAccessesActions';

    this.exportPublicMethods({
      setState: this.setState,
      getInitialState: this.getInitialState,
      reset: this.reset,
      fetchBefore: this.fetchBefore,
      fetch: this.fetch,
      onReset: this.onReset,
      onFetchBefore: this.onFetchBefore,
    });

    const machineAccessesActions = this.alt.getActions('machineAccessesActions');

    this.bindAction(machineAccessesActions.reset, this.onReset);
    this.bindAction(machineAccessesActions.fetchBefore, this.onFetchBefore);
    this.bindAction(machineAccessesActions.fetchSuccess, this.onFetchSuccess);
    this.bindAction(machineAccessesActions.fetchError, this.onFetchError);
    this.bindAction(machineAccessesActions.deleteMachineAccess, this.onDeleteMachineAccess);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      isFetching: false,
      isFetched: false,
      fetchErrorMessage: '',
      machine: null,
      machineAccesses: [],
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
    return this.alt.getActions('machineAccessesActions').fetch(...args);
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

  onFetchSuccess({ machine, machineAccesses }) {
    this.setState({
      isFetching: false,
      isFetched: true,
      machine,
      machineAccesses,
    });
  }

  onFetchError(errorMessage) {
    this.setState({
      isFetching: false,
      isFetched: true,
      fetchErrorMessage: errorMessage,
    });
  }

  onDeleteMachineAccess(machineAccess) {
    // update the machine access in the array accordingly
    const machineAccesses = this.state.machineAccesses;
    const machineAccessIndex = machineAccesses.findIndex(aMachineAccess => aMachineAccess.id === machineAccess.id);
    if (machineAccessIndex === -1) return;
    this.setState({
      machineAccesses: [
        ...machineAccesses.slice(0, machineAccessIndex),
        ...machineAccesses.slice(machineAccessIndex + 1),
      ],
    });
  }
}

export default MachineUpdationStore;
