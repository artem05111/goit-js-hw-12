import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.form');
const input = document.querySelector('.input-search');
const gallery = document.querySelector('.gallery');
const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
  close: true,
});
const loader = document.querySelector('.loader');
function showLoader() {
  loader.style.display = 'block';
}
function hideLoader() {
  loader.style.display = 'none';
}

const searchImg = () => {
  const inputText = input.value.trim();

  const params = new URLSearchParams({
    key: '41919290-013d4a73a2d1360aed7891ab9',
    q: `${inputText}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  const url = `https://pixabay.com/api/?${params}`;

  showLoader();

  fetch(url)
    .then(resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      return resp.json();
    })
    .then(({ hits }) => {
      hideLoader();

      if (hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
      } else {
        gallery.innerHTML = hits
          .map(
            hit => `<a class="gallery-link" href="${hit.largeImageURL}"
      ><img class="gallery-image" src="${hit.webformatURL}" alt="${hit.tags}"
    />
    <ul class="gallery-stats">
      <li class="gallery-stats-item">
        <h2 class="stats-title">Likes</h2>
        <p class="stats-value">${hit.likes}</p>
      </li>
      <li class="gallery-stats-item">
        <h2 class="stats-title">Views</h2>
        <p class="stats-value">${hit.views}</p>
      </li>
      <li class="gallery-stats-item">
        <h2 class="stats-title">Comments</h2>
        <p class="stats-value">${hit.comments}</p>
      </li>
      <li class="gallery-stats-item">
        <h2 class="stats-title">Downloads</h2>
        <p class="stats-value">${hit.downloads}</p>
      </li>
    </ul></a>`
          )
          .join('');
      }
      lightbox.refresh();
    })
    .catch(error => {
      console.log(error);
      hideLoader();
    });
};

form.addEventListener('submit', evt => {
  evt.preventDefault();
  gallery.innerHTML = '';
  searchImg();
  form.reset();
});
