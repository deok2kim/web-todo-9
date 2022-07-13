import './app.scss';

import hamburger from '@/assets/hamburger.svg';
import { $ } from '@/commons/utils/query-selector';
import DataProvider from '@/components/DataProvider/index';
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
      <main class="main-page" />
    `;
  }

  render() {
    this.$container.innerHTML = this.template();
    const $mainPage = $('.main-page');
    new Nav($mainPage, {});
    new DataProvider($mainPage, dummyToods);
  }
}

export default App;
