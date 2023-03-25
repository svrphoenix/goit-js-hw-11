import { Notify } from 'notiflix/build/notiflix-notify-aio';
import refs from './refs';
import renderGallery from './markup-service';
import PixabayApiService from './pixabay-service-api';

const pixabayApiService = new PixabayApiService();

export function loadInitialization(searchQuery) {
  pixabayApiService.query = searchQuery;
  pixabayApiService.resetPage();
};


export async function loadImages() {
  const { gallery, loadMoreBtn } = refs;

  try {
    const imagesObject = await pixabayApiService.readPixabayImages();
    const imagesArray = imagesObject.hits;

    if (imagesArray.length === 0) {
      Notify.warning('Sorry, there are no images matching your search query. Please try again.');
      return;
    }

    if (pixabayApiService.page === 1) Notify.info(`Hooray! We found ${imagesObject.totalHits} images.`);

    renderGallery(imagesArray, gallery);
    pixabayApiService.incrementPage();

    const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 0.25,
      behavior: 'smooth',
    });

    if (imagesArray.length < 40) {
      loadMoreBtn.classList.add('visually-hidden');
      Notify.info("We're sorry, but you've reached the end of search results.");
    } else {
      loadMoreBtn.classList.remove('visually-hidden');
    }
  } catch (error) {
    return Notify.failure(`Error on server: ${error}. Please, repeat query.`);
  }
}