import{S as b,a as v,i as h}from"./assets/vendor-89feecc5.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&r(u)}).observe(document,{childList:!0,subtree:!0});function a(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(e){if(e.ep)return;e.ep=!0;const o=a(e);fetch(e.href,o)}})();const p=document.querySelector(".form"),S=document.querySelector(".input-search"),m=document.querySelector(".gallery"),I=new b(".gallery a",{captionDelay:250,captionsData:"alt",close:!0}),$="41919290-013d4a73a2d1360aed7891ab9",q="https://pixabay.com/api/";let l=1,f=40,n;const L=document.querySelector(".loader");function g(){L.style.display="block"}function d(){L.style.display="none"}const c=document.querySelector(".btn-load-more");function w(){c.style.display="flex"}function i(){c.style.display="none"}i();const k=s=>{const t=s.map(a=>`
      <a class="gallery-link" href="${a.largeImageURL}"
      ><img class="gallery-image" src="${a.webformatURL}" alt="${a.tags}"
    />
    <ul class="gallery-stats">
      <li class="gallery-stats-item">
        <h2 class="stats-title">Likes</h2>
        <p class="stats-value">${a.likes}</p>
      </li>
      <li class="gallery-stats-item">
        <h2 class="stats-title">Views</h2>
        <p class="stats-value">${a.views}</p>
      </li>
      <li class="gallery-stats-item">
        <h2 class="stats-title">Comments</h2>
        <p class="stats-value">${a.comments}</p>
      </li>
      <li class="gallery-stats-item">
        <h2 class="stats-title">Downloads</h2>
        <p class="stats-value">${a.downloads}</p>
      </li>
    </ul></a>`).join("");m.insertAdjacentHTML("beforeend",t)},y=async()=>{const s=localStorage.getItem("userInput"),t=new URLSearchParams({key:$,q:`${s}`,image_type:"photo",orientation:"horizontal",safesearch:!0,page:l,per_page:f}),a=`${q}?${t}`;g();try{const r=await v.get(a),{hits:e}=r.data;n=Math.ceil(r.data.totalHits/f),d(),e.length===0?h.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}):k(e),I.refresh()}catch(r){console.log(r),d()}},P=async()=>{try{g(),await y(),l+=1,l>n&&(i(),h.error({message:"We are sorry but you ve reached the end of search results",position:"topRight"}))}catch(s){console.log(s)}finally{d()}},x=async()=>{l<=n&&(await P(),R())};c.addEventListener("click",x);m.insertAdjacentElement("afterend",c);p.addEventListener("submit",async s=>{s.preventDefault();try{localStorage.setItem("userInput",S.value),l=1,await y(),g(),n>1?w():i()}catch(t){console.error(t.message)}});const R=()=>{const t=document.querySelector(".gallery-link").getBoundingClientRect();console.log(t),window.scrollBy({top:t.height*2,behavior:"smooth"})},E=async s=>{s.preventDefault(),m.innerHTML="",l=1;try{await y()}catch(t){console.log(t)}p.reset(),n>1?w():i()};p.addEventListener("submit",E);
//# sourceMappingURL=commonHelpers.js.map
