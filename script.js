const gallery=document.getElementById('gallery');
const loader=document.getElementById('loader');
const modal=document.getElementById('modal');
const modalImg=document.getElementById('modal-img');
const downloadBtn=document.getElementById('download-btn');
let currentCat='all',page=1,currentUrl="";

const WALLS={
 car:[{id:"1494976388531-d1058494cdd8",label:"🚗 BMW M4"},{id:"1503376780353-7e6692767b70",label:"🚗 Supra"},{id:"1552519507-da3b142c6e3d",label:"🚗 GTR"},{id:"1492144534655-ae79c964c9d7",label:"🚗 Porsche"},{id:"1503736334956-4c8ff8e9299d",label:"🚗 Drift"},{id:"1544636331-e26879cd4d9b",label:"🚗 Ferrari"}],
 nature:[{id:"1506744038136-46273834b3fb",label:"🏔️ Mountain"},{id:"1441974231531-c6227db76b6e",label:"🌲 Forest"},{id:"1470071459604-3b5ec3a7fe05",label:"🌅 Sunset"},{id:"1426604966848-d7adac402bff",label:"🏞️ Lake"},{id:"1501854140801-50d01698950b",label:"🌊 Waterfall"}],
 aesthetic:[{id:"1519125323398-675f0ddb6308",label:"💜 Aesthetic"},{id:"1518837695005-2083093ee35b",label:"💜 Vibes"},{id:"1531685250784-7569952593d2",label:"💜 Mood"}],
 dark:[{id:"1534447677768-be436bb09401",label:"🖤 Amoled"},{id:"1531306728370-e2ebd9d7bb99",label:"🖤 Black"},{id:"1505506874110-6a7a69069a08",label:"🖤 Night"}]
};

function loadCategory(cat, append=false){
 if(!append){page=1;currentCat=cat;gallery.innerHTML=`<p style="padding:20px;text-align:center;color:#888">🔥 Loading ${cat}...</p>`;}
 if(!append) gallery.innerHTML="";
 let html="";
 let list=cat==='all'?[...WALLS.car,...WALLS.nature,...WALLS.aesthetic,...WALLS.dark]:WALLS[cat]||WALLS.car;
 for(let i=0;i<100;i++){
  let item=list[i%list.length]; let u=page*1000+i*7;
  let thumb=`https://images.unsplash.com/photo-${item.id}?w=500&h=700&fit=crop&q=75&ixid=${u}`;
  let full=`https://images.unsplash.com/photo-${item.id}?w=2000&h=3000&fit=crop&q=90&ixid=${u}`;
  html+=`<div style="border-radius:12px;overflow:hidden;position:relative;cursor:pointer" onclick="openModal('${full}')"><img src="${thumb}" loading="lazy" style="width:100%;height:250px;object-fit:cover"><div style="position:absolute;bottom:0;background:linear-gradient(transparent,black);width:100%;padding:8px;color:white"><p>${item.label}</p><span>4K</span></div></div>`;
 }
 if(append) gallery.insertAdjacentHTML('beforeend',html); else gallery.innerHTML=html;
 loader.innerHTML=`🔥 ${page*100}+ ${cat.toUpperCase()} wallpapers`;
}
function filterCat(cat){document.querySelectorAll('nav button').forEach(b=>b.classList.remove('active'));try{event.target.classList.add('active');}catch{}loadCategory(cat,false);}
function searchWall(){let v=document.getElementById('search').value.toLowerCase();if(!v) return loadCategory('all');if(v.includes("car")) loadCategory('car');else if(v.includes("nature")) loadCategory('nature');else loadCategory('all');}
let isLoading=false;
window.addEventListener('scroll',()=>{if(window.innerHeight+window.scrollY>=document.body.offsetHeight-900&&!isLoading){isLoading=true;page++;setTimeout(()=>{loadCategory(currentCat,true);isLoading=false;},300);}});

function openModal(url){
 currentUrl=url;
 modalImg.src=url;
 downloadBtn.href=url;
 modal.style.display="flex";
 document.body.style.overflow='hidden';
 try{
  document.getElementById('views').innerText=(Math.random()*5+0.5).toFixed(1)+'k';
  document.getElementById('likes').innerText=Math.floor(Math.random()*900+100);
  document.getElementById('downs').innerText=Math.floor(Math.random()*2000+500);
 }catch{}
}
function closeModal(){modal.style.display="none";document.body.style.overflow='auto';}
function likeWall(){try{let l=document.getElementById('likes');l.innerText=parseInt(l.innerText)+1;alert("❤️ Liked!");}catch{}}
function shareWall(){if(navigator.share){navigator.share({title:'WallpaperLK 🔥',url:currentUrl});}else{navigator.clipboard.writeText(currentUrl);alert("Link copied! 📋");}}

async function downloadWithWatermark(e){
 e.preventDefault();
 try{
  loader.innerHTML="⏳ Adding watermark...";
  const canvas=document.getElementById('wm-canvas');
  const ctx=canvas.getContext('2d');
  const img=new Image();
  img.crossOrigin="anonymous";
  img.src=currentUrl;
  await new Promise((res,rej)=>{img.onload=res;img.onerror=rej;});
  canvas.width=img.width;
  canvas.height=img.height;
  ctx.drawImage(img,0,0);
  ctx.font=`bold ${Math.floor(canvas.width/22)}px Arial`;
  ctx.fillStyle="rgba(255,255,255,0.7)";
  ctx.strokeStyle="rgba(0,0,0,0.5)";
  ctx.lineWidth=3;
  let text="WallpaperLK.lk";
  let x=canvas.width - ctx.measureText(text).width - 40;
  let y=canvas.height - 40;
  ctx.strokeText(text,x,y);
  ctx.fillText(text,x,y);
  ctx.font=`${Math.floor(canvas.width/35)}px Arial`;
  ctx.fillStyle="rgba(255,255,255,0.5)";
  ctx.fillText("🔥 4K HD",30,canvas.height-30);
  const link=document.createElement('a');
  link.download=`WallpaperLK_${Date.now()}.jpg`;
  link.href=canvas.toDataURL('image/jpeg',0.9);
  link.click();
  loader.innerHTML=`🔥 ${page*100}+ ${currentCat.toUpperCase()} wallpapers`;
 }catch(err){window.open(currentUrl,'_blank');}
}
loadCategory('all');
