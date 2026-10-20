let currentModalUrl = "";

function openModal(url){
  currentModalUrl = url;
  modalImg.crossOrigin = "anonymous";
  modalImg.src=url;
  downloadBtn.href=url;
  const v = document.getElementById('views');
  const l = document.getElementById('likes');
  const d = document.getElementById('downs');
  if(v) v.innerText = (Math.random()*5+0.5).toFixed(1)+'k';
  if(l) l.innerText = Math.floor(Math.random()*900+100);
  if(d) d.innerText = Math.floor(Math.random()*2000+500);
  modal.classList.add('active');
  document.body.style.overflow='hidden';
}
function closeModal(){ 
  modal.classList.remove('active'); 
  document.body.style.overflow='auto';
}

function likeWall(){ 
  const el = document.getElementById('likes');
  if(el) el.innerText = parseInt(el.innerText)+1;
  event.target.innerText="❤️ Liked!";
}
function shareWall(){
  if(navigator.share) navigator.share({title:'WallpaperLK 🔥 - 4K Wallpaper', text:'Best 4K wallpaper from WallpaperLK.lk', url: currentModalUrl});
  else { navigator.clipboard.writeText(currentModalUrl); alert("Link copy kala! 📋 Share karanna!"); }
}

// WATERMARK FUNCTION - Patta!
async function downloadWithWatermark(e){
  e.preventDefault();
  const btn = document.getElementById('download-wm-btn');
  btn.innerText = "⏳ Watermark danawa...";
  
  try{
    const canvas = document.getElementById('wm-canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = currentModalUrl;
    
    await new Promise((res, rej)=>{
      img.onload = res;
      img.onerror = ()=>{
        // CORS fail unoth direct download
        window.open(currentModalUrl, '_blank');
        btn.innerText = "💎 Download with Watermark (Viral)";
        rej();
      };
      setTimeout(rej, 5000);
    });
    
    canvas.width = img.width;
    canvas.height = img.height;
    
    // Draw image
    ctx.drawImage(img, 0, 0);
    
    // Watermark style - Premium
    const fontSize = Math.floor(canvas.width * 0.04);
    ctx.font = `900 ${fontSize}px Inter, sans-serif`;
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.strokeStyle = "rgba(0,0,0,0.8)";
    ctx.lineWidth = fontSize * 0.15;
    
    // Bottom right
    const text = "WallpaperLK.lk";
    const textWidth = ctx.measureText(text).width;
    const x = canvas.width - textWidth - fontSize;
    const y = canvas.height - fontSize;
    
    // Background blur box
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(x-20, y-fontSize-10, textWidth+40, fontSize+30);
    
    // Text
    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.strokeStyle = "rgba(0,0,0,0.7)";
    ctx.lineWidth = 3;
    ctx.strokeText(text, x, y);
    ctx.fillText(text, x, y);
    
    // Small logo top left
    ctx.font = `700 ${fontSize*0.6}px Inter`;
    ctx.fillStyle = "rgba(255,61,0,0.9)";
    ctx.fillText("🔥 WallpaperLK", fontSize, fontSize*1.5);
    
    // Download
    const link = document.createElement('a');
    link.download = `WallpaperLK-4K-${Date.now()}.jpg`;
    link.href = canvas.toDataURL('image/jpeg', 0.92);
    link.click();
    
    btn.innerText = "✅ Downloaded with Watermark!";
    setTimeout(()=>btn.innerText="💎 Download with Watermark (Viral)", 2000);
    
    // Update count
    const d = document.getElementById('downs');
    if(d) d.innerText = parseInt(d.innerText)+1;
    
  } catch(err){
    console.log("Watermark fail, direct download");
    window.open(currentModalUrl, '_blank');
    btn.innerText = "💎 Download with Watermark (Viral)";
  }
}
