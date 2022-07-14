import './app.scss';

import { $ } from '@/commons/utils/query-selector';
import DataProvider from '@/components/DataProvider/index';
import Nav from '@/components/Nav/index';
import Component from '@/libs/Component';

class App extends Component {
  constructor($container) {
    super($container);
    this.state = {
      isOpenNotifications: false,
    };
    this.$dataProviderComponent = '';
    this.init();
  }
  setNotificationsOpenState(nextState) {
    this.setState(nextState);
  }

  render() {
    this.$dataProviderComponent.renderNotifications(this.state.isOpenNotifications);
  }

  template() {
    return `
      <main class="main-page" />
    `;
  }

  init() {
    this.$container.innerHTML = this.template();
    const $mainPage = $('.main-page');
    new Nav($mainPage, {}, this.setNotificationsOpenState.bind(this));
    this.$dataProviderComponent = new DataProvider(
      $mainPage,
      {},
      this.setNotificationsOpenState.bind(this),
      this.$notificationsComponent,
    );
  }
}

export default App;
