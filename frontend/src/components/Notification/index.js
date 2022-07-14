import '@/components/Notification/index.scss';

import user from '@/assets/user.svg';
import Component from '@/libs/Component';

class Notification extends Component {
  constructor($container, initialState) {
    super($container, initialState);
    console.log('asdf', this.state);
    this.render();
  }

  template() {
    const { author, action, createdAt } = this.state;
    return `
    <div class="noti">
      <img src="${user}" />
      <div class="noti__info-wrapper">
        <p class="noti__username">@${author}</p>
        <p class="noti__action">${Object.values(action).join('-')}</p>
        <p class="noti__time">${createdAt}</p>
      </div>
    </div>
    `;
  }
  render() {
    this.$container.insertAdjacentHTML('beforeend', this.template());
  }
}

export default Notification;
