import AppModel from '../models/AppModel';
import AppVideoId from '../models/AppVideoId';

import SearchView from '../views/SearchView';

import SliderView from '../views/SliderView';

export default class App {
  constructor() {
    this.state = {
      url:
        'https://www.googleapis.com/youtube/v3/search?key=AIzaSyDrnaIn3QeV0VRjaFqPtI9pentZEWQKFkA&type=video&part=snippet&maxResults=15&q=js',
    };
  }

  async start() {
    const model = new AppModel(this.state);
    const data = await model.getData();

    const modelVideoId = new AppVideoId(data);
    const response = modelVideoId.extractVideoId();

    const modelStatistic = new AppModel(response);
    const dataStatistic = await modelStatistic.getData();
    const search = new SearchView();
    search.render();

    // const view = new AppView(data);
    // view.render();

    const slider = new SliderView(dataStatistic);
    slider.render();
  }
}
