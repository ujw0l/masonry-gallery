(()=>{"use strict";var e,t={564:()=>{const e=window.wp.blocks,t=window.wp.element,l=window.React,r=window.wp.components;class a{constructor(e,t){this.prepMas(e,t)}prepMas(e,t){let l=Array.from(document.querySelectorAll(e)),r=0;l.map((e=>{let l=null!=t&&null!=t.elSelector?e.querySelector(t.elSelector):e.children[0];if(null!=l){let a=null!=t&&null==t.elWidth&&!0===t.percentWidth?l.offsetWidth/e.offsetWidth:null;this.layBrks(e,t,a),r++,window.addEventListener("resize",(()=>this.layBrks(e,t,a,event)))}})),1<r&&window.dispatchEvent(new Event("resize"))}layBrks(e,t,l,r){let a=null!=t&&null!=t.elSelector?Array.from(e.querySelectorAll(t.elSelector)):Array.from(e.children),n=e.offsetWidth,o=null!=t&&null!=t.elWidth?t.elWidth:null!=l||null!=l?n*l:a[0].offsetWidth,i=null!=t&&null!=t.elMargin?t.elMargin:0,s=(n-i)/(o+i),c=Math.floor(s),d=((s-c)*o+(s+1)*i)/(c+1),u=Array(),g=Array(),h=Array(),p=Array();for(let t=0;t<=c-1;t++)g.push(e.offsetTop+i),u.push([e.offsetTop+i,e.offsetLeft+t*o+(t+1)*d]);if(null!=t&&null!=t.heightSort){for(let e in a)h.push(a[e].offsetHeight);"DESC"==t.heightSort.toUpperCase()?h.sort(((e,t)=>t-e)):"ASC"==t.heightSort.toUpperCase()&&h.sort(((e,t)=>e-t));for(let e in h)for(let t in a)a[t].offsetHeight==h[e]&&p.push(a.splice(t,1)[0])}else p=a;p.map(((l,a)=>{let n=1;u.map(((e,t)=>{if(g[0]===e[0]&&1===n)if(l.style.width=`${o}px`,l.style.position="absolute",l.style.left=`${e[1]}px`,l.style.top=`${e[0]}px`,n++,"img"===l.nodeName.toLowerCase()){l.style.height="";let r=o/l.offsetWidth*l.offsetHeight;l.style.height=`${r}px`,g[0]=e[0]+r+d,u[t]=[e[0]+r+d,e[1]],g.sort(((e,t)=>e-t))}else g[0]=e[0]+l.offsetHeight+d,u[t]=[e[0]+l.offsetHeight+d,e[1]],g.sort(((e,t)=>e-t))})),a===p.length-1&&(g.sort(((e,t)=>t-e)),e.style.height=g[0]-e.offsetTop+i+"px",null==r&&(null!=t?"function"==typeof t.callback&&t.callback(e):window.dispatchEvent(new Event("resize"))))}))}}const n=window.wp.i18n,o=window.wp.blockEditor,i=JSON.parse('{"u2":"masonry-gallery/ctc-gal-block"}');(0,e.registerBlockType)(i.u2,{keywords:[__("Masonry galllery","ctc-gal"),__("masonry gallery","ctc-gal")],attributes:{brkWidth:{type:"Number",default:48},gallery:{type:"Array",default:[]},mediaIds:{type:"Array",default:[]},gutWidth:{type:"Number",default:15},clntId:{type:"String",default:""}},edit:function(e){let{clientId:i,attributes:s,setAttributes:c}=e;return(0,l.useEffect)((()=>{c({clntId:i});let e=Array();s.gallery.length>=1&&(Array.from(document.querySelectorAll(`.mas-img-${s.clntId}`)).map((e=>e.style.width="")),new a(`#mas-div-${s.clntId}`,{percentWidth:!0,elMargin:s.gutWidth}),setTimeout((()=>window.dispatchEvent(new Event("resize"))),300),e=s.gallery.map((e=>e.id)),c({mediaIds:e}))}),[s.gallery,s.brkWidth,s.gutWidth]),(0,t.createElement)("div",(0,o.useBlockProps)(),0<s.gallery.length&&(0,t.createElement)("div",{className:"ctc-gal-gallery",id:`mas-div-${s.clntId}`},s.gallery.map(((e,l)=>(0,t.createElement)("img",{key:l,className:`mas-img-${s.clntId}`,width:`${s.brkWidth}% `,title:e.caption,src:e.url})))),(0,t.createElement)("div",{style:{border:"1px solid rgb(61, 148, 218)",backgroundColor:"rgba(255,255,255,1)"}},(0,t.createElement)(o.MediaUploadCheck,null,(0,t.createElement)(o.MediaUpload,{title:(0,n.__)("Select Images","ctc-gal"),multiple:!0,value:s.mediaIds,gallery:!0,onSelect:e=>c({gallery:e}),allowedTypes:["image"],render:e=>{let{open:l}=e;return(0,t.createElement)("div",{style:{width:"100%",backgroundColor:"rgba(255,255,,255,1)",color:"rgb(61, 148, 218)",padding:"10px"}},(0,t.createElement)("h5",{className:"dashicons-before dashicons-format-gallery"},(0,n.__)("CTC Gallery","ctc-gal")),(0,t.createElement)(r.Button,{style:{marginLeft:"auto",marginRight:"auto",display:"block",color:"rgb(61, 148, 218)",border:"1px solid rgb(61, 148, 218)"},className:"ctc-gal-button dashicons-before dashicons-format-gallery",onClick:l},(0,n.__)(" Select Images","ctc-gal")))}}))),(0,t.createElement)("div",null,(0,t.createElement)(o.InspectorControls,null,(0,t.createElement)(r.PanelBody,null,(0,t.createElement)(r.RangeControl,{label:(0,n.__)("Image width in percentage","ctc-gal"),min:1,max:100,onChange:e=>c({brkWidth:e}),value:s.brkWidth,resetFallbackValue:30}),(0,t.createElement)(r.RangeControl,{label:(0,n.__)("Gutter Width","ctc-gal"),min:1,max:50,onChange:e=>c({gutWidth:e}),value:s.gutWidth,resetFallbackValue:0})))))},save:function(e){let{attributes:l}=e;return(0,t.createElement)("div",o.useBlockProps.save(),0<l.gallery.length&&(0,t.createElement)("div",{style:{opacity:"0"},"data-gut-wd":l.gutWidth,className:"mas-gal-gallery",id:`mas-div-${l.clntId}`},l.gallery.map(((e,r)=>(0,t.createElement)("img",{key:r,className:`mas-img-${l.clntId}`,style:{width:`${l.brkWidth}% `},title:e.caption,src:e.url})))))}})}},l={};function r(e){var a=l[e];if(void 0!==a)return a.exports;var n=l[e]={exports:{}};return t[e](n,n.exports,r),n.exports}r.m=t,e=[],r.O=(t,l,a,n)=>{if(!l){var o=1/0;for(d=0;d<e.length;d++){for(var[l,a,n]=e[d],i=!0,s=0;s<l.length;s++)(!1&n||o>=n)&&Object.keys(r.O).every((e=>r.O[e](l[s])))?l.splice(s--,1):(i=!1,n<o&&(o=n));if(i){e.splice(d--,1);var c=a();void 0!==c&&(t=c)}}return t}n=n||0;for(var d=e.length;d>0&&e[d-1][2]>n;d--)e[d]=e[d-1];e[d]=[l,a,n]},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={826:0,431:0};r.O.j=t=>0===e[t];var t=(t,l)=>{var a,n,[o,i,s]=l,c=0;if(o.some((t=>0!==e[t]))){for(a in i)r.o(i,a)&&(r.m[a]=i[a]);if(s)var d=s(r)}for(t&&t(l);c<o.length;c++)n=o[c],r.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return r.O(d)},l=globalThis.webpackChunkctc_gal_block=globalThis.webpackChunkctc_gal_block||[];l.forEach(t.bind(null,0)),l.push=t.bind(null,l.push.bind(l))})();var a=r.O(void 0,[431],(()=>r(564)));a=r.O(a)})();