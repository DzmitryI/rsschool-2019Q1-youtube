// eslint-disable-next-line import/no-cycle
import AppModel from '../models/AppModel';
import AppVideoId from '../models/AppVideoId';
// eslint-disable-next-line import/no-cycle
import SearchView from '../views/SearchView';
// eslint-disable-next-line import/no-cycle
import SliderView from '../views/SliderView';
// eslint-disable-next-line import/no-cycle
import ButtonView from '../views/ButtonView';

export default class App {
  constructor(state) {
    this.search = state;
    this.form = document;
  }


  async addSearch() {
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

    const buttonView = new ButtonView(data.nextPageToken);
    buttonView.render();
  }

  async NextToken() {
    const { value } = this.form.getElementById('searchInput');
    const buttonNextPage = this.form.getElementById('buttonNextPage');
    const nextPageToken = buttonNextPage.name;
    const modelSearch = new AppVideoId(nextPageToken, value);
    const responseSearch = modelSearch.extractNextPage();
    const model = new AppModel(responseSearch);
    const data = await model.getData();
    buttonNextPage.name = data.nextPageToken;
    const modelVideoId = new AppVideoId(data);
    const response = modelVideoId.extractVideoId();

    const modelStatistic = new AppModel(response);
    const dataStatistic = await modelStatistic.getData();

    const slider = new SliderView(dataStatistic);
    slider.nextRequest();
  }

  start() {
    const search = new SearchView(this.form);
    search.render();
  }

  FirstPage() {
    const slider = new SliderView(this.form);
    slider.firstPage();
  }

  PrevPage() {
    const slider = new SliderView(this.form);
    slider.PrevPage();
  }

  NextPage() {
    const slider = new SliderView(this.form);
    slider.NextPage();
  }
}
