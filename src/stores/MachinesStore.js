export default class MachinesStore {
  constructor() {
    const machinesActions = this.alt.getActions('machinesActions');
    const machineCreationActions = this.alt.getActions('machineCreationActions');

    this.bindAction(machinesActions.fetchBefore, this.onFetchBefore);
    this.bindAction(machinesActions.fetch, this.onFetch);

    this.bindAction(machineCreationActions.createSuccess, this.onMachineCreationSuccess);

    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      machines: [],
      isFetching: false,
      isFetched: false,
    };
  }

  onFetchBefore() {
    this.setState({
      isFetching: true,
      isFetched: false,
    });
  }

  onFetch(machines = []) {
    this.setState({
      machines: machines,
      isFetching: false,
      isFetched: true,
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

}
