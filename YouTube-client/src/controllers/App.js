import AppModel from '../models/AppModel';
import AppVideoId from '../models/AppVideoId';
import SearchView from '../views/SearchView';
// eslint-disable-next-line import/no-cycle
import SliderView from '../views/SliderView';
import ButtonView from '../views/ButtonView';

export default class App {
  constructor(state) {
    this.search = state;
    this.form = document;
  }

  async addSearch() {
    const inputId = this.form.getElementById('searchInput');
    const modelSearch = new AppVideoId(inputId.value);
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
    const buttonConteiner = this.form.getElementById('buttonConteiner');
    buttonConteiner.addEventListener('click', this.clickPage.bind(this));
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
    const searchButton = this.form.getElementById('searchButton');
    searchButton.addEventListener('click', this.addSearch.bind(this));
  }

  clickPage(event) {
    const slider = new SliderView(this.form);
    if (event.target.id === 'buttonNextPage') slider.NextPage();
    else if (event.target.id === 'buttonFirstPage') slider.firstPage();
    else if (event.target.id === 'buttonPrevPage') slider.PrevPage();
  }
}
