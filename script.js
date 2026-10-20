const gallery=document.getElementById('gallery');
const loader=document.getElementById('loader');
const modal=document.getElementById('modal');
const modalImg=document.getElementById('modal-img');
const downloadBtn=document.getElementById('download-btn');
let currentCat='all',page=1,currentUrl="",myWalls=[];
try{myWalls=JSON.parse(localStorage.getItem('myWallpapers')||'[]');}catch{myWalls=[];}

const WALLS={
 car:[{id:"1494976388531-d1058494cdd8",label:"🚗 BMW"},{id:"1503376780353-7e6692767b70",label:"🚗 Supra"},{id:"1552519507-da3b142c6e3d",label:"🚗 GTR"},{id:"1492144534655-ae79c964c9d7",label:"🚗 Porsche"}],
 nature:[{id:"1506744038136-46273834b3fb",label:"🏔️ Mountain"},{id:"1441974231531-c6227db76b6e",label:"🌲 Forest"},{id:"1470071459604-3b5ec3a7fe05",label:"🌅 Sunset"},{id:"1426604966848-d7adac402bff",label:"🏞️ Lake"}],
 aesthetic:[{id:"1519125323398-675f0ddb6308",label:"💜 Aesthetic"}],
 dark:[{id:"1534447677768-be436bb09401",label:"🖤 Amoled"}]
};

// 100% SFW CLEAN ANIME - NO 18+!
const ANIME_URLS=[
 "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
 "https://images.unsplash.com/photo-1618331835717-801e976710b2?w=800",
 "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800",
 "https://cdn.waifu.im/1001.jpeg","https://cdn.waifu.im/1002.jpeg","https://cdn.waifu.im/1003.jpeg","https://cdn.waifu.im/1005.jpeg","https://cdn.waifu.im/1008.jpeg",
 "https://cdn.waifu.im/1010.jpeg","https://cdn.waifu.im/1012.jpeg","https://cdn.waifu.im/1015.jpeg","https://cdn.waifu.im/1020.jpeg"
];

function loadCategory(cat, append=false){
 if(!append){page=1;currentCat=cat;gallery.innerHTML=`<p style="padding:20px;text-align:center;color:#888">🔥 Loading ${cat}...</p>`;}
 if(cat==='anime'){
  if(!append) gallery.innerHTML="";
  let html="";
  let myAnime=myWalls.filter(w=>w.cat==='anime');
  if(!append) myAnime.forEach(w=>{html+=`<div class="card" onclick="openModal('${w.src}')" style="border-radius:12px;overflow:hidden;position:relative;cursor:pointer"><img src="${w.src}" style="width:100%;height:250px;object-fit:cover"><div style="position:absolute;bottom:0;background:linear-gradient(transparent,black);width:100%;padding:10px;color:white"><p>💎 MY ANIME</p></div></div>`;});
  for(let i=0;i<60;i++){
   let url=ANIME_URLS[(page*60+i)%ANIME_URLS.length];
   html+=`<div class="card" onclick="openModal('${url}')" style="border-radius:12px;overflow:hidden;position:relative;cursor:pointer"><img src="${url}" loading="lazy" style="width:100%;height:250px;object-fit:cover" onerror="this.src='https://picsum.photos/seed/sfwanime${page*60+i}/500/800'"><div style="position:absolute;bottom:0;background:linear-gradient(transparent,black);width:100%;padding:10px;color:white"><p>🌸 ANIME</p><span>SFW • 4K</span></div></div>`;
  }
  if(append) gallery.insertAdjacentHTML('beforeend',html); else gallery.innerHTML=html;
  loader.innerHTML=`🌸 ${myAnime.length+60} CLEAN ANIME (SFW)`;
  modal.style.display="none"; document.getElementById('modal').style.display="none";
  return;
 }
 if(!append) gallery.innerHTML="";
 let html="";
 let myFiltered=cat==='all'?myWalls:myWalls.filter(w=>w.cat===cat);
 if(!append) myFiltered.forEach(w=>{html+=`<div class="card" onclick="openModal('${w.src}')" style="border-radius:12px;overflow:hidden"><img src="${w.src}" style="width:100%;height:250px;object-fit:cover"></div>`;});
 let list=WALLS[cat]||[...WALLS.car,...WALLS.nature];
 for(let i=0;i<100;i++){
  let item=list[i%list.length]; let unique=page*1000+i*7;
  let thumb=`https://images.unsplash.com/photo-${item.id}?w=500&h=700&fit=crop&q=75&ixid=${unique}`;
  let full=`https://images.unsplash.com/photo-${item.id}?w=2000&h=3000&fit=crop&q=90&ixid=${unique}`;
  html+=`<div class="card" onclick="openModal('${full}')" style="border-radius:12px;overflow:hidden;position:relative;cursor:pointer"><img src="${thumb}" loading="lazy" style="width:100%;height:250px;object-fit:cover"><div style="position:absolute;bottom:0;background:linear-gradient(transparent,black);width:100%;padding:8px;color:white"><p>${item.label}</p></div></div>`;
 }
 if(append) gallery.insertAdjacentHTML('beforeend',html); else gallery.innerHTML=html+gallery.innerHTML;
 loader.innerHTML=`🔥 ${page*100}+ ${cat.toUpperCase()}`;
}

function filterCat(cat){document.querySelectorAll('nav button').forEach(b=>b.classList.remove('active'));try{event.target.classList.add('active');}catch{}loadCategory(cat,false);}
function searchWall(){let v=document.getElementById('search').value.toLowerCase();if(!v) return loadCategory('all');if(v.includes("car")) loadCategory('car');else if(v.includes("nature")) loadCategory('nature');else if(v.includes("anime")) loadCategory('anime');else loadCategory('all');}
let isLoading=false;
window.addEventListener('scroll',()=>{if(window.innerHeight+window.scrollY>=document.body.offsetHeight-900&&!isLoading){isLoading=true;page++;setTimeout(()=>{loadCategory(currentCat,true);isLoading=false;},300);}});
function openModal(url){currentUrl=url;modalImg.src=url;downloadBtn.href=url;modal.style.display="flex";document.body.style.overflow='hidden';try{document.getElementById('views').innerText=(Math.random()*5+0.5).toFixed(1)+'k';document.getElementById('likes').innerText=Math.floor(Math.random()*900+100);document.getElementById('downs').innerText=Math.floor(Math.random()*2000+500);}catch{}}
function closeModal(){modal.style.display="none";document.body.style.overflow='auto';}
function likeWall(){}
function shareWall(){if(navigator.share) navigator.share({title:'WallpaperLK',url:currentUrl});else{navigator.clipboard.writeText(currentUrl);alert("Link copied!");}}
async function downloadWithWatermark(e){e.preventDefault();window.open(currentUrl,'_blank');}
function uploadWallpapers(input){
 const files=input.files; if(!files.length) return;
 for(let file of files){
  const reader=new FileReader();
  reader.onload=(ev)=>{myWalls.push({src:ev.target.result,cat:currentCat==='all'?'anime':currentCat});localStorage.setItem('myWallpapers',JSON.stringify(myWalls));loadCategory(currentCat,false);};
  reader.readAsDataURL(file);
 }
 alert(files.length+" photos uploaded! ✅");
}
try{document.getElementById('search').addEventListener('keypress',e=>{if(e.key==='Enter') searchWall();});}catch{}
loadCategory('all');
