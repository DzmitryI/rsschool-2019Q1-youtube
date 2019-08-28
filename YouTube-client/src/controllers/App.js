import AppModel from '../models/AppModel';
import AppVideoId from '../models/AppVideoId';
import SearchView from '../views/SearchView';
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
    const ListConteiner = this.form.getElementById('list');
    ListConteiner.addEventListener('mouseup', this.ListConteiner.bind(this));

    const buttonView = new ButtonView(data.nextPageToken);
    buttonView.render();
    const buttonConteiner = this.form.getElementById('buttonConteiner');
    buttonConteiner.addEventListener('click', this.clickPage.bind(this));
  }

  ListConteiner() {
    const widthWrapper = this.form.getElementById('SliderView').offsetWidth;
    const carrentButton = this.form.getElementById('buttonCarrentPage');
    const { value } = carrentButton;
    const content = this.form.getElementById('list');
    const N = content.children.length;
    let count = 0;
    if (widthWrapper >= 1430) count = 4;
    else if (widthWrapper >= 1070) count = 3;
    else if (widthWrapper >= 720) count = 2;
    else count = 1;
    const pageCount = Math.floor(N / count);
    if (pageCount - Number(value) === 1) {
      this.NextToken();
    }
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
    if (event.target.id === 'buttonNextPage') {
      this.ListConteiner();
      slider.NextPage();
    } else if (event.target.id === 'buttonFirstPage') slider.firstPage();
    else if (event.target.id === 'buttonPrevPage') slider.PrevPage();
  }
}
