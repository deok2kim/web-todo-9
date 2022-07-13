import { $ } from '@/commons/utils/query-selector';
import Todos from '@/components/Todos/index';
import { getTodos } from '@/libs/api';
import Component from '@/libs/Component';

class DataProvider extends Component {
  constructor($container, initialState) {
    super($container, initialState);

    this.render();
  }

  template() {
    return `
      <section class="todos-container">
        <section class="todos" id="todo"></section>
        <section class="todos" id="onProgress"></section>
        <section class="todos" id="done"></section>
      </section>
      <aside class="notifications"></aside>
    `;
  }

  render() {
    this.$container.insertAdjacentHTML('beforeend', this.template());
    const $todosContainer = $('.todos-container');

    getTodos()
      .then((result) => result.json())
      .then(({ data: todosList }) => {
        todosList.forEach((todos, index) => new Todos($todosContainer.children[index], todos));
      });
  }
}

export default DataProvider;
