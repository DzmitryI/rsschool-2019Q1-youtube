// eslint-disable-next-line import/no-cycle
import App from '../../controllers/App';

export default class SearchView {
  constructor() {
    this.form = document;
  }

  render() {
    const elem = this.form.createElement('div');
    elem.id = 'searchConteiner';
    const input = this.form.createElement('input');
    const button = this.form.createElement('button');
    input.placeholder = 'Search Here';
    input.id = 'searchInput';
    input.type = 'search';
    button.type = 'button';
    button.id = 'searchButton';
    button.accessKey = '13';
    elem.appendChild(button);
    elem.appendChild(input);
    input.innerHTML = this.serch;
    this.form.body.appendChild(elem);

    return this.addEventListeners(elem);
  }

  addEventListeners(item) {
    const buttonId = item.childNodes[0];
    buttonId.addEventListener('click', this.handleAdd.bind(this));
    return item;
  }

  handleAdd(event) {
    event.preventDefault();
    const inputId = this.form.getElementById('searchInput');
    const appA = new App(inputId.value);
    appA.addTodo();
  }
}
