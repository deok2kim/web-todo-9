import './app.scss';

import hamburger from '@/assets/hamburger.svg';
import { $ } from '@/commons/utils/query-selector';
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
        <nav>
          <h1>TO-DO LIST</h1>
          <button class="btn-toggle-sidebar">
            <img src="${hamburger}" />
          </button>
        </nav>
        <section class="todos-container"></section>
        <aside class="notifications"></aside>
      </main>
    `;
  }

  openNotis() {
    const notifications = $('.notifications');
    notifications.classList.remove('close');
    notifications.classList.add('open');
  }

  setEvent() {
    const sidebarToggleBtn = $('.btn-toggle-sidebar');
    console.log(sidebarToggleBtn);
    sidebarToggleBtn.addEventListener('click', this.openNotis);
  }

  render() {
    this.$container.innerHTML = this.template();
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
