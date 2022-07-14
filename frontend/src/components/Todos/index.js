import './index.scss';

import add from '@/assets/add.svg';
import remove from '@/assets/remove.svg';
import { $ } from '@/commons/utils/query-selector';
import TodoCard from '@/components/TodoCard/index';
import { TODOS_TITLE_MAP, TODOS_TYPE_MAP } from '@/constants/mapper';
import { createTodo, deleteTodo, updateTodo } from '@/libs/api';
import Component from '@/libs/Component';

class Todos extends Component {
  constructor($container, initialState, setTodosList) {
    super($container, initialState);

    this.currentActiveCard = null;
    this.setTodosList = setTodosList;
    this.render();
  }

  get todos() {
    return this.state[TODOS_TYPE_MAP[this.$container.id]].todos;
  }

  get type() {
    return this.state[TODOS_TYPE_MAP[this.$container.id]].type;
  }

  get length() {
    return this.todos.length;
  }

  setOwnTodosState(nextOwnTodosState) {
    this.setTodosList((prevTodosList) => {
      const ownTodos = [...prevTodosList];
      ownTodos[TODOS_TYPE_MAP[this.$container.id]] = { type: this.type, todos: nextOwnTodosState };
      return ownTodos;
    });
  }

  handleCreate() {
    if (this.currentActiveCard) return;
    const todoContainer = $(`#${this.type} .todos__todo-container`);
    const newCardInfo = TodoCard.createTodoCard();
    new TodoCard(todoContainer, newCardInfo, this.handleTodosAction.bind(this));

    this.currentActiveCard = $(`#${this.type} .card.active`);
  }

  setEvent() {
    const removeButton = $(`#${this.type} .todos__btn-add-todo`);
    removeButton.addEventListener('click', this.handleCreate.bind(this));
  }

  handleTodosAction(actionType, cardInfo) {
    switch (actionType) {
      case '등록':
        createTodo(this.type, cardInfo)
          .then((res) => res.json())
          .then(({ data: { id } }) => {
            this.setOwnTodosState([...this.todos, { ...cardInfo, id }]);
          });

        return;
      case '취소':
        this.currentActiveCard.remove();
        this.currentActiveCard = null;
        return;
      case '수정':
        const targetTodoIndex = this.todos.findIndex((todo) => todo.id === cardInfo.id);
        if (targetTodoIndex === -1) return;
        const nextTodos = [
          ...this.todos.slice(0, targetTodoIndex),
          cardInfo,
          ...this.todos.slice(targetTodoIndex + 1),
        ];

        this.setOwnTodosState(nextTodos);
        updateTodo(cardInfo);
        return;
      case '삭제':
        const afterDeletionTodos = this.todos.filter((todo) => todo.id !== cardInfo.id);
        this.setOwnTodosState(afterDeletionTodos);
        deleteTodo(cardInfo.id);
        return;
    }
  }

  template() {
    return `
        <div class="todos__header">
          <div>
            <h2 class="todos__title">${TODOS_TITLE_MAP[this.type]}</h2> 
            <div class="todos__todo-count">${this.length}</div>
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
    const todoContainer = $(`#${this.type} .todos__todo-container`);
    this.todos.forEach(
      (todo) =>
        new TodoCard(
          todoContainer,
          { cardInfo: todo, cardStatus: 'idle' },
          this.handleTodosAction.bind(this),
        ),
    );
  }

  render() {
    this.$container.innerHTML = this.template();
    this.currentActiveCard = null;
    this.renderChildTodo();

    this.setEvent();
  }
}

export default Todos;
