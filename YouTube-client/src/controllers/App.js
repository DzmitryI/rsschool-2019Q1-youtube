import AppModel from '../models/AppModel';
import AppVideoId from '../models/AppVideoId';
// eslint-disable-next-line import/no-cycle
import SearchView from '../views/SearchView';
// eslint-disable-next-line import/no-cycle
import SliderView from '../views/SliderView';

export default class App {
  constructor(state) {
    // this.state = {
    //   url:
    //     'https://www.googleapis.com/youtube/v3/search?key=AIzaSyDrnaIn3QeV0VRjaFqPtI9pentZEWQKFkA&type=video&part=snippet&maxResults=15&q=js',
    // };
    this.search = state;
    this.nextPage = state;
  }

  async addTodo() {
    const modelSearch = new AppVideoId(this.search);
    const responseSearch = modelSearch.extractSearch();

    const model = new AppModel(responseSearch);
    const data = await model.getData();

    const modelVideoId = new AppVideoId(data);
    const response = modelVideoId.extractVideoId();

    const modelStatistic = new AppModel(response);
    const dataStatistic = await modelStatistic.getData();

    const slider = new SliderView(dataStatistic, data.nextPageToken);
    slider.render();
  }

  async NextToken() {
    const modelSearch = new AppVideoId(this.nextPage);
    const responseSearch = modelSearch.extractNextPege();
    const model = new AppModel(responseSearch);
    const data = await model.getData();

    const modelVideoId = new AppVideoId(data);
    const response = modelVideoId.extractVideoId();

    const modelStatistic = new AppModel(response);
    const dataStatistic = await modelStatistic.getData();

    const slider = new SliderView(dataStatistic, data.nextPageToken);
    slider.nextPage();
  }

  // eslint-disable-next-line class-methods-use-this
  start() {
    const search = new SearchView();
    search.render();
  }
}
