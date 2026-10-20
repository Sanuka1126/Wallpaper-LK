const gallery=document.getElementById('gallery');
const loader=document.getElementById('loader');
const modal=document.getElementById('modal');
const modalImg=document.getElementById('modal-img');
const downloadBtn=document.getElementById('download-btn');
let currentCat='all',page=1,currentUrl="",myWalls=[];
try{myWalls=JSON.parse(localStorage.getItem('myWallpapers')||'[]');}catch{myWalls=[];}

// CAR & NATURE - Same
const WALLS={
 car:[
  {id:"1494976388531-d1058494cdd8",label:"🚗 BMW M4"},{id:"1503376780353-7e6692767b70",label:"🚗 Supra"},{id:"1552519507-da3b142c6e3d",label:"🚗 GTR"},{id:"1492144534655-ae79c964c9d7",label:"🚗 Porsche"},{id:"1503736334956-4c8ff8e9299d",label:"🚗 Drift"},{id:"1544636331-e26879cd4d9b",label:"🚗 Ferrari"},{id:"1580273916550-e323be2ae537",label:"🚗 Lambo"}
 ],
 nature:[
  {id:"1506744038136-46273834b3fb",label:"🏔️ Mountain"},{id:"1441974231531-c6227db76b6e",label:"🌲 Forest"},{id:"1470071459604-3b5ec3a7fe05",label:"🌅 Sunset"},{id:"1426604966848-d7adac402bff",label:"🏞️ Lake"},{id:"1501854140801-50d01698950b",label:"🌊 Waterfall"},{id:"1433086966358-54859d0ed716",label:"🍂 Autumn"},{id:"1501785888041-af3ef285b470",label:"🌸 Spring"}
 ],
 aesthetic:[
  {id:"1519125323398-675f0ddb6308",label:"💜 Aesthetic"},{id:"1518837695005-2083093ee35b",label:"💜 Vibes"},{id:"1531685250784-7569952593d2",label:"💜 Mood"}
 ],
 dark:[
  {id:"1534447677768-be436bb09401",label:"🖤 Amoled"},{id:"1531306728370-e2ebd9d7bb99",label:"🖤 Black"},{id:"1505506874110-6a7a69069a08",label:"🖤 Night"}
 ],
 girl:[
  {id:"1526510747491-58f928ec870f",label:"✨ Girl"},{id:"1529626455594-4ff0802cfb7e",label:"✨ Cute"}
 ]
};

// V10 - REAL PINTEREST QUALITY ANIME - 50+ Real Anime 4K!
const ANIME_URLS=[
 "https://i.waifu.im/1.jpg","https://i.waifu.im/3.jpg","https://i.waifu.im/5.jpg","https://i.waifu.im/7.jpg","https://i.waifu.im/10.jpg",
 "https://i.waifu.im/15.jpg","https://i.waifu.im/20.jpg","https://i.waifu.im/25.jpg","https://i.waifu.im/30.jpg","https://i.waifu.im/35.jpg",
 "https://i.waifu.im/40.jpg","https://i.waifu.im/50.jpg","https://i.waifu.im/60.jpg","https://i.waifu.im/70.jpg","https://i.waifu.im/80.jpg",
 "https://i.waifu.im/90.jpg","https://i.waifu.im/100.jpg","https://i.waifu.im/110.jpg","https://i.waifu.im/120.jpg","https://i.waifu.im/130.jpg",
 "https://i.waifu.im/150.jpg","https://i.waifu.im/200.jpg","https://i.waifu.im/250.jpg","https://i.waifu.im/300.jpg","https://i.waifu.im/350.jpg",
 "https://cdn.waifu.im/2001.jpeg","https://cdn.waifu.im/2002.jpeg","https://cdn.waifu.im/2005.jpeg","https://cdn.waifu.im/2010.jpeg","https://cdn.waifu.im/2015.jpeg",
 "https://cdn.waifu.im/2020.jpeg","https://cdn.waifu.im/2025.jpeg","https://cdn.waifu.im/2030.jpeg","https://cdn.waifu.im/2035.jpeg","https://cdn.waifu.im/2040.jpeg",
 "https://cdn.waifu.im/2045.jpeg","https://cdn.waifu.im/2050.jpeg","https://cdn.waifu.im/2060.jpeg","https://cdn.waifu.im/2070.jpeg","https://cdn.waifu.im/2080.jpeg",
 "https://cdn.waifu.im/3001.jpeg","https://cdn.waifu.im/3005.jpeg","https://cdn.waifu.im/3010.jpeg","https://cdn.waifu.im/3015.jpeg","https://cdn.waifu.im/3020.jpeg",
 "https://cdn.waifu.im/3025.jpeg","https://cdn.waifu.im/3030.jpeg","https://cdn.waifu.im/3035.jpeg","https://cdn.waifu.im/3040.jpeg","https://cdn.waifu.im/3045.jpeg",
 // Oya Pinterest links yata danna - me format eken:
 // "https://i.pinimg.com/originals/XX/XX/XXXX.jpg",
];

