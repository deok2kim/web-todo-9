import './app.scss';

import hamburger from '@/assets/hamburger.svg';
import { $ } from '@/commons/utils/query-selector';
import Nav from '@/components/Nav/index';
import Notifications from '@/components/Notifications/index';
import Todos from '@/components/Todos/index';
import Component from '@/libs/Component';

const dummyToods = [
  {
    type: 'todo',
    todos: [
      {
        title: '테스트1234',
        body: '테스트바디4586',
        author: '궈녁진',
      },
    ],
  },
  {
    type: 'onProcess',
    todos: [
      {
        title: '테스트1234',
        body: '테스트바디4586',
        author: '궈녁진',
      },
      {
        title: '으아아아악',
        body: '으아아앙케버버',
        author: '테스터',
      },
    ],
  },
  {
    type: 'done',
    todos: [
      {
        title: '테스트1234',
        body: '테스트바디4586',
        author: '궈녁진',
      },
    ],
  },
];

class App extends Component {
  constructor($container) {
    super($container);
    this.render();
  }

  template() {
    return `
      <main class="main-page">
        <section class="todos-container"></section>
        <aside class="notifications"></aside>
      </main>
    `;
  }

  openNotifications() {
    const notifications = $('.notifications');
    notifications.classList.remove('close');
    notifications.classList.add('open');
  }

  setEvent() {
    const notificationOpenBtn = $('.btn-open-notifications');
    notificationOpenBtn.addEventListener('click', this.openNotifications);
  }

  render() {
    this.$container.innerHTML = this.template();

    const mainPage = $('.main-page');
    new Nav(mainPage, {});

    const todosContainer = $('.todos-container');
    dummyToods.forEach((dummyTodo) => {
      new Todos(todosContainer, dummyTodo);
    });

    const notifications = $('.notifications');
    new Notifications(notifications, {});

    this.setEvent();
  }
}

export default App;
