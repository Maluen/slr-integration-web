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
      isFetching: false,
      isFetched: false,
      machines: [],
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
      isFetching: false,
      isFetched: true,
      machines: machines,
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
