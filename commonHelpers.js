import{S as m,i as d}from"./assets/vendor-46aac873.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&t(o)}).observe(document,{childList:!0,subtree:!0});function l(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function t(e){if(e.ep)return;e.ep=!0;const s=l(e);fetch(e.href,s)}})();const n=document.querySelector(".form"),f=document.querySelector(".input-search"),c=document.querySelector(".gallery"),p=new m(".gallery a",{captionDelay:250,captionsData:"alt",close:!0}),u=document.querySelector(".loader");function y(){u.style.display="block"}function i(){u.style.display="none"}const g=()=>{const a=f.value.trim(),l=`https://pixabay.com/api/?${new URLSearchParams({key:"41919290-013d4a73a2d1360aed7891ab9",q:`${a}`,image_type:"photo",orientation:"horizontal",safesearch:!0})}`;y(),fetch(l).then(t=>{if(!t.ok)throw new Error(t.statusText);return t.json()}).then(({hits:t})=>{i(),t.length===0?d.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}):c.innerHTML=t.map(e=>`<a class="gallery-link" href="${e.largeImageURL}"
      ><img class="gallery-image" src="${e.webformatURL}" alt="${e.tags}"
    />
    <ul class="gallery-stats">
      <li class="gallery-stats-item">
        <h2 class="stats-title">Likes</h2>
        <p class="stats-value">${e.likes}</p>
      </li>
      <li class="gallery-stats-item">
        <h2 class="stats-title">Views</h2>
        <p class="stats-value">${e.views}</p>
      </li>
      <li class="gallery-stats-item">
        <h2 class="stats-title">Comments</h2>
        <p class="stats-value">${e.comments}</p>
      </li>
      <li class="gallery-stats-item">
        <h2 class="stats-title">Downloads</h2>
        <p class="stats-value">${e.downloads}</p>
      </li>
    </ul></a>`).join(""),p.refresh()}).catch(t=>{console.log(t),i()})};n.addEventListener("submit",a=>{a.preventDefault(),c.innerHTML="",g(),n.reset()});
//# sourceMappingURL=commonHelpers.js.map