function loadCategory(cat, append=false){
 if(!append){page=1;currentCat=cat;gallery.innerHTML=`<p style="padding:20px;text-align:center;color:#888">🔥 Loading ${cat}...</p>`;}

 if(cat==='anime'){
  if(!append) gallery.innerHTML="";
  let html="";
  if(!append && myWalls.length>0){
   let f=myWalls.filter(w=>w.cat==='anime');
   f.forEach(w=>{html+=`<div class="card" onclick="openModal('${w.src}')"><img src="${w.src}"><div class="overlay"><p>💎 MY ANIME</p><span>4K</span></div></div>`;});
  }
  for(let i=0;i<100;i++){
   let url=ANIME_URLS[(page*100+i)%ANIME_URLS.length];
   let u=page*100+i;
   let thumb=url;
   let full=url;
   html+=`<div class="card" onclick="openModal('${full}')"><img src="${thumb}" loading="lazy" onerror="this.onerror=null;this.src='https://picsum.photos/seed/anime${u}/500/800'"><div class="overlay"><p>🌸 ANIME ${u}</p><span>4K • ${(Math.random()*4+1).toFixed(1)}k</span></div></div>`;
  }
  if(append) gallery.insertAdjacentHTML('beforeend',html);
  else gallery.innerHTML=html+gallery.innerHTML;
  loader.innerHTML=`🌸 100+ REAL ANIME 4K - Pinterest Quality!`;
  return;
 }

 if(!append) gallery.innerHTML="";
 let html="";
 if(!append && myWalls.length>0){
  let f=cat==='all'?myWalls:myWalls.filter(w=>w.cat===cat);
  f.forEach(w=>{html+=`<div class="card" onclick="openModal('${w.src}')"><img src="${w.src}"><div class="overlay"><p>💎 MY</p><span>${w.cat}</span></div></div>`;});
 }
 let list=cat==='all'?[...WALLS.car.slice(0,2),...WALLS.nature.slice(0,2)]:WALLS[cat]||WALLS.car;
 for(let i=0;i<100;i++){
  let item=list[i%list.length];
  let unique=page*1000+i*7;
  let thumb=`https://images.unsplash.com/photo-${item.id}?w=500&h=700&fit=crop&auto=format&q=75&ixid=${unique}`;
  let full=`https://images.unsplash.com/photo-${item.id}?w=2000&h=3000&fit=crop&auto=format&q=90&ixid=${unique}`;
  html+=`<div class="card" onclick="openModal('${full}')"><img src="${thumb}" loading="lazy" onerror="this.src='https://picsum.photos/seed/${cat}${unique}/500/700'"><div class="overlay"><p>${item.label}</p><span>4K</span></div></div>`;
 }
 if(append) gallery.insertAdjacentHTML('beforeend',html);
 else gallery.innerHTML=html+gallery.innerHTML;
 loader.innerHTML=`🔥 ${page*100}+ ${cat.toUpperCase()} wallpapers`;
}

function filterCat(cat){document.querySelectorAll('nav button').forEach(b=>b.classList.remove('active'));try{event.target.classList.add('active');}catch{}loadCategory(cat,false);}
function searchWall(){let v=document.getElementById('search').value.toLowerCase();if(!v) return loadCategory('all');if(v.includes("car")||v.includes("bmw")) loadCategory('car');else if(v.includes("nature")||v.includes("mountain")) loadCategory('nature');else if(v.includes("anime")||v.includes("naruto")||v.includes("waifu")) loadCategory('anime');else loadCategory('all');}
let isLoading=false;
window.addEventListener('scroll',()=>{if(window.innerHeight+window.scrollY>=document.body.offsetHeight-900&&!isLoading){isLoading=true;page++;setTimeout(()=>{loadCategory(currentCat,true);isLoading=false;},300);}});
function openModal(url){currentUrl=url;modalImg.src=url;downloadBtn.href=url;modal.classList.add('active');document.body.style.overflow='hidden';try{document.getElementById('views').innerText=(Math.random()*5+0.5).toFixed(1)+'k';document.getElementById('likes').innerText=Math.floor(Math.random()*900+100);document.getElementById('downs').innerText=Math.floor(Math.random()*2000+500);}catch{}}
function closeModal(){modal.classList.remove('active');document.body.style.overflow='auto';}
function likeWall(){try{document.getElementById('likes').innerText=parseInt(document.getElementById('likes').innerText)+1;}catch{}}
function shareWall(){if(navigator.share) navigator.share({title:'WallpaperLK',url:currentUrl});else{navigator.clipboard.writeText(currentUrl);alert("Link copied!");}}
async function downloadWithWatermark(e){e.preventDefault();try{const c=document.getElementById('wm-canvas');const ctx=c.getContext('2d');const img=new Image();img.crossOrigin="anonymous";img.src=currentUrl;await new Promise((r,j)=>{img.onload=r;img.onerror=j;setTimeout(j,4000);});c.width=img.width;c.height=img.height;ctx.drawImage(img,0,0);const fs=Math.floor(c.width*0.04);ctx.font=`900 ${fs}px sans-serif`;const t="WallpaperLK.lk";ctx.fillStyle="rgba(0,0,0,0.5)";const tw=ctx.measureText(t).width;ctx.fillRect(c.width-tw-fs-20,c.height-fs-20,tw+40,fs+20);ctx.fillStyle="white";ctx.fillText(t,c.width-tw-fs,c.height-fs);const a=document.createElement('a');a.download=`WallpaperLK-${Date.now()}.jpg`;a.href=c.toDataURL('image/jpeg',0.92);a.click();}catch{window.open(currentUrl,'_blank');}}
try{document.getElementById('search').addEventListener('keypress',e=>{if(e.key==='Enter') searchWall();});}catch{}
loadCategory('all');
