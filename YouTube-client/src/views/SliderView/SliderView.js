export default class SliderView {
  constructor(snippet) {
    this.snippet = snippet;
  }

  render() {
    const doc = document;
    const elem = doc.createElement('div');
    // const img = doc.createElement('img');
    elem.id = 'wrapper';
    const content = document.createElement('ul');
    const N = this.snippet.items.length;
    content.innerHTML = this.snippet.items
      .map(
        item => `<li><img src=${
          item.snippet.thumbnails.high.url
        }><p id='title'><a href='https://www.youtube.com/watch?v=${
          item.id
        }' target="_blank">${item.snippet.title}</a></p><p id='channel'>${
          item.snippet.channelTitle
        }</p><p id='data'>${item.snippet.publishedAt.slice(
          0,
          10,
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
      if (x0 || x0 === 0) {
        const dx = unify(e).clientX - x0;
        const s = Math.sign(dx);

        if ((i > 0 || s < 0) && (i < N - 1 || s > 0)) {
          content.style.setProperty('--i', (i -= s));
        }

        x0 = null;
      }
    }

    content.addEventListener('mousedown', lock, false);
    content.addEventListener('touchstart', lock, false);

    content.addEventListener('mouseup', move, false);
    content.addEventListener('touchend', move, false);

    // this.titles.map(title => `<p>${title}</p>`).join('');
    elem.appendChild(content);
    doc.body.appendChild(elem);
  }
}
