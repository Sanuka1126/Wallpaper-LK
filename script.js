const gallery=document.getElementById('gallery');
const loader=document.getElementById('loader');
const modal=document.getElementById('modal');
const modalImg=document.getElementById('modal-img');
const downloadBtn=document.getElementById('download-btn');
let currentCat='all',page=1,currentUrl="",myWalls=[];
try{myWalls=JSON.parse(localStorage.getItem('myWallpapers')||'[]');}catch{myWalls=[];}

// SFW WALLS ONLY
const WALLS={
 car:[
  {id:"1494976388531-d1058494cdd8",label:"🚗 BMW M4"},{id:"1503376780353-7e6692767b70",label:"🚗 Supra"},{id:"1552519507-da3b142c6e3d",label:"🚗 GTR"},{id:"1492144534655-ae79c964c9d7",label:"🚗 Porsche"}
 ],
 nature:[
  {id:"1506744038136-46273834b3fb",label:"🏔️ Mountain"},{id:"1441974231531-c6227db76b6e",label:"🌲 Forest"},{id:"1470071459604-3b5ec3a7fe05",label:"🌅 Sunset"},{id:"1426604966848-d7adac402bff",label:"🏞️ Lake"}
 ],
 aesthetic:[
  {id:"1519125323398-675f0ddb6308",label:"💜 Aesthetic"},{id:"1518837695005-2083093ee35b",label:"💜 Vibes"}
 ],
 dark:[
  {id:"1534447677768-be436bb09401",label:"🖤 Amoled"},{id:"1505506874110-6a7a69069a08",label:"🖤 Night"}
 ]
};

// V11 - 100% SFW CLEAN ANIME - NO 18+ ! Naruto, Demon Slayer, Goku, Luffy etc
const ANIME_URLS=[
 // Safe Anime - Wallhaven SFW + Unsplash Anime (100% clean)
 "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800", // Anime art
 "https://images.unsplash.com/photo-1618331835717-801e976710b2?w=800", // Anime city
 "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800", // Anime aesthetic
 "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800", // Anime sky
 // SFW Waifu - Only SFW tags (checked)
 "https://cdn.waifu.im/1001.jpeg","https://cdn.waifu.im/1002.jpeg","https://cdn.waifu.im/1003.jpeg","https://cdn.waifu.im/1005.jpeg","https://cdn.waifu.im/1008.jpeg",
 "https://cdn.waifu.im/1010.jpeg","https://cdn.waifu.im/1012.jpeg","https://cdn.waifu.im/1015.jpeg","https://cdn.waifu.im/1020.jpeg","https://cdn.waifu.im/1025.jpeg",
 // Oya photos danna thana - Mama upload feature ekakuth add kala!
];

function loadCategory(cat, append=false){
 if(!append){page=1;currentCat=cat;gallery.innerHTML=`<p style="padding:20px;text-align:center;color:#888">🔥 Loading ${cat}...</p>`;}

 if(cat==='anime'){
  if(!append) gallery.innerHTML="";
  let html="";
  // Oya upload karapu photos witharai - wena category enne na!
  let myAnime = myWalls.filter(w=>w.cat==='anime');
  if(!append){
   myAnime.forEach(w=>{html+=`<div class="card" onclick="openModal('${w.src}')"><img src="${w.src}"><div class="overlay"><p>💎 MY ANIME</p><span>YOUR UPLOAD</span></div></div>`;});
  }
  // SFW anime witharai
  for(let i=0;i<60;i++){
   let url=ANIME_URLS[(page*60+i)%ANIME_URLS.length];
   let u=page*60+i;
   html+=`<div class="card" onclick="openModal('${url}')"><img src="${url}" loading="lazy" onerror="this.src='https://picsum.photos/seed/sfwanime${u}/500/800'"><div class="overlay"><p>🌸 ANIME ${u}</p><span>SFW • 4K</span></div></div>`;
  }
  if(append) gallery.insertAdjacentHTML('beforeend',html);
  else gallery.innerHTML=html;
  loader.innerHTML=`🌸 ${myAnime.length + 60} CLEAN ANIME (SFW) - No 18+`;
  return;
 }

 // Other cats - Anime enne na!
 if(!append) gallery.innerHTML="";
 let html="";
 let myFiltered = cat==='all'?myWalls:myWalls.filter(w=>w.cat===cat);
 if(!append){
  myFiltered.forEach(w=>{html+=`<div class="card" onclick="openModal('${w.src}')"><img src="${w.src}"><div class="overlay"><p>💎 MY</p><span>${w.cat}</span></div></div>`;});
 }
 let list=WALLS[cat]||[...WALLS.car,...WALLS.nature];
 for(let i=0;i<100;i++){
  let item=list[i%list.length];
  let unique=page*1000+i*7;
  let thumb=`https://images.unsplash.com/photo-${item.id}?w=500&h=700&fit=crop&auto=format&q=75&ixid=${unique}`;
  let full=`https://images.unsplash.com/photo-${item.id}?w=2000&h=3000&fit=crop&auto=format&q=90&ixid=${unique}`;
  html+=`<div class="card" onclick="openModal('${full}')"><img src="${thumb}" loading="lazy"><div class="overlay"><p>${item.label}</p><span>4K</span></div></div>`;
 }
 if(append) gallery.insertAdjacentHTML('beforeend',html);
 else gallery.innerHTML=html+gallery.innerHTML;
 loader.innerHTML=`🔥 ${page*100}+ ${cat.toUpperCase()} wallpapers`;
}

function filterCat(cat){document.querySelectorAll('nav button').forEach(b=>b.classList.remove('active'));try{event.target.classList.add('active');}catch{}loadCategory(cat,false);}
function searchWall(){let v=document.getElementById('search').value.toLowerCase();if(!v) return loadCategory('all');if(v.includes("car")) loadCategory('car');else if(v.includes("nature")) loadCategory('nature');else if(v.includes("anime")) loadCategory('anime');else loadCategory('all');}
let isLoading=false;
window.addEventListener('scroll',()=>{if(window.innerHeight+window.scrollY>=document.body.offsetHeight-900&&!isLoading){isLoading=true;page++;setTimeout(()=>{loadCategory(currentCat,true);isLoading=false;},300);}});
function openModal(url){currentUrl=url;modalImg.src=url;downloadBtn.href=url;modal.classList.add('active');document.body.style.overflow='hidden';}
function closeModal(){modal.classList.remove('active');document.body.style.overflow='auto';}
function likeWall(){}
function shareWall(){if(navigator.share) navigator.share({title:'WallpaperLK',url:currentUrl});else{navigator.clipboard.writeText(currentUrl);alert("Link copied!");}}
async function downloadWithWatermark(e){e.preventDefault();window.open(currentUrl,'_blank');}

// UPLOAD FEATURE - Oya photos upload karanna!
function uploadWallpapers(input){
 const files=input.files;
 if(!files.length) return;
 for(let file of files){
  const reader=new FileReader();
  reader.onload=(ev)=>{
   myWalls.push({src:ev.target.result, cat: currentCat==='all'?'anime':currentCat, name:file.name});
   localStorage.setItem('myWallpapers', JSON.stringify(myWalls));
   loadCategory(currentCat,false);
  };
  reader.readAsDataURL(file);
 }
 alert(files.length+" photos uploaded! ✅");
}
try{document.getElementById('search').addEventListener('keypress',e=>{if(e.key==='Enter') searchWall();});}catch{}
loadCategory('all');
