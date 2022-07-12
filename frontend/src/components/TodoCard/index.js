import './index.scss';

import remove from '@/assets/remove.svg';
import Component from '@/libs/Component';

class TodoCard extends Component {
  constructor($container, initialState) {
    super($container, initialState);
    this.render();
  }

  template() {
    return `
			<div class="card">
				<div class="card__wrapper">
					<p class="card__title">TITLE</p>	
					<p class="card__body">BODY</p>
					<p class="card__author">author by WEB</p>
				</div>

				<button class="card__btn-remove">
					<img src=${remove} alt="remove-btn" />
				</button>
			</div>
		`;
  }

  render() {
    this.$container.innerHTML = this.template();
  }
}

export default TodoCard;
