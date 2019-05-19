// eslint-disable-next-line import/no-cycle
import App from '../../controllers/App';

export default class SliderView {
  constructor(snippet) {
    this.form = document;
    this.snippet = snippet;
  }

  nextRequest() {
    const content = this.form.getElementById('list');
    for (let i = 0; i < this.snippet.items.length; i += 1) {
      const newLi = document.createElement('li');
      newLi.innerHTML = `<img src=${
        this.snippet.items[i].snippet.thumbnails.high.url
      }><p id='title'><a href='https://www.youtube.com/watch?v=${
        this.snippet.items[i].id
      }' target="_blank">${this.snippet.items[i].snippet.title}</a></p><p id='channel'>${
        this.snippet.items[i].snippet.channelTitle
      }</p><p id='data'>${this.snippet.items[i].snippet.publishedAt.slice(
        0, 10,
      )}</p><p id='eye'>${
        this.snippet.items[i].statistics.viewCount
      }</p><p id='description'>${this.snippet.items[0].snippet.description}</p>`;
      content.appendChild(newLi);
    }
  }

  firstPage() {
    const content = this.form.getElementById('list');
    content.style.setProperty('--i', 0);
    const carrentButton = this.form.getElementById('buttonCarrentPage');
    carrentButton.value = 1;
    const buttonFirstPage = this.form.getElementById('buttonFirstPage');
    const buttonPrevPage = this.form.getElementById('buttonPrevPage');
    buttonFirstPage.style.visibility = 'hidden';
    buttonPrevPage.style.visibility = 'hidden';
  }

  PrevPage() {
    const carrentButton = this.form.getElementById('buttonCarrentPage');
    const content = this.form.getElementById('list');
    const { value } = carrentButton;
    if (Number(value) - 1 === 1) {
      const buttonFirstPage = this.form.getElementById('buttonFirstPage');
      const buttonPrevPage = this.form.getElementById('buttonPrevPage');
      buttonFirstPage.style.visibility = 'hidden';
      buttonPrevPage.style.visibility = 'hidden';
    }
    content.style.setProperty('--i', Number(value) - 2);
    carrentButton.value = Number(value) - 1;
  }

  NextPage() {
    const carrentButton = this.form.getElementById('buttonCarrentPage');
    const content = this.form.getElementById('list');
    const { value } = carrentButton;
    if (Number(value) === 1) {
      const buttonFirstPage = this.form.getElementById('buttonFirstPage');
      const buttonPrevPage = this.form.getElementById('buttonPrevPage');
      buttonFirstPage.style.visibility = 'visible';
      buttonPrevPage.style.visibility = 'visible';
    }

    const widthWrapper = this.form.getElementById('SliderView').offsetWidth;
    const N = content.children.length;
    let count = 0;
    if (widthWrapper >= 1430) count = 4;
    else if (widthWrapper >= 1070) count = 3;
    else if (widthWrapper >= 720) count = 2;
    else count = 1;
    const pageCount = Math.floor(N / count);
    if (pageCount - Number(value) === 1) {
      const appA = new App();
      appA.NextToken();
    }
    content.style.setProperty('--i', value);
    carrentButton.value = Number(value) + 1;
  }

  render() {
    const wrapper = this.form.getElementById('SliderView');
    const buttonConteiner = this.form.getElementById('buttonConteiner');
    if (wrapper) wrapper.parentElement.removeChild(wrapper);
    if (buttonConteiner) buttonConteiner.parentElement.removeChild(buttonConteiner);
    const elem = this.form.createElement('div');
    elem.id = 'SliderView';
    const content = document.createElement('ul');
    content.id = 'list';
    let N = this.snippet.items.length;
    content.innerHTML = this.snippet.items
      .map(
        item => `<li><img src=${
          item.snippet.thumbnails.high.url
        }><p id='title'><a href='https://www.youtube.com/watch?v=${
          item.id
        }' target="_blank">${item.snippet.title}</a></p><p id='channel'>${
          item.snippet.channelTitle
        }</p><p id='data'>${item.snippet.publishedAt.slice(
          0, 10,
        )}</p><p id='eye'>${
          item.statistics.viewCount
        }</p><p id='description'>${item.snippet.description}</p></li>`,
      )
      .join('');
    content.style.setProperty('--n', N);
    let x0 = null;

    function unify(e) {
      return e.changedTouches ? e.changedTouches[0] : e;
    }

    function lock(e) {
      x0 = unify(e).clientX;
    }
    let i = 0;

    function move(e) {
      const widthWrapper = this.parentNode.offsetWidth;
      N = this.children.length;
      let count = 0;
      if (widthWrapper >= 1430) count = 4;
      else if (widthWrapper >= 1070) count = 3;
      else if (widthWrapper >= 720) count = 2;
      else count = 1;
      const pageCount = Math.floor(N / count) - 1;
      if (pageCount - i === 1) {
        const appA = new App();
        appA.NextToken();
      }
      if (x0 || x0 === 0) {
        const dx = unify(e).clientX - x0;
        const s = Math.sign(dx);
        const carrentButton = document.getElementById('buttonCarrentPage');
        if (i !== Number(carrentButton.value) - 1) i = Number(carrentButton.value) - 1;
        if ((i > 0 || s < 0) && (i < N - 1 || s > 0)) {
          content.style.setProperty('--i', (i -= s));
        }
        carrentButton.value = i + 1;
        if (i > 0) {
          const buttonFirstPage = document.getElementById('buttonFirstPage');
          const buttonPrevPage = document.getElementById('buttonPrevPage');
          buttonFirstPage.style.visibility = 'visible';
          buttonPrevPage.style.visibility = 'visible';
        } else {
          const buttonFirstPage = document.getElementById('buttonFirstPage');
          const buttonPrevPage = document.getElementById('buttonPrevPage');
          buttonFirstPage.style.visibility = 'hidden';
          buttonPrevPage.style.visibility = 'hidden';
        }
        x0 = null;
      }
    }

    function drag(e) {
      e.preventDefault();
      if (x0 || x0 === 0) {
        content.style.setProperty('--tx', `${Math.round(unify(e).clientX - x0)}px`);
      }
    }

    content.addEventListener('mousedown', lock, false);
    content.addEventListener('touchstart', lock, false);

    content.addEventListener('mouseup', move, false);
    content.addEventListener('touchend', move, false);

    content.addEventListener('mousemove', drag, false);
    content.addEventListener('touchmove', drag, false);

    elem.appendChild(content);
    this.form.body.appendChild(elem);
  }
}
