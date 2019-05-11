import AppModel from '../models/AppModel';
// import AppView from '../views/AppView/index';

import SearchView from '../views/SearchView';

import SliderView from '../views/SliderView';

export default class App {
  constructor() {
    this.state = {
      url:
        // eslint-disable-next-line comma-dangle
        'https://www.googleapis.com/youtube/v3/search?key=AIzaSyDrnaIn3QeV0VRjaFqPtI9pentZEWQKFkA&type=video&part=snippet&maxResults=15&q=js'
    };
  }

  async start() {
    const model = new AppModel(this.state);
    const data = await model.getClipNames();

    const search = new SearchView();
    search.render();

    // const view = new AppView(data);
    // view.render();

    const slider = new SliderView(data);
    slider.render();
  }
}
