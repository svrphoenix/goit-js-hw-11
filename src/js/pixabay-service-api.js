import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34471861-e8084534cfe7ae4300b245128';

export class PixabayApiService {
  constructor() {
    this.searchName = '';
    this.page = 1;
  }

  async readPixabayImages() {
    const options = {
      params: {
        key: API_KEY,
        q: this.searchName,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: this.page,
        per_page: 40,
      },
    };
    const response = await axios.get(BASE_URL, options);
    return response.data;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchName;
  }

  set query(newQuery) {
    this.searchName = newQuery;
  }
}