import './app.scss';

import Component from '@/libs/Component';

class App extends Component {
  constructor($container) {
    super($container);
    this.render();
  }

  template() {
    return `
      <main class="main-page">
        <nav>
          <h1>TO-DO LIST</h1>
          <button class="btn-toggle-sidebar">
            햄
          </button>
        </nav>
        <section class="todos-container"></section>
        <aside class="notifications"></aside>
      </main>
    `;
  }

  render() {
    this.$container.innerHTML = this.template();
  }
}

export default App;
