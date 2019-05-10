export default class SearchView {
  constructor(search) {
    this.search = search;
  }

  render() {
    const doc = document;
    const elem = doc.createElement('div');
    const input = doc.createElement('input');
    const button = doc.createElement('button');
    input.placeholder = 'Search Here';
    input.id = 'search';
    input.type = 'search';
    // input.value = this.search;
    button.type = 'submit';
    elem.appendChild(button);
    elem.appendChild(input);
    input.innerHTML = this.serch;
    doc.body.appendChild(elem);
  }
}
