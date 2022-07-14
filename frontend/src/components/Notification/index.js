import '@/components/Notification/index.scss';

import user from '@/assets/user.svg';
import ago from '@/commons/utils/ago';
import { ACTION_MAPPER } from '@/constants/mapper';
import Component from '@/libs/Component';

class Notification extends Component {
  constructor($container, initialState) {
    super($container, initialState);
    this.render();
  }

  setAgo(createdAt) {
    return ago(createdAt);
  }

  setText(todoLogData) {
    const obj = {};
    const { action } = todoLogData;
    Object.entries(todoLogData).forEach(([key, value]) => Object.assign(obj, { [key]: `<b>${value}</b>` }));
    const { prevTitle, nextTitle, prevType, nextType } = obj;

    switch (action) {
      case 'add':
        return `${nextType}에 ${nextTitle}을/를 ${ACTION_MAPPER[action]}하였습니다.`;
      case 'delete':
        return `${nextTitle}을/를 ${ACTION_MAPPER[action]}하였습니다.`;
      case 'update':
        return `${prevTitle}을/를 ${nextTitle}(으)로 ${ACTION_MAPPER[action]}하였습니다.`;
      case 'move':
        return `${nextTitle}을/를 ${prevType}에서 ${nextType}으로 ${ACTION_MAPPER[action]}하였습니다.`;
      default:
        `알 수 없는 오류`;
        return;
    }
  }

  template() {
    const { author, action, payload, createdAt, title, type } = this.state;
    return `
    <div class="noti">
      <img src="${user}" />
      <div class="noti__info-wrapper">
        <p class="noti__username">@${author}</p>
        <p class="noti__action">${this.setText({
          action,
          ...payload,
          nextTitle: title,
          nextType: type,
        })}</p>
        <p class="noti__time">${this.setAgo(createdAt)}</p>
      </div>
    </div>
    `;
  }
  render() {
    this.$container.insertAdjacentHTML('beforeend', this.template());
  }
}

export default Notification;
