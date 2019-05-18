import AppModel from '../models/AppModel';
import AppVideoId from '../models/AppVideoId';
// eslint-disable-next-line import/no-cycle
import SearchView from '../views/SearchView';
import SliderView from '../views/SliderView';

export default class App {
  constructor(search) {
    this.state = {
      url:
        'https://www.googleapis.com/youtube/v3/search?key=AIzaSyDrnaIn3QeV0VRjaFqPtI9pentZEWQKFkA&type=video&part=snippet&maxResults=15&q=js',
    };
    this.search = search;
  }

  async addTodo() {
    console.log(this.search);
    const modelSearch = new AppVideoId(this.search);
    const responseSearch = modelSearch.extractSearch();

    const model = new AppModel(responseSearch);
    const data = await model.getData();

    const modelVideoId = new AppVideoId(data);
    const response = modelVideoId.extractVideoId();

    const modelStatistic = new AppModel(response);
    const dataStatistic = await modelStatistic.getData();

    const slider = new SliderView(dataStatistic);
    slider.render();
  }

  // eslint-disable-next-line class-methods-use-this
  start() {
    // const model = new AppModel(this.state);
    // const data = await model.getData();

    // const modelVideoId = new AppVideoId(data);
    // const response = modelVideoId.extractVideoId();

    // const modelStatistic = new AppModel(response);
    // const dataStatistic = await modelStatistic.getData();
    const search = new SearchView();
    search.render();
    // this.onClickGetButton = search.onClickGetButton;

    // const slider = new SliderView(dataStatistic);
    // slider.render();
  }
}
