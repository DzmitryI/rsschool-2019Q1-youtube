export default class AppModel {
  constructor(state) {
    this.state = state;
  }

  static extractSnippet(data) {
    return data.items.map(clip => clip.snippet);
  }

  async getClipNames() {
    const { url } = this.state;

    const responce = await fetch(url);
    const data = await responce.json();
    console.log(data);
    return AppModel.extractSnippet(data);
    // fetch(url)
    //   .then(res => res.json())
    //   .then(res => console.log(res));
  }
}
