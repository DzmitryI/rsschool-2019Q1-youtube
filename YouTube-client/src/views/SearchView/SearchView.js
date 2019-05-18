// eslint-disable-next-line import/no-unresolved
// eslint-disable-next-line import/no-cycle
import App from '../../controllers/App';

export default class SearchView {
  constructor() {
    this.form = document;
  }

  render() {
    const doc = document;
    const elem = doc.createElement('div');
    elem.id = 'search-div';
    const input = doc.createElement('input');
    const button = doc.createElement('button');
    input.placeholder = 'Search Here';
    input.id = 'search-id';
    input.type = 'search';
    button.type = 'submit';
    button.id = 'button-id';
    elem.appendChild(button);
    elem.appendChild(input);
    input.innerHTML = this.serch;
    doc.body.appendChild(elem);

    return this.addEventListeners(elem);
  }

  addEventListeners(item) {
    const buttonId = item.childNodes[0];
    buttonId.addEventListener('click', this.handleAdd.bind(this));
    return item;
  }

  // eslint-disable-next-line class-methods-use-this
  handleAdd(event) {
    event.preventDefault();
    const inputId = document.getElementById('search-id');
    const appA = new App(inputId.value);
    appA.addTodo();
  }
}
