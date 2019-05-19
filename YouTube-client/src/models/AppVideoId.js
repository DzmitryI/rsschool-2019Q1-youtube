export default class AppVideoId {
  constructor(data, value) {
    this.data = data;
    this.value = value;
  }

  extractVideoId() {
    const videoId = this.data.items.map(item => item.id.videoId).join();
    return {
      url: `https://www.googleapis.com/youtube/v3/videos?key=AIzaSyDrnaIn3QeV0VRjaFqPtI9pentZEWQKFkA&id=${videoId}&part=snippet,statistics`,
    };
  }

  extractSearch() {
    const search = this.data;
    return {
      url: `https://www.googleapis.com/youtube/v3/search?key=AIzaSyDrnaIn3QeV0VRjaFqPtI9pentZEWQKFkA&type=video&part=snippet&maxResults=15&q=${search}`,
    };
  }

  extractNextPage() {
    return {
      url: `https://www.googleapis.com/youtube/v3/search?key=AIzaSyDrnaIn3QeV0VRjaFqPtI9pentZEWQKFkA&type=video&part=snippet&maxResults=15&q=${this.value}&pageToken=${this.data}`,
    };
  }
}
