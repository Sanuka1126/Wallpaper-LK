const gallery = document.getElementById('gallery');
const loader = document.getElementById('loader');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const downloadBtn = document.getElementById('download-btn');

const myWalls = JSON.parse(localStorage.getItem('myWallpapers') || '[]');
let currentCat = 'all';
let page = 1;
let isLoading = false;

// MEGA WALLPAPER GENERATOR - 100k+
function generateWallpapers(cat, count = 100){
  let html = "";
  
  // 1. Oyage uploads
  if(page===1){
    const myFiltered = cat==='all' ? myWalls : myWalls.filter(w=>w.cat===cat);
    myFiltered.forEach(w=>{
      html += `<div class="card" onclick="openModal('${w.src}')">
        <img src="${w.src}" loading="lazy">
        <div class="overlay"><p>💎 MY UPLOAD</p><span>${w.cat.toUpperCase()}</span></div>
      </div>`;
    });
  }

  // 2. REAL 4K WALLPAPERS - Picsum + Unsplash Mix for 100k
  for(let i=0; i<count; i++){
    const seed = `${cat}-${page}-${i}-${Math.floor(Math.random()*10000)}`;
    const id = (page*100 + i) % 1000; // picsum id 0-1000
    
    // 3 type random mix
    const type = Math.random();
    let thumb, full, label;
    
    if(type < 0.4){
      // Picsum high quality
      thumb = `https://picsum.photos/seed/${seed}/600/1000`;
      full = `https://picsum.photos/seed/${seed}/2000/3000`;
      label = cat==='car' ? '🚗 CAR' : cat==='nature' ? '🏔️ NATURE' : cat==='anime' ? '🌸 ANIME' : cat==='all' ? '🔥 TRENDING' : `🔥 ${cat.toUpperCase()}`;
    } else if(type < 0.7){
      // Unsplash random via picsum id
      thumb = `https://picsum.photos/id/${id}/600/1000`;
      full = `https://picsum.photos/id/${id}/2000/3000`;
      label = `✨ ${cat.toUpperCase()} 4K`;
    } else {
      // Unsplash curated (more real)
      const curated = [
        "photo-1494976388531-d1058494cdd8","photo-1503376780353-7e6692767b70",
        "photo-1506744038136-46273834b3fb","photo-1441974231531-c6227db76b6e",
        "photo-1578662996442-48f60103fc96","photo-1519125323398-675f0ddb6308",
        "photo-1526510747491-58f928ec870f","photo-1534447677768-be436bb09401"
      ];
      const curId = curated[Math.floor(Math.random()*curated.length)];
      thumb = `https://images.unsplash.com/${curId}?w=600&h=1000&fit=crop&q=80&auto=format`;
      full = `https://images.unsplash.com/${curId}?w=2000&h=3000&fit=crop&q=90&auto=format`;
      label = `💎 HD ${cat.toUpperCase()}`;
    }
    
    html += `<div class="card" onclick="openModal('${full}')">
      <img src="${thumb}" loading="lazy">
      <div class="overlay"><p>${label}</p><span>4K • ${Math.floor(Math.random()*2+1)}.${Math.floor(Math.random()*9)}k</span></div>
    </div>`;
  }
  return html;
}

function loadCategory(cat, append=false){
  if(!append){
    gallery.innerHTML="";
    page=1;
    currentCat=cat;
  }
  loader.style.display="block";
  
  setTimeout(()=>{
    const newHtml = generateWallpapers(cat, 100); // 100 per load!
    if(append) gallery.innerHTML += newHtml;
    else gallery.innerHTML = newHtml;
    loader.style.display="none";
    isLoading=false;
  }, 300);
}

function filterCat(cat){
  document.querySelectorAll('nav button').forEach(b=>b.classList.remove('active'));
  event.target.classList.add('active');
  loadCategory(cat);
}

function searchWall(){
  const val = document.getElementById('search').value.trim().toLowerCase();
  if(!val) return;
  if(val.includes("car")||val.includes("bmw")||val.includes("supra")||val.includes("gtr")) loadCategory("car");
  else if(val.includes("nature")||val.includes("mountain")) loadCategory("nature");
  else if(val.includes("anime")||val.includes("naruto")) loadCategory("anime");
  else if(val.includes("dark")||val.includes("black")||val.includes("amoled")) loadCategory("dark");
  else loadCategory("all");
}

// INFINITE SCROLL - scroll karama auto 100k enawa!
window.addEventListener('scroll', ()=>{
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 800 && !isLoading){
    isLoading=true;
    page++;
    loadCategory(currentCat, true);
  }
});

function openModal(url){
  modalImg.src=url;
  downloadBtn.href=url;
  document.getElementById('views').innerText = (Math.random()*5+0.5).toFixed(1)+'k';
  document.getElementById('likes').innerText = Math.floor(Math.random()*900+100);
  document.getElementById('downs').innerText = Math.floor(Math.random()*2000+500);
  modal.classList.add('active');
}
function closeModal(){ modal.classList.remove('active'); }
function likeWall(){
  const el = document.getElementById('likes');
  el.innerText = parseInt(el.innerText)+1;
  event.target.innerText="❤️ Liked!";
}
function shareWall(){
  if(navigator.share) navigator.share({title:'WallpaperLK', url: modalImg.src});
  else { navigator.clipboard.writeText(modalImg.src); alert("Link copy kala! 📋"); }
}

document.getElementById('search').addEventListener('keypress', e=>{ if(e.key==='Enter') searchWall(); });

// START with 100 wallpapers!
loadCategory("all");
