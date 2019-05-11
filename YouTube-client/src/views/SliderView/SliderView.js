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
    const N = this.snippet.length;
    content.innerHTML = this.snippet
      .map(
        item => `<li><img src=${item.thumbnails.high.url}><p id='title'><span>${
          item.title
        }</span></p><p id='channel'>${
          item.channelTitle
        }</p><p id='data'>${item.publishedAt.slice(
          0,
          10,
        )}</p><p id='description'>${item.description}</p></li>`,
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
