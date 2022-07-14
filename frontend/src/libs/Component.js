class Component {
  constructor($container, initialState = {}) {
    this.$container = $container;
    this.state = initialState;
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  setEvent() {}

  template() {}

  render() {}
}

export default Component;
