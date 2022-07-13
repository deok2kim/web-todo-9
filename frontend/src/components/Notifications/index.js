import remove from '@/assets/remove.svg';
import Notification from '@/components/Notification/index';
import Component from '@/libs/Component';

class Notifications extends Component {
  constructor($container, initialState) {
    super($container, initialState);

    const dummy = [
      {
        username: '@sam',
        action: 'HTML/CSS공부하기를 해야할 일에서 하고 있는 일로 이동하였습니다.',
        time: '1분 전',
      },
      {
        username: '@sam',
        action: '해야할 일에 블로그에 포스팅할 것이 등록되었습니다.',
        time: '1시간 전',
      },
    ];

    this.state = {
      notifications: dummy,
    };

    this.render();
  }

  template() {
    return `
    <button>
      <img src="${remove}" />
    </button>
    `;
  }
  render() {
    this.$container.insertAdjacentHTML('beforeend', this.template());
    this.state.notifications.forEach((noti) => new Notification(this.$container, noti));
  }
}

export default Notifications;
