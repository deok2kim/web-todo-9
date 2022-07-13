import './index.scss';

import add from '@/assets/add.svg';
import remove from '@/assets/remove.svg';
import { $ } from '@/commons/utils/query-selector';
import TodoCard from '@/components/TodoCard/index';
import { TODOS_TITLE_MAP } from '@/constants/mapper';
import Component from '@/libs/Component';

/**
 * @Todos state
 *
 * id: number;
 * title: string;
 * body: string;
 * author: string;
 * type: 'done' | 'onProgress' | 'todo';
 * order: number;
 */

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

  template() {
    return `
        <section class="todos" id="${this.getTodoType()}">
					<div class="todos__header">
							<div>
								<h2 class="todos__title">${TODOS_TITLE_MAP[this.getTodoType()]}</h2> 
								<div class="todos__todo-count">${this.getTodosLength()}</div>
							</div>
							<div class="todos__button-wrapper">
								<button>
									<img src=${add} alt="add-todo" />
								</button>
								<button>
									<img src=${remove} alt="remove-todo" />
								</button>
							</div>
            </div>
            <div class="todos__todo-container"></div>
        </section>
    `;
  }

  render() {
    this.$container.insertAdjacentHTML('beforeend', this.template());
    const todoContainer = $(`#${this.getTodoType()} .todos__todo-container`);
    this.state.todos.forEach(
      (todo) => new TodoCard(todoContainer, { inputs: todo, cardStatus: 'idle' }),
    );
  }
}

export default Todos;
