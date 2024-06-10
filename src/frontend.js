import { ctcOverlayViewer } from 'ctc-gallery-viewer'; 
import { jsMasonry } from 'js-masonry';

window.addEventListener("DOMContentLoaded",()=>{

    Array.from(document.querySelectorAll('.mas-gal-gallery')).map(x=>{



        let imgArr =Array.from( x.querySelectorAll('img'));
    
        imgArr.map((y,i)=>{

            let img = new Image();
            img.src = y.src;

            img.addEventListener('load',(e)=>{
                if(i==imgArr.length-1){
                    new jsMasonry(`#${x.getAttribute('id')}`, { percentWidth: true, elMargin: parseInt(x.getAttribute('data-gut-wd')),  callback: el => el.style.opacity = '' });
                }
            })

        })
       
    });
   
new ctcOverlayViewer('.ctc-gal-overlay');

});