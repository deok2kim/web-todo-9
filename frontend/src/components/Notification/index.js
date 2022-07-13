import '@/components/Notification/index.scss';

import user from '@/assets/user.svg';
import Component from '@/libs/Component';

class Notification extends Component {
  constructor($container, initialState) {
    super($container, initialState);

    this.render();
  }

  template() {
    const { username, action, time } = this.state;
    return `
    <div class="noti">
      <img src="${user}" />
      <div class="noti__info-wrapper">
        <p class="noti__username">${username}adassd</p>
        <p class="noti__action">${action}</p>
        <p class="noti__time">${time}</p>
      </div>
    </div>
    `;
  }
  render() {
    this.$container.insertAdjacentHTML('beforeend', this.template());
  }
}

export default Notification;
