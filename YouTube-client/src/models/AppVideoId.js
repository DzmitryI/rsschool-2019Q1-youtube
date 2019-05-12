export default class AppVideoId {
  constructor(data) {
    this.data = data;
  }

  extractVideoId() {
    const videoId = this.data.items.map(item => item.id.videoId).join();
    return {
      url: `https://www.googleapis.com/youtube/v3/videos?key=AIzaSyDrnaIn3QeV0VRjaFqPtI9pentZEWQKFkA&id=${videoId}&part=snippet,statistics`,
    };
  }
}
