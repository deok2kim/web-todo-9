import remove from '@/assets/remove.svg';
import { $ } from '@/commons/utils/query-selector';
import Notification from '@/components/Notification/index';
import { getNotifications } from '@/libs/api';
import Component from '@/libs/Component';

class Notifications extends Component {
  constructor($container, initialState, setNotificationsOpenState) {
    super($container, initialState);

    this.isMount = false;
    this.setNotificationsOpenState = setNotificationsOpenState;
    this.render();
  }

  refetch() {
    const $notificationsContainer = $('.notifications');
    while ($notificationsContainer.childNodes.length > 3) {
      $notificationsContainer.removeChild($notificationsContainer.lastChild);
    }
    this.fetchNotifications();
  }

  fetchNotifications() {
    getNotifications()
      .then((res) => res.json())
      .then((data) => {
        const notifications = data.data;
        this.setState({ notifications });
        this.state.notifications.forEach((noti) => new Notification(this.$container, noti));
      });
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
      this.fetchNotifications();

      this.setEvent();
      this.toggleNotifications();
    }
  }
}

export default Notifications;
