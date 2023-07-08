import { ctcOverlayViewer } from 'ctc-gallery-viewer'; 
import { jsMasonry } from 'js-masonry';

window.addEventListener("DOMContentLoaded",()=>{

    Array.from(document.querySelectorAll('.mas-gal-gallery')).map(x=>{

        new jsMasonry(`#${x.getAttribute('id')}`, { percentWidth: true, elMargin: parseInt(x.getAttribute('data-gut-wd')),  callback: el => el.style.opacity = '' });
    });
   


new ctcOverlayViewer('.ctc-gal-overlay');


});