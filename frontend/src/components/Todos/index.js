import './index.scss';

import add from '@/assets/add.svg';
import remove from '@/assets/remove.svg';
import { $ } from '@/commons/utils/query-selector';
import TodoCard from '@/components/TodoCard/index';
import { TODOS_TITLE_MAP } from '@/constants/mapper';
import { createTodo } from '@/libs/api';
import Component from '@/libs/Component';

class Todos extends Component {
  constructor($container, initialState) {
    super($container, initialState);
    this.render();
  }

  getTodosLength() {
    return this.state?.todos.length || 0;
  }

  getTodoType() {
    return this.state?.type || '';
  }

  handleCreate() {
    const currentActiveCard = $(`#${this.getTodoType()} .card.active`);
    if (currentActiveCard) return;

    const todoContainer = $(`#${this.getTodoType()} .todos__todo-container`);
    const newCardInfo = TodoCard.createTodoCard();
    new TodoCard(todoContainer, newCardInfo, this.setTodos.bind(this));
  }

  setEvent() {
    const removeButton = $(`#${this.getTodoType()} .todos__btn-add-todo`);
    removeButton.addEventListener('click', this.handleCreate.bind(this));
  }

  setTodos(actionType, cardInfo) {
    const { type } = this.state;
    switch (actionType) {
      case '등록':
        this.setState({ ...this.state, todos: [...this.state.todos, cardInfo] });
        createTodo(type, cardInfo);
        break;
    }
  }

  template() {
    return `
        <div class="todos__header">
          <div>
            <h2 class="todos__title">${TODOS_TITLE_MAP[this.getTodoType()]}</h2> 
            <div class="todos__todo-count">${this.getTodosLength()}</div>
          </div>
          <div class="todos__button-wrapper">
            <button class="todos__btn-add-todo">
              <img src=${add} alt="add-todo" />
            </button>
            <button>
              <img src=${remove} alt="remove-todo" />
            </button>
          </div>
        </div>
        <div class="todos__todo-container"></div>
    `;
  }

  renderChildTodo() {
    const todoContainer = $(`#${this.getTodoType()} .todos__todo-container`);
    this.state.todos.forEach(
      (todo) =>
        new TodoCard(
          todoContainer,
          { cardInfo: todo, cardStatus: 'idle' },
          this.setTodos.bind(this),
        ),
    );
  }

  render() {
    this.$container.innerHTML = this.template();
    this.renderChildTodo();

    this.setEvent();
  }
}

export default Todos;
