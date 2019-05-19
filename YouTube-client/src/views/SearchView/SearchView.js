// eslint-disable-next-line import/no-cycle
import App from '../../controllers/App';

export default class SearchView {
  constructor() {
    this.form = document;
  }

  render() {
    const elem = this.form.createElement('div');
    elem.id = 'search-div';
    const input = this.form.createElement('input');
    const button = this.form.createElement('button');
    input.placeholder = 'Search Here';
    input.id = 'search-id';
    input.type = 'search';
    button.type = 'submit';
    button.id = 'button-id';
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
    const inputId = this.form.getElementById('search-id');
    const appA = new App(inputId.value);
    appA.addTodo();
  }
}
