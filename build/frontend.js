(()=>{"use strict";class e{constructor(e,t){Array.from(document.querySelectorAll(e)).map(((e,l)=>this.prepareGal(e,l,t))),window.addEventListener("resize",(e=>this.adjustApp(e))),window.addEventListener("keydown",(e=>this.onKeyStroke(e))),this.ssIntervalId=0}prepareGal(e,t){let l=Array.from(e.querySelectorAll("img"));l.forEach(((e,i)=>e.addEventListener("click",(e=>this.createOverlay(event.target,i,l,t)))))}createOverlay(e,t,l,i){let r=window.innerWidth+1,n=window.innerHeight+1,o=1<l.length?.94:1,a=1<l.length?.04:0,s=document.createElement("style");s.id="ctc-scroll-css",s.innerHTML="::-webkit-scrollbar-track {background: rgba(255, 255, 255, 1);} ::-moz-scrollbar-track { background: rgba(255, 255, 255, 1);} #gal-sidebar::-webkit-scrollbar {display: none;} #gal-sidebar::-moz-scrollbar {display: none;}",document.querySelector("head").appendChild(s),document.body.style.overflow="hidden";let d=document.createElement("div");d.id="gallery-overlay",d.style=`position:fixed;height:${n}px;width:${r}px;background-color:rgba(0,0,0,.6);z-index:100000;top:0%;left:0%;right:0%;bottom:0%;`,document.body.insertBefore(d,document.body.firstChild);let c=document.createElement("span");c.id="overlay-close-btn",c.title="Close",c.innerHTML="&#10539;",c.style=`cursor:pointer;position:absolute;float:right;right:3px;font-size:${.016*r}px;color:rgba(255,255,255,1);text-shadow:-1px -1px 1px rgba(0,0,0,1);z-index:200000;`,d.appendChild(c),c.addEventListener("click",(()=>this.closeOverlay(d)));let g=document.createElement("span");g.id="image-loading-main",g.style=`left:${.992*r/2};top:${n/2};font-size:${.016*r}px;display:inline-block;position:fixed;color:rgba(255,255,255,1);`,g.innerHTML="Loading",d.appendChild(g);let h=setInterval((()=>{switch(g.innerHTML){case"Loading":case"Loading...<b>.</b>":g.innerHTML="Loading<b>.</b>";break;case"Loading<b>.</b>":g.innerHTML="Loading.<b>.</b>";break;case"Loading.<b>.</b>":g.innerHTML="Loading..<b>.</b>";break;case"Loading..<b>.</b>":g.innerHTML="Loading...<b>.</b>"}}),350),p=document.createElement("img"),u=new Image;u.src=e.src,p.id="loaded-img",p.src=e.src,p.style.display="none";let m=this.getOptimizedImageSize(r,n,u.width,u.height,l.length);u.addEventListener("load",(t=>{clearInterval(h),g.style.display="none",p.style=`z-index:180000;height:${m.height}px;width:${m.width}px;display:inline-block;margin:${(n-m.height)/2}px ${(o*r-m.width)/2}px;`,p.title=null!=e.getAttribute("title")||null!=e.getAttribute("title")?e.getAttribute("title"):""})),d.appendChild(p);let f=document.createElement("div");f.id="img-title-info",f.style=`z-index:195000;position:fixed;text-align:center;height:${.02*n}px;width:${m.width}px;bottom:1px;color:rgba(255,255,255,1);font-size:${.015*n};left:${a*r+(o*r-m.width)/2}px;`,f.innerHTML=null!=e.getAttribute("title")||null!=e.getAttribute("title")?e.getAttribute("title"):"",d.appendChild(f),1<l.length&&(this.createToolbar(d,l,p,t,i),this.createSidebar(d,l,p,t,i),p.addEventListener("click",(e=>{e.offsetX>e.target.offsetWidth/2?document.querySelector("#gal-next-img").click():document.querySelector("#gal-prev-img").click()})))}createToolbar(e,t,l,i,r){let n=e.querySelector("#toolbar-div"),o=e.offsetWidth,a=e.offsetHeight,s=t.length-1>=i+1?i+1:0,d=0<=i-1?i-1:t.length-1,c=`font-family:serif;height:${.02*o}px;width:${.02*o}px;text-align:center;font-size:${.016*o}px;cursor:pointer;color:rgba(255,255,255,1);border-radius:${.02*o}px;margin-top:${.002*o}px;background-color:rgba(0,0,0,0.8);`;if(null==n){let i=document.createElement("div");i.id="toolbar-div",i.style=`top:${a/1.6-.077*o}px;float:right; transform: translateY(-50%); right: 0px;display: inline-block;position: fixed;`;let r=document.createElement("div");r.id="gal-prev-img",r.style=c,r.innerHTML="&#60;",r.title="Previous image",r.addEventListener("click",(i=>this.loadImg(parseInt(i.target.getAttribute("data-img-num")),t,e,l))),r.setAttribute("data-img-num",d),r.addEventListener("mouseenter",(e=>e.target.style.fontWeight="bolder")),r.addEventListener("mouseleave",(e=>e.target.style.fontWeight="")),i.insertBefore(r,i.firstChild);let n=document.createElement("div");n.id="img-zoom-in",n.style=c,n.innerHTML="&#43;",n.title="Zoom in",n.addEventListener("click",(()=>l.style.transform=0===l.style.transform.length?"scale(1.2)":`scale(${parseFloat(l.style.transform.replace("scale(","").replace(")",""))+.2})`)),n.addEventListener("mouseenter",(e=>e.target.style.fontWeight="bolder")),n.addEventListener("mouseleave",(e=>e.target.style.fontWeight="")),i.appendChild(n);let g=document.createElement("div");g.id="img-zoom-out",g.style=c,g.innerHTML="&#8722;",g.title="Zoom out",g.addEventListener("click",(()=>{let e=parseFloat(l.style.transform.replace("scale(","").replace(")",""))-.2,t=0>e?.1:e;l.style.transform=0===l.style.transform.length?"scale(0.8)":`scale(${t})`})),g.addEventListener("mouseenter",(e=>e.target.style.fontWeight="bolder")),g.addEventListener("mouseleave",(e=>e.target.style.fontWeight="")),i.appendChild(g);let h=document.createElement("div");h.id="gal-next-img",h.style=c,h.innerHTML="&#62;",h.title="Next image",h.addEventListener("click",(i=>this.loadImg(parseInt(i.target.getAttribute("data-img-num")),t,e,l))),h.setAttribute("data-img-num",s),h.addEventListener("mouseenter",(e=>e.target.style.fontWeight="bolder")),h.addEventListener("mouseleave",(e=>e.target.style.fontWeight="")),i.appendChild(h),e.appendChild(i)}else{let t=e.querySelector("#image-loading-main");null!=t&&e.removeChild(t),n.querySelector("#gal-prev-img").setAttribute("data-img-num",d),n.querySelector("#gal-next-img").setAttribute("data-img-num",s)}}createSidebar(e,t,l,i,r){let n=document.createElement("div");n.id="gal-sidebar",n.style=`overflow-y:auto;tex-align:center;display:inline-block;width:${.04*e.offsetWidth}px;height:${e.offsetHeight}px;float:left;left:0;background-color:rgba(0,0,0,0.1);z-index:105000;`,e.appendChild(n);let o=`overflow-x: hidden;transition: width 0.5s, height 0.5s;cursor:pointer;background-color:rgba(255,255,255,1);width:93%;height:${.93*n.offsetWidth}px;border:1px dotted rgba(0,0,0,0.8);background-repeat: no-repeat;background-size:contain;background-position: center;text-align:center;color:rgba(0,0,0,1);font-size:${.6*n.offsetWidth}px;`;t.map(((i,r)=>{let a=new Image;a.src=i.src;let s=document.createElement("div");s.classList.add("img-preview"),s.title=null!=i.getAttribute("title")||null!=i.getAttribute("title")?i.getAttribute("title"):"",s.style=o,s.addEventListener("mouseenter",(e=>e.target.style.borderRadius="12%")),s.addEventListener("mouseleave",(e=>e.target.style.borderRadius="5%")),s.innerHTML="<b>.</b>",n.appendChild(s);let d=setInterval((()=>{switch(s.innerHTML){case"<b>.</b>":s.innerHTML="<b>.</b>.";break;case"<b>.</b>.":s.innerHTML=".<b>.</b>.";break;case".<b>.</b>.":s.innerHTML="...<b>.</b>";break;case"...<b>.</b>":s.innerHTML="<b>.</b>"}}),250);a.addEventListener("load",(e=>{clearInterval(d),s.innerHTML="",s.style.backgroundImage=`url('${e.target.src}')`})),s.addEventListener("click",(()=>this.loadImg(r,t,e,l)))})),this.scrollToPrev(i),n.style.paddingTop=0<(e.offsetHeight-t.length*(.93*n.offsetWidth+2))/2?(e.offsetHeight-t.length*(.93*n.offsetWidth+2))/2+"px":"0px"}loadImg(e,t,l,i){var r=new Image;r.src=t[e].src,i.src=t[e].src,i.style.display="none";let n=document.createElement("span");n.id="image-loading-main",n.style=`left:${.992*l.offsetWidth/2};top:${l.offsetHeight/2};font-size:${.016*l.offsetWidth}px;display:inline-block;position:fixed;color:rgba(255,255,255,1);`,n.innerHTML="Loading",l.appendChild(n);let o=setInterval((()=>{switch(n.innerHTML){case"Loading":case"Loading...<b>.</b>":n.innerHTML="Loading<b>.</b>";break;case"Loading<b>.</b>":n.innerHTML="Loading.<b>.</b>";break;case"Loading.<b>.</b>":n.innerHTML="Loading..<b>.</b>";break;case"Loading..<b>.</b>":n.innerHTML="Loading...<b>.</b>"}}),350),a=this.getOptimizedImageSize(l.offsetWidth,l.offsetHeight,r.width,r.height,t.length);r.addEventListener("load",(()=>{clearInterval(o),n.style.display="none",i.style=`z-index:180000;height:${a.height}px;width:${a.width}px;display:inline-block;margin:${(l.offsetHeight-a.height)/2}px ${(.94*l.offsetWidth-a.width)/2}px;`,i.title=null!=t[e].getAttribute("title")||null!=t[e].getAttribute("title")?t[e].getAttribute("title"):""}));let s=document.querySelector("#img-title-info");s.style.overflow,s.innerHTML=null!=t[e].getAttribute("title")||null!=t[e].getAttribute("title")?t[e].getAttribute("title"):"",s.style.width=a.width+"px",s.style.left=.04*l.offsetWidth+(.94*l.offsetWidth-a.width)/2+"px",this.createToolbar(l,t,i,e),this.scrollToPrev(e)}scrollToPrev(e){Array.from(document.querySelectorAll(".img-preview")).forEach(((t,l)=>{l===e?(t.scrollIntoView({block:"center"}),t.style.border="1px solid rgba(255, 0, 0, 0.8)"):t.style.border="1px solid rgba(0,0,0,0.8)"}))}adjustApp(e){let t=window.innerWidth,l=window.innerHeight,i=document.querySelector("#gallery-overlay");if(null!=i){let e=i.querySelector("#overlay-close-btn");i.style.height=`${l}px`,i.style.width=`${t}px`,e.style.fontSize=""+.016*t;let r=document.querySelector("#loaded-img"),n=document.querySelector("#gal-sidebar"),o=null!=n?2:1,a=null!=n?.94:1,s=null!=n?.04:0,d=i.querySelector("#image-loading-main");d.style.left=""+.992*t/2,d.style.top=""+l/2,d.style.fontSize=.016*t+"px";let c=new Image;c.src=r.src;let g=this.getOptimizedImageSize(t,l,c.width,c.height,o),h=r.style.display;r.style=`height:${g.height}px;width:${g.width}px;display:${h};margin:${(l-g.height)/2}px ${(a*t-g.width)/2}px;`;let p=document.querySelector("#img-title-info");if(p.style.overflow="hidden",p.style.width=g.width+"px",p.style.height=.02*l+"px",p.style.left=s*t+(a*t-g.width)/2+"px",p.style.fontSize=.015*l+"px",null!=n){let e=Array.from(n.querySelectorAll("div"));n.style.height=l+"px",n.style.width=.04*t+"px",n.style.paddingTop=0<(l-e.length*(.93*n.offsetWidth+2))/2?(l-e.length*(.93*n.offsetWidth+2))/2+"px":"0px",e.map((e=>{e.style.height=.93*n.offsetWidth+"px",e.style.fontSize=.6*n.offsetWidth+"px"}));let r=i.querySelector("#toolbar-div");r.style=`top:${l/1.8-.077*t}px;float:right;right: 0px;display: inline-block;position: fixed;`,Array.from(r.querySelectorAll("div")).map((e=>{e.style.height=.02*t+"px",e.style.width=.02*t+"px",e.style.borderRadius=.02*t+"px",e.style.marginTop=.002*t+"px",e.style.fontSize="gal-slide-show"!=e.id?.016*t+"px":.011*t+"px"}))}}}closeOverlay(e){let t=e.querySelector("#gal-slide-show");null!=t&&0<parseInt(t.getAttribute("data-interval-id"))&&clearInterval(parseInt(t.getAttribute("data-interval-id"))),document.body.removeChild(e),document.body.style.overflow="",document.body.style.margin="",document.querySelector("head").removeChild(document.querySelector("#ctc-scroll-css"))}getOptimizedImageSize(e,t,l,i,r){let n=0,o=0,a=0,s=0,d=null!=r&&1<r?.93:.955,c=1-d;if(l>=e&&i>=t)l>=i?l>i?(o=l/e,s=l/o-c*e,a=i*(s/l),a>=d*t&&(n=t/i,a=i*n-c*t,s=l*(a/i))):e>t?(a=d*t,s=a):t>e?(s=d*e,a=s):(n=t/i,a=i*n-c*t,s=l*(a/i)):(n=i/t,a=i/n-c*t,s=l*(a/i));else if(l>=e&&i<t)o=e/l,s=l*o-c*e,a=i*(s/l);else if(i>=t&&l<e)n=t/i,a=i*n-c*t,s=l*(a/i),a=i*(s/l);else{let r=d*e,o=d*t;l>=r&&i>=o?(imgAvlHtRatio=o/i,s=r*(r/l),a=t*n):l>=r&&i<o?(s=l*(r/l),a=i*(s/l)):i>=o&&l<r?(a=i*(o/i),s=l*(a/i)):(s=l,a=i),a=i*(s/l)}return s>d*e&&(s=d*e,a=i*(s/l)),{width:s,height:a}}onKeyStroke(e){let t=document.querySelector("#gallery-overlay");if(null!=t)switch(e.code){case"ArrowUp":document.querySelector("#img-zoom-in").click();break;case"ArrowDown":document.querySelector("#img-zoom-out").click();break;case"ArrowLeft":document.querySelector("#gal-prev-img").click();break;case"ArrowRight":document.querySelector("#gal-next-img").click();break;case"Escape":t.querySelector("#overlay-close-btn").click()}}}class t{constructor(e,t){this.prepMas(e,t)}prepMas(e,t){let l=Array.from(document.querySelectorAll(e)),i=0;l.map((e=>{let l=null!=t&&null!=t.elSelector?e.querySelector(t.elSelector):e.children[0];if(null!=l){let r=null!=t&&null==t.elWidth&&!0===t.percentWidth?l.offsetWidth/e.offsetWidth:null;this.layBrks(e,t,r),i++,window.addEventListener("resize",(()=>this.layBrks(e,t,r,event)))}})),1<i&&window.dispatchEvent(new Event("resize"))}layBrks(e,t,l,i){let r=null!=t&&null!=t.elSelector?Array.from(e.querySelectorAll(t.elSelector)):Array.from(e.children),n=e.offsetWidth,o=null!=t&&null!=t.elWidth?t.elWidth:null!=l||null!=l?n*l:r[0].offsetWidth,a=null!=t&&null!=t.elMargin?t.elMargin:0,s=(n-a)/(o+a),d=Math.floor(s),c=((s-d)*o+(s+1)*a)/(d+1),g=Array(),h=Array(),p=Array(),u=Array();for(let t=0;t<=d-1;t++)h.push(e.offsetTop+a),g.push([e.offsetTop+a,e.offsetLeft+t*o+(t+1)*c]);if(null!=t&&null!=t.heightSort){for(let e in r)p.push(r[e].offsetHeight);"DESC"==t.heightSort.toUpperCase()?p.sort(((e,t)=>t-e)):"ASC"==t.heightSort.toUpperCase()&&p.sort(((e,t)=>e-t));for(let e in p)for(let t in r)r[t].offsetHeight==p[e]&&u.push(r.splice(t,1)[0])}else u=r;u.map(((l,r)=>{let n=1;g.map(((e,t)=>{if(h[0]===e[0]&&1===n)if(l.style.width=`${o}px`,l.style.position="absolute",l.style.left=`${e[1]}px`,l.style.top=`${e[0]}px`,n++,"img"===l.nodeName.toLowerCase()){l.style.height="";let i=o/l.offsetWidth*l.offsetHeight;l.style.height=`${i}px`,h[0]=e[0]+i+c,g[t]=[e[0]+i+c,e[1]],h.sort(((e,t)=>e-t))}else h[0]=e[0]+l.offsetHeight+c,g[t]=[e[0]+l.offsetHeight+c,e[1]],h.sort(((e,t)=>e-t))})),r===u.length-1&&(h.sort(((e,t)=>t-e)),e.style.height=h[0]-e.offsetTop+a+"px",null==i&&(null!=t?"function"==typeof t.callback&&t.callback(e):window.dispatchEvent(new Event("resize"))))}))}}window.addEventListener("DOMContentLoaded",(()=>{Array.from(document.querySelectorAll(".mas-gal-gallery")).map((e=>{console.log(e),new t(`#${e.getAttribute("id")}`,{percentWidth:!0,elMargin:parseInt(e.getAttribute("data-gut-wd")),callback:e=>e.style.opacity=""})})),new e(".mas-gal-gallery")}))})();