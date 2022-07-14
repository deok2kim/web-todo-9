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

  renderTodos() {
    const $todosContainer = $('.todos-container');

    getTodos()
      .then((result) => result.json())
      .then(({ data: todosList }) => {
        todosList.forEach((todos, index) => new Todos($todosContainer.children[index], todos));
      });
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
