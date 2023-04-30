window.addEventListener('DOMContentLoaded', () => {


    Array.from(document.querySelectorAll('.mas-gal-gallery')).map(x=>{
        new jsMasonry(`#${x.getAttribute('id')}`, { percentWidth: true, elMargin: parseInt(x.getAttribute('data-gut-wd')),  callback: el => el.style.opacity = '' });
    });
   


new ctcOverlayViewer('.mas-gal-gallery');

   

    setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
})