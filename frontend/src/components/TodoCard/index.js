import './index.scss';

import shortid from 'shortid';

import { $ } from '@/commons/utils/query-selector';
import { safelyInsertHTML } from '@/commons/utils/safelyInsertHTML';
import Modal from '@/components/Modal/index';
import Component from '@/libs/Component';

class TodoCard extends Component {
  constructor($container, initialState, setTodos) {
    super($container, initialState);
    this.setTodos = setTodos;
    this.$modal = '';
    this.render();
  }

  static createTodoCard(defaultCardInfo) {
    return {
      cardInfo: defaultCardInfo || {
        title: '',
        author: '김더미',
        body: '',
        id: shortid.generate(),
      },
      cardStatus: 'creatable',
    };
  }

  setCardStatus(nextStatus) {
    this.setState({
      ...this.state,
      cardStatus: nextStatus,
    });
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
				<button class="btn accent disabled">${cardStatus === 'creatable' ? '등록' : '수정'}</button>
			</div>
		`;
  }

  getCurrentInputValue() {
    const { cardInfo } = this.state;
    const titleValue = $(`#card-${cardInfo.id} .card__title`)?.value;
    const bodyValue = $(`#card-${cardInfo.id} .card__body`)?.value;

    return { title: titleValue, body: bodyValue };
  }

  handleClick(e) {
    const { cardStatus, cardInfo } = this.state;
    const target = e.target.closest(`#card-${cardInfo.id} button`);
    if (!target) return;
    const targetClassName = target.className;

    const nextCardInfo = {
      ...cardInfo,
      ...this.getCurrentInputValue(),
    };

    if (targetClassName === 'btn accent') {
      this.setTodos(cardStatus === 'creatable' ? '등록' : '수정', nextCardInfo);
    } else if (targetClassName === 'btn normal') {
      if (cardStatus === 'editable') this.setCardStatus('idle');
      if (cardStatus === 'creatable') {
        this.setTodos('취소', nextCardInfo);
      }
    } else if (targetClassName === 'card__btn-remove') {
      this.$modal = new Modal(this.$container, () => {});
      this.$modal.setCbFunc(() => this.setTodos('삭제', nextCardInfo));
    }
  }

  handleChange(e) {
    const target = e.target;
    if (!(target instanceof HTMLInputElement) && !(target instanceof HTMLTextAreaElement)) return;

    const { cardInfo } = this.state;
    $(`#card-${cardInfo.id} .btn.accent`)?.classList.toggle('disabled', target.value.trim() === '');
  }

  handleDoubleClick() {
    if (this.isCardActive()) return;
    this.setCardStatus('editable');
  }

  handleHover(isHover) {
    const nextState = isHover ? 'removable' : 'idle';
    return (e) => {
      const target = e.target;
      if (target && this.state.cardStatus !== nextState) this.setCardStatus(nextState);
    };
  }

  setEvent() {
    const { id } = this.state.cardInfo;
    const currentCard = $(`#card-${id}`);
    const buttonRef = currentCard.querySelector('button.card__btn-remove');
    buttonRef?.addEventListener('mouseenter', this.handleHover(true));
    buttonRef?.addEventListener('mouseleave', this.handleHover(false));
    currentCard.addEventListener('input', this.handleChange.bind(this));
    currentCard.addEventListener('click', this.handleClick.bind(this));
    currentCard.addEventListener('dblclick', this.handleDoubleClick.bind(this));
  }

  template() {
    const { cardInfo } = this.state;
    const { title, body, author, id, order } = cardInfo;
    return `
			<article id="card-${id}" class="${this.getCardStyleByStatus()}" style="order:${order}">
				<div class="card__wrapper">
					${
            this.isCardActive()
              ? `
                <input class="card__title" name="title" value="${title}" placeholder="제목을 입력하세요" />
                <textarea class="card__body"  name="body" placeholder="내용을 입력하세요">${body}</textarea>
                ${this.getTemplateForButton()}
              `
              : `
                <h3 class="card__title">${title}</h3>	
                <p class="card__body">${body}</p>
                <p class="card__author">${author}</p>
              `
          }
				</div>
				${
          this.isCardActive()
            ? ''
            : `
								<button class="card__btn-remove">
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.5 17.25L6.75 16.5L11.25 12L6.75 7.5L7.5 6.75L12 11.25L16.5 6.75L17.25 7.5L12.75 12L17.25 16.5L16.5 17.25L12 12.75L7.5 17.25Z" fill="#828282"/>
                  </svg>
								</button>
							`
        }
			</div>
		`;
  }

  render() {
    const {
      cardInfo: { id },
    } = this.state;

    safelyInsertHTML(this.$container, 'afterbegin', `#card-${id}`, this.template());

    this.setEvent();
  }
}

export default TodoCard;
