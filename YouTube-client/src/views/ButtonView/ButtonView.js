export default class ButtonView {
  constructor() {
    this.form = document;
  }

  render() {
    const elem = this.form.createElement('div');
    elem.id = 'buttonConteiner';
    const buttonFirstPage = this.form.createElement('input');
    buttonFirstPage.type = 'button';
    buttonFirstPage.id = 'buttonFirstPage';
    elem.appendChild(buttonFirstPage);

    const PrevButton = this.form.createElement('input');
    PrevButton.type = 'button';
    PrevButton.id = 'buttonPrevPage';
    elem.appendChild(PrevButton);

    const carrentButton = this.form.createElement('input');
    carrentButton.type = 'button';
    carrentButton.id = 'buttonCarrentPage';
    carrentButton.value = '1';
    elem.appendChild(carrentButton);

    const NextButton = this.form.createElement('input');
    NextButton.type = 'button';
    NextButton.id = 'buttonNextPage';
    elem.appendChild(NextButton);
    // elem.appendChild(input);
    // input.innerHTML = this.serch;
    this.form.body.appendChild(elem);

    // return this.addEventListeners(elem);
  }

  // addEventListeners(item) {
  //   const buttonId = item.childNodes[0];
  //   buttonId.addEventListener('click', this.handleAdd.bind(this));
  //   return item;
  // }

  // handleAdd(event) {
  //   event.preventDefault();
  //   const inputId = this.form.getElementById('search-id');
  //   const appA = new App(inputId.value);
  //   appA.addTodo();
  // }
}
