export default class ButtonView {
  constructor(nextPageToken) {
    this.form = document;
    this.nextPageToken = nextPageToken;
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
    NextButton.name = this.nextPageToken;
    elem.appendChild(NextButton);

    this.form.body.appendChild(elem);
  }
}
