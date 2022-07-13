import './app.scss';

import { $ } from '@/commons/utils/query-selector';
import DataProvider from '@/components/DataProvider/index';
import Nav from '@/components/Nav/index';
import Component from '@/libs/Component';

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
    new DataProvider($mainPage);
  }
}

export default App;
