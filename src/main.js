import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const form = document.querySelector('.form');
const input = document.querySelector('.input-search');
const gallery = document.querySelector('.gallery');
const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
  close: true,
});

const API_KEY = '41919290-013d4a73a2d1360aed7891ab9';
const API_URL = 'https://pixabay.com/api/';
let page = 1;
let perPage = 40;
let totalPages;

const loader = document.querySelector('.loader');
function showLoader() {
  loader.style.display = 'block';
}
function hideLoader() {
  loader.style.display = 'none';
}

const btnLoadMore = document.querySelector('.btn-load-more');
function showBtnLoad() {
  btnLoadMore.style.display = 'flex';
}
function hideBtnLoad() {
  btnLoadMore.style.display = 'none';
}
hideBtnLoad();
const renderImg = hits => {
  const murkup = hits
    .map(
      hit => `
      <a class="gallery-link" href="${hit.largeImageURL}"
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
  gallery.insertAdjacentHTML('beforeend', murkup);
};

const searchImg = async () => {
  const inputText = localStorage.getItem('userInput');

  const params = new URLSearchParams({
    key: API_KEY,
    q: `${inputText}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: perPage,
  });

  const url = `${API_URL}?${params}`;

  showLoader();

  try {
    const resp = await axios.get(url);
    const { hits } = resp.data;
    totalPages = Math.ceil(resp.data.totalHits / perPage);
    hideLoader();

    if (hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    } else {
      renderImg(hits);
    }
    lightbox.refresh();
  } catch (error) {
    console.log(error);
    hideLoader();
  }
};

const fetchImg = async () => {
  try {
    showLoader();
    await searchImg();
    page += 1;
    if (page > totalPages) {
      hideBtnLoad();
      iziToast.error({
        message: 'We are sorry but you ve reached the end of search results',
        position: 'topRight',
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
};

const loadMoreHandler = async () => {
  if (page <= totalPages) {
    await fetchImg();
    fetchNextGroup();
  }
};

btnLoadMore.addEventListener('click', loadMoreHandler);
gallery.insertAdjacentElement('afterend', btnLoadMore);

form.addEventListener('submit', async evt => {
  evt.preventDefault();
  try {
    localStorage.setItem('userInput', input.value);
    page = 1;
    await searchImg();
    showLoader();
    if (totalPages > 1) {
      showBtnLoad();
    } else {
      hideBtnLoad();
    }
  } catch (error) {
    console.error(error.message);
  }
});

const fetchNextGroup = () => {
  const wrapperImgs = document.querySelector('.gallery-link');
  const wrapperSize = wrapperImgs.getBoundingClientRect();

  console.log(wrapperSize);
  window.scrollBy({
    top: wrapperSize.height * 2,
    behavior: 'smooth',
  });
};

const submitHandler = async evt => {
  evt.preventDefault();
  gallery.innerHTML = '';
  page = 1;

  try {
    await searchImg();
  } catch (error) {
    console.log(error);
  }

  form.reset();
  if (totalPages > 1) {
    showBtnLoad();
  } else {
    hideBtnLoad();
  }
};

form.addEventListener('submit', submitHandler);
