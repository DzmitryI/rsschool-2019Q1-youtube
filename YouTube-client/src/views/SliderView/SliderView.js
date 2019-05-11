export default class SliderView {
  constructor(titles) {
    this.titles = titles;
  }

  render() {
    const doc = document;
    const elem = doc.createElement('div');
    elem.id = 'wrapper';
    const content = document.createElement('ul');
    const N = this.titles.length;
    content.innerHTML = this.titles.map(title => `<li>${title}</li>`).join('');
    content.style.setProperty('--n', this.titles.length);

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
