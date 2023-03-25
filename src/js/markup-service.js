import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const simpleLightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});


export default function renderGallery(images, ulRef) {
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
