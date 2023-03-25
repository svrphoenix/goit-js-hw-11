import './css/style.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import refs from './js/refs';
import { loadImages, loadInitialization } from './js/image-loader';

refs.searchForm.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', loadImages);
refs.loadMoreBtn.classList.add('visually-hidden');

function onFormSubmit(evt) {
  evt.preventDefault();
  const { gallery, loadMoreBtn } = refs;
  loadMoreBtn.classList.add('visually-hidden');
  gallery.innerHTML = '';

  const { searchQuery } = evt.currentTarget.elements;
  const searchString = searchQuery.value.trim();

  if (searchString === '') {
    Notify.warning('Please enter a non empty search string.');
    return;
  }

  loadInitialization(searchString);
  loadImages();
}