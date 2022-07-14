import './index.scss';

import add from '@/assets/add.svg';
import remove from '@/assets/remove.svg';
import { $ } from '@/commons/utils/query-selector';
import TodoCard from '@/components/TodoCard/index';
import { TODOS_TITLE_MAP } from '@/constants/mapper';
import { createTodo, deleteTodo, updateTodo } from '@/libs/api';
import Component from '@/libs/Component';

class Todos extends Component {
  constructor($container, initialState) {
    super($container, initialState);

    this.currentActiveCard = null;
    this.render();
  }

  getTodosLength() {
    return this.state?.todos.length || 0;
  }

  getTodoType() {
    return this.state?.type || '';
  }

  handleCreate() {
    if (this.currentActiveCard) return;
    const todoContainer = $(`#${this.getTodoType()} .todos__todo-container`);
    const newCardInfo = TodoCard.createTodoCard();
    new TodoCard(todoContainer, newCardInfo, this.setTodos.bind(this));

    this.currentActiveCard = $(`#${this.getTodoType()} .card.active`);
  }

  setEvent() {
    const removeButton = $(`#${this.getTodoType()} .todos__btn-add-todo`);
    removeButton.addEventListener('click', this.handleCreate.bind(this));
  }

  setTodos(actionType, cardInfo) {
    const { type } = this.state;
    const targetTodoIndex = this.state.todos.findIndex((todo) => todo.id === cardInfo.id);
    switch (actionType) {
      case '등록':
        createTodo(type, cardInfo)
          .then((res) => res.json())
          .then(({ data: { id } }) => {
            this.setState({
              ...this.state,
              todos: [...this.state.todos, { ...cardInfo, id }],
            });
          });

        return;
      case '취소':
        this.currentActiveCard.remove();
        this.currentActiveCard = null;
        return;
      case '수정':
        if (targetTodoIndex === -1) return;
        const nextTodos = [
          ...this.state.todos.slice(0, targetTodoIndex),
          cardInfo,
          ...this.state.todos.slice(targetTodoIndex + 1),
        ];

        this.setState({ ...this.state, todos: nextTodos });
        updateTodo(cardInfo);
        return;
      case '삭제':
        const afterDeletionTodos = this.state.todos.filter((todo) => todo.id !== cardInfo.id);
        this.setState({ ...this.state, todos: afterDeletionTodos });
        deleteTodo(cardInfo.id);
        return;
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
    this.currentActiveCard = null;
    this.renderChildTodo();

    this.setEvent();
  }
}

export default Todos;
