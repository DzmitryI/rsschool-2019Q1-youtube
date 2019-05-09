export default class AppModel {
  constructor(state) {
    this.state = state;
  }

  static extractClipNamas(data) {
    return data.items.map(clip => clip.snippet.title);
  }

  async getClipNames() {
    const { url } = this.state;

    const responce = await fetch(url);
    const data = await responce.json();

    return AppModel.extractClipNamas(data);
    // fetch(url)
    //   .then(res => res.json())
    //   .then(res => console.log(res));
  }
}
