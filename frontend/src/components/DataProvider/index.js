import { $ } from '@/commons/utils/query-selector';
import Todos from '@/components/Todos/index';
import { TODOS_TYPE_MAP } from '@/constants/mapper';
import { getTodos } from '@/libs/api';
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

    getTodos()
      .then((result) => result.json())
      .then(({ data: todosList }) => {
        todosList.forEach((todos) => new Todos($todosContainer, todos));
      });
  }
}

export default DataProvider;
