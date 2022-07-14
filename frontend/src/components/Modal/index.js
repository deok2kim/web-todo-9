import '@/components/Modal/index.scss';

import Component from '@/libs/Component';

class Modal extends Component {
  constructor($container) {
    super($container);
    this.render();
  }

  template() {
    return `
			<section class="modal on" id="modal">
				<div class="modal__content">
					<p class="modal__title">선택한 카드를 삭제할까요?</p>
					<div class="modal__button-wrapper">
						<button class="modal__button">취소</button>
						<button class="modal__button accent">삭제</button>
					<div>
				</div>
			</section>
		`;
  }

  render() {
    this.$container.insertAdjacentHTML('beforeend', this.template());
  }
}

export default Modal;
