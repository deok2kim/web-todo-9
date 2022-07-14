import './index.scss';

import hamburger from '@/assets/hamburger.svg';
import Component from '@/libs/Component';
import { $ } from '@/commons/utils/query-selector';

class Nav extends Component {
  constructor($container, initialState, setNotificationsOpenState) {
    super($container, initialState);
    this.setNotificationsOpenState = setNotificationsOpenState;
    this.render();
  }

  openNotifications() {
    this.setNotificationsOpenState({
      isOpenNotifications: true,
    });
  }

  template() {
    return `
			<nav class="nav">
				<h1>TO-DO LIST</h1>
				<button class="btn-open-notifications">
					<img src="${hamburger}" />
				</button>
			</nav>
		`;
  }

  setEvent() {
    const $hamburgerBtn = $('.btn-open-notifications');
    $hamburgerBtn.addEventListener('click', this.openNotifications.bind(this));
  }

  render() {
    this.$container.insertAdjacentHTML('afterbegin', this.template());
    this.setEvent();
  }
}

export default Nav;
