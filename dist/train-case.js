(() => {
 const dialog=document.querySelector('.image-dialog'),image=dialog.querySelector('img');let trigger;
 document.querySelectorAll('[data-lightbox]').forEach(button=>button.addEventListener('click',()=>{trigger=button;image.src=button.dataset.lightbox;image.alt=button.querySelector('img').alt;dialog.showModal();document.documentElement.classList.add('image-open');}));
 dialog.querySelector('[data-image-close]').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();});
 dialog.addEventListener('close',()=>{document.documentElement.classList.remove('image-open');trigger?.focus({preventScroll:true});});
 document.querySelector('[data-case-zoom]').addEventListener('click',e=>{const enabled=document.body.classList.toggle('zoomed');e.currentTarget.setAttribute('aria-pressed',String(enabled));});
})();
