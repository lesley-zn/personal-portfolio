const lightbox=document.querySelector('.lightbox');
document.querySelectorAll('[data-image]').forEach(button=>button.addEventListener('click',()=>{lightbox.querySelector('img').src=button.dataset.image;lightbox.showModal();document.body.classList.add('modal-open');}));
function closeImage(){lightbox?.close();document.body.classList.remove('modal-open');}
document.querySelector('.close-lightbox')?.addEventListener('click',closeImage);
lightbox?.addEventListener('click',event=>{if(event.target===lightbox)closeImage();});
lightbox?.addEventListener('close',()=>document.body.classList.remove('modal-open'));
