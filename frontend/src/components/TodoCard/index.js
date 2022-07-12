import './index.scss';

import remove from '@/assets/remove.svg';
import Component from '@/libs/Component';

class TodoCard extends Component {
  constructor($container, initialState) {
    super($container, initialState);

    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  getCardStyleByStatus() {
    const cardClassList = ['card'];
    const { cardStatus } = this.state;
    switch (cardStatus) {
      case 'creatable':
      case 'editable':
        cardClassList.push('active');
        break;

      case 'removable':
        cardClassList.push('removable');
        break;

      case 'floating':
        cardClassList.push('floating');
        break;

      case 'remain':
        cardClassList.push('remain');
        break;

      default:
        break;
    }
    return cardClassList.join(' ');
  }

  isCardActive() {
    const { cardStatus } = this.state;
    return cardStatus === 'editable' || cardStatus === 'creatable';
  }

  getTemplateForButton() {
    const { cardStatus } = this.state;
    return `
			<div class="button-wrapper">
				<button class="btn normal">취소</button>
				<button class="btn accent">${cardStatus === 'creatable' ? '등록' : '수정'}</button>
			</div>
		`;
  }

  setButton() {}

  template() {
    const { title, body, author } = this.state.inputs;
    return `
			<article class="${this.getCardStyleByStatus()}">
				<div class="card__wrapper">
					<h3 class="card__title">${title}</p>	
					<p class="card__body">${body}</p>
					<p class="card__author">${author}</p>
					${this.isCardActive() ? this.getTemplateForButton() : ''}
				</div>
				${
          this.isCardActive()
            ? ''
            : `
								<button class="card__btn-remove">
									<img src=${remove} alt="remove-btn" />
								</button>
							`
        }
				
			</div>
		`;
  }

  render() {
    this.$container.insertAdjacentHTML('beforeend', this.template());
  }
}

export default TodoCard;
