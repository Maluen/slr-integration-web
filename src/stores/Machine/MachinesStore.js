export default class MachinesStore {
  constructor() {
    this.exportPublicMethods({
      setState: this.setState,
      getInitialState: this.getInitialState,
      fetchBefore: this.fetchBefore,
      fetch: this.fetch,
      onFetchBefore: this.onFetchBefore,
    });

    const machinesActions = this.alt.getActions('machinesActions');
    const machineCreationActions = this.alt.getActions('machineCreationActions');
    const machineUpdationActions = this.alt.getActions('machineUpdationActions');

    this.bindAction(machinesActions.fetchBefore, this.onFetchBefore);
    this.bindAction(machinesActions.fetchSuccess, this.onFetchSuccess);
    this.bindAction(machinesActions.fetchError, this.onFetchError);
    this.bindAction(machinesActions.deleteMachine, this.onDeleteMachine);

    this.bindAction(machineCreationActions.createSuccess, this.onMachineCreationSuccess);
    this.bindAction(machineUpdationActions.updateSuccess, this.onMachineUpdationSuccess);

    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      isFetching: false,
      isFetched: false,
      fetchErrorMessage: '',
      machines: [],
    };
  }

  fetchBefore() {
    this.onFetchBefore();
  }

  fetch(...args) {
    this.fetchBefore();
    return this.alt.getActions('machinesActions').fetch(...args);
  }

  onFetchBefore() {
    this.setState({
      isFetching: true,
      isFetched: false,
      fetchErrorMessage: '',
    });
  }

  onFetchSuccess(machines = []) {
    this.setState({
      isFetching: false,
      isFetched: true,
      machines,
    });
  }

  onFetchError(errorMessage) {
    this.setState({
      isFetching: false,
      isFetched: true,
      fetchErrorMessage: errorMessage,
    });
  }

  onMachineCreationSuccess(machine) {
    this.setState({
      machines: [
        ...this.state.machines,
        machine,
      ],
    });
  }

  onMachineUpdationSuccess(machine) {
    // update the machine in the array accordingly
    const machines = this.state.machines;
    const machineIndex = machines.findIndex(aMachine => aMachine.id === machine.id);
    if (machineIndex === -1) return;
    this.setState({
      machines: [
        ...machines.slice(0, machineIndex),
        machine,
        ...machines.slice(machineIndex + 1),
      ],
    });
  }

  onDeleteMachine(machine) {
    const machines = this.state.machines;
    const machineIndex = machines.findIndex(aMachine => aMachine.id === machine.id);
    if (machineIndex === -1) return;
    this.setState({
      machines: [
        ...machines.slice(0, machineIndex),
        ...machines.slice(machineIndex + 1),
      ],
    });
  }

}
