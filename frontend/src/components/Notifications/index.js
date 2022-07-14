import remove from '@/assets/remove.svg';
import { $ } from '@/commons/utils/query-selector';
import Notification from '@/components/Notification/index';
import Component from '@/libs/Component';

class Notifications extends Component {
  constructor($container, initialState, setNotificationsOpenState) {
    super($container, initialState);

    this.isMount = false;
    this.dummy = [
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
    this.setNotificationsOpenState = setNotificationsOpenState;
    this.state = {
      ...this.state,
      // notifications: dummy,
    };

    this.render();
  }

  setCloseNotifications() {
    this.setNotificationsOpenState({
      isOpenNotifications: false,
    });
  }

  closeNotifications() {
    const $notifications = $('.notifications');
    $notifications.classList.remove('open');
    $notifications.classList.add('close');
  }

  openNotifications() {
    const $notifications = $('.notifications');
    $notifications.classList.add('open');
    $notifications.classList.remove('close');
  }

  setEvent() {
    const sidebarToggleBtn = $('#btnCloseSideBar');
    sidebarToggleBtn.addEventListener('click', this.setCloseNotifications.bind(this));
  }

  toggleNotifications(isOpenNotifications) {
    const $notifications = $('.notifications');
    if (!isOpenNotifications && !$notifications.classList.contains('open')) {
      return;
    }
    isOpenNotifications ? this.openNotifications() : this.closeNotifications();
  }

  template() {
    return `
    <button id="btnCloseSideBar">
      <img src="${remove}" />
    </button>
    `;
  }
  render() {
    if (!this.isMount) {
      this.isMount = true;
      this.$container.insertAdjacentHTML('beforeend', this.template());
      this.dummy.forEach((noti) => new Notification(this.$container, noti));
      this.setEvent();
      this.toggleNotifications();
    }
  }
}

export default Notifications;
