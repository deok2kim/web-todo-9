import { $ } from '@/commons/utils/query-selector';
import Notification from '@/components/Notification/index';
import Todos from '@/components/Todos/index';
import Component from '@/libs/Component';

class DataProvider extends Component {
  constructor($container, initialState) {
    super($container, initialState);

    this.render();
  }

  template() {
    return `
      <section class="todos-container"></section>
      <aside class="notifications"></aside>
    `;
  }

  render() {
    this.$container.insertAdjacentHTML('beforeend', this.template());
    const $todosContainer = $('.todos-container');
    this.state.forEach((todos) => new Todos($todosContainer, todos));
  }
}

export default DataProvider;
