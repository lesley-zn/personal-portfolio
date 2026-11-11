(() => {
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const dialog=document.querySelector('.contact-dialog');let previousFocus;
 function openContact(message='欢迎通过邮箱或电话与我联系。'){
  if(!dialog||dialog.open)return;previousFocus=document.activeElement;
  dialog.querySelector('.contact-note').textContent=message;
  dialog.showModal();document.documentElement.classList.add('is-contact-open');
 }
 document.querySelectorAll('.contact-button').forEach(b=>b.addEventListener('click',()=>openContact()));
 document.querySelectorAll('[data-contact]').forEach(b=>b.addEventListener('click',()=>openContact(b.dataset.contact)));
 dialog?.querySelector('.contact-dialog-close').addEventListener('click',()=>dialog.close());
 dialog?.addEventListener('click',e=>{const r=dialog.getBoundingClientRect();if(e.target===dialog&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))dialog.close();});
 dialog?.addEventListener('close',()=>{document.documentElement.classList.remove('is-contact-open');previousFocus?.focus({preventScroll:true});});
 const message=document.querySelector('.tool-panel-message');
 document.querySelectorAll('.tool-action').forEach(b=>b.addEventListener('click',()=>{
  const repeat=b.classList.contains('is-selected');
  document.querySelectorAll('.tool-action').forEach(x=>{const active=x===b&&!repeat;x.classList.toggle('is-selected',active);x.setAttribute('aria-pressed',String(active));});
  if(message){message.textContent=repeat?'':b.dataset.toolMessage;message.classList.toggle('is-visible',!repeat);message.setAttribute('aria-hidden',String(repeat));}
 }));
 const star=document.querySelector('.star-toggle');
 if(star){const outline=star.getAttribute('src');const toggle=()=>{const state=star.getAttribute('aria-pressed')!=='true';star.setAttribute('aria-pressed',String(state));star.src=state?star.dataset.filledSrc:outline;};star.addEventListener('click',toggle);star.addEventListener('keydown',e=>{if(['Enter',' '].includes(e.key)){e.preventDefault();toggle();}});}
 const card=document.querySelector('.about-profile-card'),photo=card?.querySelector('.about-card-photo-image'),follow=card?.querySelector('.about-follow-button');
 if(follow&&photo){const initial=photo.src;let busy=false,following=false;follow.addEventListener('click',()=>{if(busy)return;busy=true;follow.disabled=true;card.classList.add('is-flipping');setTimeout(()=>{following=!following;photo.src=following?photo.dataset.followedSrc:initial;photo.alt='朱宁的个人照片';follow.textContent=following?'已关注':'关注';follow.setAttribute('aria-pressed',String(following));card.classList.toggle('is-following',following);},reduced.matches?0:390);setTimeout(()=>{card.classList.remove('is-flipping');follow.disabled=false;busy=false;},reduced.matches?20:780);});}
 const dock=document.querySelector('.site-dock');let lastY=scrollY;
 addEventListener('wheel',e=>{if(!dialog?.open&&dock){if(e.deltaY>0)dock.classList.add('is-hidden');if(e.deltaY<0)dock.classList.remove('is-hidden');}},{passive:true});
 addEventListener('scroll',()=>{if(dock&&!dialog?.open){const delta=scrollY-lastY;if(delta>3)dock.classList.add('is-hidden');if(delta<-3||scrollY<2)dock.classList.remove('is-hidden');lastY=scrollY;}},{passive:true});
 const artboard=document.querySelector('.case-artboard'),zoom=document.querySelector('[data-case-zoom]');
 function setZoom(state){if(!artboard||!zoom)return;const before=artboard.getBoundingClientRect(),x=(innerWidth/2-before.left)/before.width,y=(innerHeight/2-before.top)/before.width;document.body.classList.toggle('is-case-zoomed',state);zoom.setAttribute('aria-pressed',String(state));const label=state?'适应屏宽':'放大查看';zoom.setAttribute('aria-label',label);zoom.querySelector('.case-tool-tip').textContent=label;zoom.querySelector('img').src='./assets/ui/'+(state?'fit.svg':'zoom-in.svg');const after=artboard.getBoundingClientRect();scrollTo({left:Math.max(0,scrollX+after.left+x*after.width-innerWidth/2),top:Math.max(0,scrollY+after.top+y*after.width-innerHeight/2),behavior:'instant'});}
 zoom?.addEventListener('click',()=>setZoom(zoom.getAttribute('aria-pressed')!=='true'));
 document.querySelector('[data-case-top]')?.addEventListener('click',e=>{e.preventDefault();scrollTo({top:0,left:0,behavior:reduced.matches?'instant':'smooth'});});
 const imageDialog=document.querySelector('.image-dialog');let imageTrigger;
 document.querySelectorAll('[data-lightbox]').forEach(b=>b.addEventListener('click',()=>{imageTrigger=b;imageDialog.querySelector('img').src=b.dataset.lightbox;imageDialog.showModal();document.documentElement.classList.add('is-image-open');}));
 document.querySelector('[data-image-close]')?.addEventListener('click',()=>imageDialog.close());
 imageDialog?.addEventListener('click',e=>{if(e.target===imageDialog)imageDialog.close();});
 imageDialog?.addEventListener('close',()=>{document.documentElement.classList.remove('is-image-open');imageTrigger?.focus({preventScroll:true});});
 addEventListener('keydown',e=>{if(e.key==='Escape'&&!imageDialog?.open&&zoom?.getAttribute('aria-pressed')==='true')setZoom(false);});
 document.querySelectorAll('[data-video-player]').forEach(player=>{
  const video=player.querySelector('video'),state=player.querySelector('[data-video-state]'),progress=player.querySelector('[data-video-progress]'),time=player.querySelector('[data-video-time]'),mute=player.querySelector('[data-video-mute]'),full=player.querySelector('[data-video-fullscreen]'),status=player.parentElement.querySelector('[data-video-status]');
  const report=text=>{status.textContent=text;status.hidden=false;};
  const format=n=>Number.isFinite(n)?`${Math.floor(n/60).toString().padStart(2,'0')}:${Math.floor(n%60).toString().padStart(2,'0')}`:'00:00';
  const update=()=>{const ready=Number.isFinite(video.duration)&&video.duration>0;progress.disabled=!ready;progress.value=ready?video.currentTime/video.duration*100:0;time.textContent=`${format(video.currentTime)} / ${format(video.duration)}`;};update();
  player.querySelectorAll('[data-video-toggle]').forEach(b=>b.addEventListener('click',async()=>{if(!video.getAttribute('src')&&!video.querySelector('source')){report('视频位置已预留，添加素材后可播放。');return;}try{if(video.paused)await video.play();else video.pause();}catch{report('视频暂时无法播放，请重试。');}}));
  ['play','pause','ended'].forEach(event=>video.addEventListener(event,()=>{const playing=!video.paused&&!video.ended;player.classList.toggle('is-playing',playing);state.textContent=playing?'暂停':'播放';player.querySelectorAll('[data-video-toggle]').forEach(b=>b.setAttribute('aria-label',playing?'暂停项目视频':'播放项目视频'));if(playing){status.hidden=true;player.querySelector('.video-slot-caption').hidden=true;}}));
  ['timeupdate','loadedmetadata','durationchange'].forEach(event=>video.addEventListener(event,update));
  progress.addEventListener('input',()=>{if(Number.isFinite(video.duration))video.currentTime=Number(progress.value)/100*video.duration;});
  mute.addEventListener('click',()=>{video.muted=!video.muted;mute.setAttribute('aria-pressed',String(video.muted));mute.querySelector('[data-video-mute-label]').textContent=video.muted?'声音':'静音';});
  full.addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await player.requestFullscreen();}catch{report('当前浏览器无法进入全屏。');}});
  document.addEventListener('fullscreenchange',()=>{full.textContent=document.fullscreenElement===player?'退出':'全屏';});
 });
 if(!reduced.matches&&'IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(e=>e.target.classList.toggle('is-before-reveal',!e.isIntersecting&&e.boundingClientRect.top>0)),{threshold:0,rootMargin:'0px 0px -6% 0px'});document.querySelectorAll('.hero-title-line,.projects-heading-copy>*,.project-card,.about-copy p,.bio-story>h1,.bio-story>h2,.bio-story>p,.project-index-card').forEach(el=>{el.classList.add('native-reveal');observer.observe(el);});document.addEventListener('focusin',e=>e.target.closest('.native-reveal')?.classList.remove('is-before-reveal'));}
 let particleCount=0;
 document.addEventListener('click',e=>{if(reduced.matches||!e.detail||e.button!==0||e.target.closest('input,textarea,select,.site-dock,.contact-dialog,.image-dialog'))return;const count=innerWidth<700?18:24;if(particleCount>80)return;for(let i=0;i<count;i++){const el=document.createElement('i');el.className='click-particle-native';el.style.left=e.clientX+'px';el.style.top=e.clientY+'px';if(i%3===0)el.style.clipPath='polygon(50% 0,100% 100%,0 100%)';else if(i%3===1)el.style.borderRadius='50%';document.body.append(el);particleCount++;const a=i/count*Math.PI*2,r=50+Math.random()*90;el.animate([{transform:'translate(-50%,-50%) scale(1)',opacity:1},{transform:`translate(${Math.cos(a)*r}px,${Math.sin(a)*r+65}px) rotate(${Math.random()*360}deg) scale(.2)`,opacity:0}],{duration:800+Math.random()*250,easing:'cubic-bezier(.15,.5,.45,1)'}).onfinish=()=>{el.remove();particleCount--;};}});
})();
