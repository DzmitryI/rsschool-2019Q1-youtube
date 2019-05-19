/* eslint-disable indent */
// eslint-disable-next-line import/no-cycle
import App from '../../controllers/App';

export default class SliderView {
  constructor(snippet, nextPageToken) {
    this.form = document;
    this.snippet = snippet;
    this.nextPageToken = nextPageToken;
  }

  nextPage() {
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

  render() {
    const wrapper = this.form.getElementById('SliderView');
    if (wrapper) wrapper.parentElement.removeChild(wrapper);
    const elem = this.form.createElement('div');
    elem.id = 'SliderView';
    const content = document.createElement('ul');
    content.id = 'list';
    // eslint-disable-next-line prefer-destructuring
    const nextPageToken = this.nextPageToken;
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
    let flagNewPage = false;

    function move(e) {
      const widthWrapper = this.parentNode.offsetWidth;
      // eslint-disable-next-line max-len
      N = this.children.length;
      let count = 0;
      if (widthWrapper >= 1430) count = 4;
      else if (widthWrapper >= 1070) count = 3;
      else if (widthWrapper >= 720) count = 2;
      else count = 1;
      const pageCount = Math.floor(N / count) - 1;
      if ((pageCount - i === 1) && flagNewPage === false) {
        const appA = new App(nextPageToken);
        appA.NextToken();
        flagNewPage = true;
      }
      if (x0 || x0 === 0) {
        const dx = unify(e).clientX - x0;
        const s = Math.sign(dx);

        if ((i > 0 || s < 0) && (i < N - 1 || s > 0)) {
          content.style.setProperty('--i', (i -= s));
        }
        const carrentButton = document.getElementById('buttonCarrentPage');
        carrentButton.value = i + 1;
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

    // this.titles.map(title => `<p>${title}</p>`).join('');
    elem.appendChild(content);
    this.form.body.appendChild(elem);
  }
}
