import { $ } from '@/commons/utils/query-selector';
import Notifications from '@/components/Notifications/index';
import Todos from '@/components/Todos/index';
import { getTodos } from '@/libs/api';
import Component from '@/libs/Component';

class DataProvider extends Component {
  constructor($container, initialState, setNotificationsOpenState) {
    super($container, initialState);

    this.setNotificationsOpenState = setNotificationsOpenState;
    this.$notificationsComponent = '';

    this.state = {
      todosList: [],
      notifications: [],
    };

    this.init().then(this.render.bind(this));
  }

  async init() {
    return getTodos()
      .then((result) => result.json())
      .then(({ data: todosList }) => {
        this.state.todosList = todosList;
      });

    /**
     * GET Notifications logic will be placed;
     */
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

  setTodosList(setCallback) {
    this.state.todosList = setCallback(this.state.todosList);
    this.renderTodos();
  }

  renderTodos() {
    const { todosList } = this.state;
    const $todosContainer = $('.todos-container');

    todosList.forEach(
      (_todos, index) =>
        new Todos($todosContainer.children[index], todosList, this.setTodosList.bind(this)),
    );
  }

  renderNotifications(isOpenNotifications) {
    const $notificationsContainer = $('.notifications');
    if (this.$notificationsComponent) {
      this.$notificationsComponent.toggleNotifications(isOpenNotifications);
    } else {
      this.$notificationsComponent = new Notifications(
        $notificationsContainer,
        {},
        this.setNotificationsOpenState,
      );
    }
  }

  render() {
    this.$container.insertAdjacentHTML('beforeend', this.template());
    this.renderTodos();
    this.renderNotifications();
  }
}

export default DataProvider;
