export default class AppModel {
  constructor(state) {
    this.state = state;
  }

  async getData() {
    const { url } = this.state;
    const responce = await fetch(url);
    const data = await responce.json();
    return data;
  }
}
