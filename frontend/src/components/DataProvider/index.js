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
      .then(({ data: todos }) => {
        let refinedTodos = [
          { type: 'todo', todos: [] },
          { type: 'onProgress', todos: [] },
          { type: 'done', todos: [] },
        ];
        todos.forEach((todo) => {
          const { type, ...restTodo } = todo;
          refinedTodos[TODOS_TYPE_MAP[type]].todos.push({ ...restTodo });
        });

        refinedTodos.forEach((todo) => new Todos($todosContainer, todo));
      });
  }
}

export default DataProvider;
