const gallery = document.getElementById('gallery');
const loader = document.getElementById('loader');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const downloadBtn = document.getElementById('download-btn');

// REAL 4K WALLPAPERS PER CATEGORY - No API needed!
const WALLPAPERS = {
  all: [
    { id: "photo-1494976388531-d1058494cdd8", cat: "CAR" },
    { id: "photo-1506744038136-46273834b3fb", cat: "NATURE" },
    { id: "photo-1578662996442-48f60103fc96", cat: "ANIME" },
    { id: "photo-1519125323398-675f0ddb6308", cat: "AESTHETIC" },
  ],
  car: [
    "photo-1494976388531-d1058494cdd8", "photo-1503376780353-7e6692767b70",
    "photo-1552519507-da3b142c6e3d", "photo-1492144534655-ae79c964c9d7",
    "photo-1503736334956-4c8ff8e9299d", "photo-1544636331-e26879cd4d9b",
    "photo-1580273916550-e323be2ae537", "photo-1511910849309-0dffb8785146",
    "photo-1603386329225-868f9b1ee6c9", "photo-1603584173870-7f23fdae1b7a",
    "photo-1618843479313-40f8afb4b4d8", "photo-1555215695-3004980ad54e"
  ],
  nature: [
    "photo-1506744038136-46273834b3fb", "photo-1441974231531-c6227db76b6e",
    "photo-1470071459604-3b5ec3a7fe05", "photo-1426604966848-d7adac402bff",
    "photo-1501854140801-50d01698950b", "photo-1475924156734-496f6cac6ec1",
    "photo-1433086966358-54859d0ed716", "photo-1501785888041-af3ef285b470",
    "photo-1470770841072-f978cf4d019e", "photo-1507525428034-b723cf961d3e"
  ],
  anime: [
    "photo-1578662996442-48f60103fc96", "photo-1578307017525-d39b0a1f1d27",
    "photo-1618331835717-801e976710b2", "photo-1607604276583-eef5d076aa5f",
    "photo-1575540326029-30c76a94a2a1", "photo-1612036782180-6f0b6cd846fe",
    "photo-1518709268805-4e9042af9f23", "photo-1534447677768-be436bb09401"
  ],
  aesthetic: [
    "photo-1519125323398-675f0ddb6308", "photo-1518837695005-2083093ee35b",
    "photo-1531685250784-7569952593d2", "photo-1493246507139-91e8fad9978e",
    "photo-1519681393784-d120267933ba", "photo-1526374965328-7f61d4dc18c5"
  ],
  dark: [
    "photo-1534447677768-be436bb09401", "photo-1518709268805-4e9042af9f23",
    "photo-1531306728370-e2ebd9d7bb99", "photo-1519681393784-d120267933ba",
    "photo-1505506874110-6a7a69069a08", "photo-1493246507139-91e8fad9978e"
  ],
  girl: [
    "photo-1526510747491-58f928ec870f", "photo-1529626455594-4ff0802cfb7e",
    "photo-1494790108377-be9c29b29330", "photo-1524504388940-b1c1722653e1",
    "photo-1524250502761-1ac6f2e30d43", "photo-1517841905240-472988babdf9"
  ]
};

let currentCat = "all";

function loadCategory(cat){
  currentCat = cat;
  loader.style.display="none";
  gallery.innerHTML="";
  let ids = [];
  if(cat==="all"){
    ids = [...WALLPAPERS.car.slice(0,4), ...WALLPAPERS.nature.slice(0,4), ...WALLPAPERS.anime.slice(0,4), ...WALLPAPERS.aesthetic.slice(0,4)];
  } else {
    ids = WALLPAPERS[cat] || WALLPAPERS.car;
  }
  
  // Shuffle
  ids = ids.sort(()=>0.5-Math.random());
  
  let html="";
  ids.forEach(photoId=>{
    let id = typeof photoId === 'string' ? photoId : photoId.id;
    let catName = typeof photoId === 'object' ? photoId.cat : cat.toUpperCase();
    const thumb = `https://images.unsplash.com/${id}?w=600&h=1000&fit=crop&q=80`;
    const full = `https://images.unsplash.com/${id}?w=2000&h=3000&fit=crop&q=90`;
    const displayName = catName==="CAR" ? "🚗 CAR" : catName==="NATURE" ? "🏔️ NATURE" : catName==="ANIME" ? "🌸 ANIME" : catName==="AESTHETIC" ? "💜 AESTHETIC" : `🔥 ${catName}`;
    html += `<div class="card" onclick="openModal('${full}')">
      <img src="${thumb}" loading="lazy">
      <div class="overlay">${displayName} 4K</div>
    </div>`;
  });
  gallery.innerHTML=html;
}

function filterCat(cat){
  document.querySelectorAll('nav button').forEach(b=>b.classList.remove('active'));
  event.target.classList.add('active');
  loadCategory(cat);
}

function searchWall(){
  const val = document.getElementById('search').value.trim().toLowerCase();
  if(!val) return;
  // Search eka - category detect karanawa
  if(val.includes("car")||val.includes("bmw")||val.includes("supra")) loadCategory("car");
  else if(val.includes("nature")||val.includes("mountain")) loadCategory("nature");
  else if(val.includes("anime")) loadCategory("anime");
  else if(val.includes("aesthetic")||val.includes("girl")) loadCategory("aesthetic");
  else if(val.includes("dark")||val.includes("black")) loadCategory("dark");
  else {
    // Random picsum for other searches
    gallery.innerHTML="";
    for(let i=0;i<16;i++){
      const thumb = `https://picsum.photos/seed/${val+i}/600/1000`;
      const full = `https://picsum.photos/seed/${val+i}/2000/3000`;
      gallery.innerHTML+=`<div class="card" onclick="openModal('${full}')"><img src="${thumb}"><div class="overlay">🔍 ${val.toUpperCase()}</div></div>`;
    }
  }
}

function openModal(url){
  modalImg.src=url;
  downloadBtn.href=url;
  modal.classList.add('active');
}
function closeModal(){ modal.classList.remove('active'); }
function shareWall(){
  if(navigator.share) navigator.share({title:'WallpaperLK', url: modalImg.src});
  else { navigator.clipboard.writeText(modalImg.src); alert("Link copy kala! 📋"); }
}

document.getElementById('search').addEventListener('keypress', e=>{ if(e.key==='Enter') searchWall(); });

// Start
loadCategory("all");
