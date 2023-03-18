import './css/style.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { PixabayApiService } from './js/pixabay-service-api';

const pixabayApiService = new PixabayApiService();

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.searchForm.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', loadImages);

refs.loadMoreBtn.style.display = 'none';

function onFormSubmit(evt) {
  evt.preventDefault();
  refs.loadMoreBtn.style.display = 'none';
  renderClear(refs.gallery);

  const { searchQuery } = evt.currentTarget.elements;
  const searchString = searchQuery.value.trim();

  if (searchString === '') {
    Notify.warning('Please enter an image name.');
    return;
  }

  pixabayApiService.query = searchString;
  pixabayApiService.resetPage();
  loadImages();
}

async function loadImages() {
  try {
    const imagesObject = await pixabayApiService.readPixabayImages();
    const imagesArray = imagesObject.hits;

    if (imagesArray.length === 0) {
      Notify.warning('Sorry, there are no images matching your search query. Please try again.');
      return;
    }

    if (pixabayApiService.page === 1) Notify.info(`Hooray! We found ${imagesObject.totalHits} images.`);

    renderGallery(imagesArray, refs.gallery);
    pixabayApiService.incrementPage();

    if (imagesArray.length < 40) {
      refs.loadMoreBtn.style.display = 'none';
      Notify.info("We're sorry, but you've reached the end of search results.");
    } else {
      refs.loadMoreBtn.style.display = 'flex';
    }
  } catch (error) {
    return Notify.failure(`Error on server: ${error}. Please, repeat query.`);
  }
}

function renderGallery(images, ulRef) {
  const galleryMarkup = images.map(image =>
    `<a class="photo-link" href="${image.largeImageURL}">
    <div class="photo-card">
    <div class="photo">
    <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy"/>
    </div>
            <div class="info">
                <p class="info-item">
                    <b>Likes</b>
                    ${image.likes}
                </p>
                <p class="info-item">
                    <b>Views</b>
                    ${image.views}
                </p>
                <p class="info-item">
                    <b>Comments</b>
                    ${image.comments}
                </p>
                <p class="info-item">
                    <b>Downloads</b>
                    ${image.downloads}
                </p>
            </div>
    </div>
</a>`
  ).join('');
  ulRef.insertAdjacentHTML('beforeend', galleryMarkup);
  simpleLightBox.refresh();

}

function renderClear(...refs) {
  refs.forEach(ref => ref.innerHTML = '');
}

const simpleLightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});