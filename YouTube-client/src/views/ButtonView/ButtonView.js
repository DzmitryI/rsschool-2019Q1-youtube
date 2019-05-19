import App from '../../controllers/App';

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
    buttonFirstPage.value = '1';
    buttonFirstPage.style.visibility = 'hidden';
    elem.appendChild(buttonFirstPage);

    const PrevButton = this.form.createElement('input');
    PrevButton.type = 'button';
    PrevButton.id = 'buttonPrevPage';
    PrevButton.style.visibility = 'hidden';
    elem.appendChild(PrevButton);

    const carrentButton = this.form.createElement('input');
    carrentButton.type = 'button';
    carrentButton.id = 'buttonCarrentPage';
    carrentButton.value = '1';
    carrentButton.disabled = true;
    elem.appendChild(carrentButton);

    const NextButton = this.form.createElement('input');
    NextButton.type = 'button';
    NextButton.id = 'buttonNextPage';
    elem.appendChild(NextButton);

    this.form.body.appendChild(elem);

    return this.addEventListeners(elem);
  }

  addEventListeners(item) {
    const buttonFirstPage = this.form.getElementById('buttonFirstPage');
    buttonFirstPage.addEventListener('click', this.FirstPage.bind(this));

    const buttonPrevPage = this.form.getElementById('buttonPrevPage');
    buttonPrevPage.addEventListener('click', this.PrevPage.bind(this));

    const buttonNextPage = this.form.getElementById('buttonNextPage');
    buttonNextPage.addEventListener('click', this.NextPage.bind(this));
    return item;
  }

  FirstPage(event) {
    event.preventDefault();
    const appA = new App(this.form);
    appA.FirstPage();
  }

  PrevPage(event) {
    event.preventDefault();
    const appA = new App(this.form);
    appA.PrevPage();
  }

  NextPage(event) {
    event.preventDefault();
    const appA = new App(this.form);
    appA.NextPage();
  }
}
