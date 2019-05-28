export default class SearchView {
  constructor() {
    this.form = document;
  }

  render() {
    const elem = this.form.createElement('div');
    elem.id = 'searchConteiner';
    elem.innerHTML = '<button type = \'button\' id = \'searchButton\'></button><input placeholder = \'Search Here\' id = \'searchInput\' type = \'search\' >';
    this.form.body.appendChild(elem);
  }
}
