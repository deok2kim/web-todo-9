import './index.scss';

import add from '@/assets/add.svg';
import remove from '@/assets/remove.svg';
import Component from '@/libs/Component';

class Todos extends Component {
  constructor($container, initialState) {
    super($container, initialState);
    this.render();
  }

  template() {
    const todosSection = document.createElement('section');
    todosSection.className = 'todos';

    todosSection.innerHTML = `
        <section class="todos">
					<div class="todos__header">
							<div>
								<h2 class="todos__title"></h2> 
								<span class="todos__todo-count"></span>
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
						<ul>
							${this.state.todos.map(
                (todo) =>
                  `
									<li>
										<h4>${todo.title}</h4>
									</li>
								`,
              )}
						</ul>
        </section>
    `;

    return todosSection;
  }

  render() {
    this.$container.appendChild(this.template());
  }
}

export default Todos;
