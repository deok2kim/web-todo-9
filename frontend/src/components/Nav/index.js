import './index.scss';

import hamburger from '@/assets/hamburger.svg';
import Component from '@/libs/Component';

class Nav extends Component {
  constructor($container, initialState) {
    super($container, initialState);

    this.render();
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

  render() {
    this.$container.insertAdjacentHTML('afterbegin', this.template());
  }
}

export default Nav;
