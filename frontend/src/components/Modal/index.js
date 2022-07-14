import '@/components/Modal/index.scss';

import { $ } from '@/commons/utils/query-selector';
import Component from '@/libs/Component';

class Modal extends Component {
  constructor($container, cb) {
    super($container);
    this.render();
    this.cb = cb;
  }

  open() {
    const $modal = $('.modal');
    $modal.classList.add('on');
  }

  template() {
    return `
			<section class="modal on" id="modal">
				<div class="modal__content">
					<p class="modal__title">선택한 카드를 삭제할까요?</p>
					<div class="modal__button-wrapper">
						<button class="modal__button" id="btnModalClose">취소</button>
						<button class="modal__button accent" id="btnTodoDelete">삭제</button>
					<div>
				</div>
			</section>
		`;
  }
  setCbFunc(cb) {
    this.cb = cb;
  }

  confirm() {
    return this.cbFunc;
  }
  setEvent() {
    const $modal = $('.modal');
    $modal.addEventListener('click', (e) => {
      if (e.target.id === 'btnModalClose') {
        // 왜 두번 눌러야 하는지 결국 찾지 못한채로...
        this.$container.removeChild(this.$container.lastChild);
        this.$container.removeChild(this.$container.lastChild);
      } else if (e.target.id === 'btnTodoDelete') {
        $modal.classList.toggle('on');
        this.cb();
      }
    });
  }

  render() {
    this.$container.insertAdjacentHTML('beforeend', this.template());
    this.setEvent();
  }
}

export default Modal;
