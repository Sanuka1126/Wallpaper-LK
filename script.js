const gallery = document.getElementById('gallery');
const loader = document.getElementById('loader');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const downloadBtn = document.getElementById('download-btn');

let currentQuery = "wallpaper 4k";
let page = 1;

const queries = {
  all: "wallpaper 4k hd",
  car: "car bmw supra jdm 4k",
  nature: "nature mountain forest 4k",
  anime: "anime aesthetic 4k",
  aesthetic: "aesthetic wallpaper 4k",
  dark: "dark wallpaper amoled 4k",
  girl: "girl aesthetic wallpaper"
};

function loadWallpapers(q){
  loader.style.display="block";
  gallery.innerHTML="";
  // Unsplash source - no API key needed! Free unlimited!
  const count = 24;
  let html = "";
  for(let i=0;i<count;i++){
    const randomId = Math.floor(Math.random()*1000)+i;
    // Use source.unsplash for auto images
    const imgUrl = `https://source.unsplash.com/600x1000/?${encodeURIComponent(q)},${randomId}`;
    const hdUrl = `https://source.unsplash.com/2000x3000/?${encodeURIComponent(q)},${randomId}`;
    html += `<div class="card" onclick="openModal('${hdUrl}')">
      <img src="${imgUrl}" loading="lazy" onerror="this.src='https://picsum.photos/600/1000?random=${randomId}'">
      <div class="overlay">📥 ${q.toUpperCase()}</div>
    </div>`;
  }
  gallery.innerHTML = html;
  loader.style.display="none";
}

function filterCat(cat){
  document.querySelectorAll('nav button').forEach(b=>b.classList.remove('active'));
  event.target.classList.add('active');
  currentQuery = queries[cat] || queries.all;
  loadWallpapers(currentQuery);
  window.scrollTo({top:0,behavior:'smooth'});
}

function searchWall(){
  const val = document.getElementById('search').value.trim();
  if(!val) return;
  currentQuery = val + " wallpaper 4k hd";
  loadWallpapers(currentQuery);
}

document.getElementById('search').addEventListener('keypress', e=>{
  if(e.key==='Enter') searchWall();
});

function openModal(url){
  modalImg.src = url;
  downloadBtn.href = url;
  modal.classList.add('active');
}

function closeModal(){
  modal.classList.remove('active');
}

function shareWall(){
  if(navigator.share){
    navigator.share({title:'WallpaperLK', url: modalImg.src});
  } else {
    navigator.clipboard.writeText(modalImg.src);
    alert("Link copy kala! 📋");
  }
}

// Load first
loadWallpapers(queries.all);

// Infinite scroll
window.addEventListener('scroll', ()=>{
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000){
    page++;
    // Load more same query
    for(let i=0;i<8;i++){
      const randomId = Math.floor(Math.random()*5000)+page*10+i;
      const imgUrl = `https://source.unsplash.com/600x1000/?${encodeURIComponent(currentQuery)},${randomId}`;
      const hdUrl = `https://source.unsplash.com/2000x3000/?${encodeURIComponent(currentQuery)},${randomId}`;
      gallery.innerHTML += `<div class="card" onclick="openModal('${hdUrl}')"><img src="${imgUrl}" loading="lazy"><div class="overlay">📥 ${currentQuery.toUpperCase()}</div></div>`;
    }
  }
});
