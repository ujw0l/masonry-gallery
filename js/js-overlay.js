/*
*
*Modal box 
*Javscript library to display content in modal box
* https://ujwolbastakoti.wordpress.com/
* MIT license
*  
*
*/

'use strict'

class jsOverlay {
    constructor(param) {

        if (undefined != param) {
            this.createOverlay(param);
        } else {
            return;
        }
    }

    /** 
    * Function to create overlay
    *
    *@param param1    Modal setting parameter 
    */

    createOverlay(param) {

        //script to deal with loading content to the overlay
        let overlayWidth = window.innerWidth + 1;
        let overlayHeight = window.innerHeight + 1;
        let modalHt = undefined != param.containerHt ? param.containerHt : 500;
        let modalWd = undefined != param.containerWd ? param.containerWd : 650;
        let optHtWd = this.getOptimizedElSize(window.innerWidth, window.innerHeight, modalWd, modalHt);


        let scrollCss = document.createElement('style');
        scrollCss.id = 'ctc-scroll-css';
        scrollCss.innerHTML = `::-webkit-scrollbar-track {background: rgba(255, 255, 255, 1);} ::-moz-scrollbar-track { background: rgba(255, 255, 255, 1);} #gal-sidebar::-webkit-scrollbar {display: none;} #gal-sidebar::-moz-scrollbar {display: none;}`;
        document.querySelector('head').appendChild(scrollCss);
        document.body.style.overflow = 'hidden'

        let overlayEl = document.createElement('div');
        overlayEl.id = "js-modal-overlay";
        overlayEl.style = `position:fixed;height:${overlayHeight}px;width:${overlayWidth}px;background-color:rgba(0,0,0,.6);z-index:100000;top:0%;left:0%;right:0%;bottom:0%;`;


        let elContainer = document.createElement('div');
        elContainer.id = 'js-modal-el-container';
        elContainer.style = `overflow:auto;border:1px solid rgba(0,0,0,1);text-align:center;left:${((overlayWidth - 5) - optHtWd.width) / 2}px;top:${(overlayHeight - optHtWd.height) / 2}px;width:${optHtWd.width}px;height:${optHtWd.height}px;position:absolute;float:left;background-color:rgba(255,255,255,1);`;
        overlayEl.appendChild(elContainer);

        let closeBtn = document.createElement('span');
        closeBtn.id = "overlay-close-btn";
        closeBtn.title = "Close";
        closeBtn.innerHTML = "&#10539;";
        closeBtn.style = `line-height:1.5;text-align:center;position:absolute;width:30px;height:30px;cursor:pointer;top:${((overlayHeight - optHtWd.height) / 2) - 25}px;left:${((overlayWidth - optHtWd.width) / 2) + optHtWd.width - 8}px;font-size:20px;color:rgba(255,255,255,1);text-shadow:-1px -1px 1px rgba(0,0,0,1);z-index:100000;`;
        overlayEl.appendChild(closeBtn);
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(overlayEl);
            document.querySelector('head').removeChild(scrollCss);
            document.body.style.overflow = '';

        });


        if (undefined != param.elContent) {
            elContainer.innerHTML = param.elContent
            document.body.insertBefore(overlayEl, document.body.firstChild);
        } else if (undefined != param.imgGallery) {
            this.loadGallery(overlayEl, closeBtn, elContainer, param, [optHtWd.height, optHtWd.width]);

        } else if (undefined != param.iframeUrl) {
            elContainer.innerHTML = `<iframe height="${optHtWd.height}" width="${optHtWd.width}" frameBorder= "0"   src="${param.iframeUrl}" ></iframe>`;
            document.body.insertBefore(overlayEl, document.body.firstChild);
        } else {
            overlayEl.appendChild(elContainer);
            this.ajaxContent(elContainer, param, [optHtWd.height, optHtWd.width])
            document.body.insertBefore(overlayEl, document.body.firstChild);
        }

        window.addEventListener('resize', () => this.adjustOverlay(overlayEl, elContainer, closeBtn, [modalHt, modalWd]));
        window.addEventListener('keydown', e => {
            if ('Escape' === e.code) {
                closeBtn.click();
            }
        })
    }

    /** 
    *
    *adjust overlay and component on resize
    *
    *@param overlayEl Modal element
    *@param containerEl Container element
    *@param closeBtn close button element
    *@param htWdArr content container height and width
    */
    adjustOverlay(overlayEl, elContainer, closeBtn, htWdArr) {

        let overlayWidth = window.innerWidth + 1;
        let overlayHeight = window.innerHeight + 1;
        let loadingDiv = elContainer.querySelector('#content-loading');
        let imgLoading = overlayEl.querySelector('#img-loading');

        let optHtWd = this.getOptimizedElSize(window.innerWidth, window.innerHeight, htWdArr[1], htWdArr[0]);

        overlayEl.style.width = overlayWidth + 'px';
        overlayEl.style.height = overlayHeight + 'px';


        closeBtn.style.left = (((overlayWidth - optHtWd.width) / 2) + optHtWd.width - 8) + 'px'
        closeBtn.style.top = (((overlayHeight - optHtWd.height) / 2) - 25) + 'px'

        let imgLoaded = elContainer.querySelector('#js-overlay-img')

        if (null != imgLoaded) {

            let totImgs = parseInt(imgLoaded.getAttribute('data-img-count'));
            let imgTitle = elContainer.querySelector('#img-title');

            let imgObj = new Image();
            imgObj.src = imgLoaded.src
            let optImgDim = this.getOptimizedElSize((optHtWd.width - 60), (optHtWd.height - 60), imgObj.width, imgObj.height, 1);
            let contMargLeft = 1 < totImgs ? ((optHtWd.width - optImgDim.width) / 2) - 26 : (optHtWd.width - optImgDim.width) / 2;
            imgLoaded.style.height = optImgDim.height + 'px';
            imgLoaded.style.width = optImgDim.width + 'px';
            imgLoaded.style.marginLeft = contMargLeft + 'px';
            imgLoaded.style.marginTop = ((optHtWd.height - optImgDim.height) / 2) + 'px';

            imgTitle.style.marginTop = (optHtWd.height - 25) + 'px'
            imgTitle.style.width = optHtWd.width + 'px';

            if (2 <= totImgs) {
                elContainer.querySelector('#next-btn').style.marginTop = ((optHtWd.height - 25) / 2) + 'px';
                elContainer.querySelector('#prev-btn').style.marginTop = ((optHtWd.height - 25) / 2) + 'px';
            }

        }

        elContainer.style.left = (((overlayWidth - 5) - optHtWd.width) / 2) + 'px';
        elContainer.style.top = ((overlayHeight - optHtWd.height) / 2) + 'px';
        elContainer.style.height = optHtWd.height + 'px';
        elContainer.style.width = optHtWd.width + 'px';

        if (undefined != imgLoading) {
            imgLoading.style.marginTop = ((window.innerHeight - 46) / 2) + 'px';
            imgLoading.style.marginLeft = ((window.innerWidth - 46) / 2) + 'px';
        }

        if (undefined != elContainer.querySelector('iframe')) {
            elContainer.querySelector('iframe').height = optHtWd.height;
            elContainer.querySelector('iframe').width = optHtWd.width;
        };
        if (undefined != loadingDiv) {
            loadingDiv.style.marginTop = ((optHtWd.height - 46) / 2) + 'px';
            loadingDiv.style.marginLeft = ((optHtWd.width - 46) / 2) + 'px';
        }

    }

    /** 
    *
    *adjust overlay and component on resize
    *
    * @param elContainer Container element
    * @param param Parameter for ajax
    * @param modalHtWd Array of modal height and width
    */

    ajaxContent(elContainer, param, modalHtWd) {

        let method = undefined != param.ajaxMethod ? param.ajaxMethod.toUpperCase() : 'GET';
        let dataToSend = undefined != param.ajaxData ? param.ajaxData : '';


        let loadingDivCir = elContainer.querySelector('#content-loading');

        if (null == loadingDivCir) {

            loadingDivCir = document.createElement('div');
            loadingDivCir.id = `content-loading`;
            loadingDivCir.style = `margin-left:${(modalHtWd[1] - 46) / 2}px;margin-top:${(modalHtWd[0] - 46) / 2}px;height:40px;width:40px;border-radius:50%;border-color:rgba(0,0,0,1);border-style: solid; border-width: 3px;z-index:1100; `;
            loadingDivCir.setAttribute('data-wait', 'left');
            elContainer.appendChild(loadingDivCir);

            var loadingInt = setInterval(() => {
                switch (loadingDivCir.getAttribute('data-wait')) {
                    case 'left':
                        loadingDivCir.setAttribute('data-wait', 'top');
                        loadingDivCir.style.borderColor = 'rgba(0,0,0,0.5)';
                        loadingDivCir.style.borderTop = '3px solid  rgba(0,0,0,1)';
                        break;
                    case 'top':
                        loadingDivCir.setAttribute('data-wait', 'right');
                        loadingDivCir.style.borderColor = 'rgba(0,0,0,0.5)';
                        loadingDivCir.style.borderRight = '3px solid  rgba(0,0,0,1)';
                        break;
                    case 'right':
                        loadingDivCir.setAttribute('data-wait', 'bottom');
                        loadingDivCir.style.borderColor = 'rgba(0,0,0,0.5)';
                        loadingDivCir.style.borderBottom = '3px solid  rgba(0,0,0,1)';

                        break;
                    case 'bottom':
                        loadingDivCir.setAttribute('data-wait', 'left');
                        loadingDivCir.style.borderColor = 'rgba(0,0,0,0.5)';
                        loadingDivCir.style.borderLeft = '3px solid  rgba(0,0,0,1)';
                        break;
                }

            }, 400);
        }
        var xhttp = new XMLHttpRequest();
        xhttp.open(method, param.ajaxUrl, true);
        xhttp.responseType = "text";
        xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;');
        xhttp.addEventListener('load', event => {
            if (event.target.status >= 200 && event.target.status < 400) {
                clearInterval(loadingInt);
                elContainer.innerHTML = event.target.response;
            } else {
                console.log(event.target.statusText);
            }
        })
        xhttp.send(dataToSend);
    }

    /** 
    *Function to display image/images
    *
    * @param overlayEl Overlay element
    * @param closeBtn Close button element
    *@param elContainer Modal container
    *@param param Setting parameter
    *@param modalHtWd Modal height width array
    */
    loadGallery(overlayEl, closeBtn, elContainer, param, modalHtWd) {

        let imgGallery = Array.from(document.querySelectorAll(param.imgGallery));

        imgGallery.map((x, i) => {

            let galImgs = Array.from(x.querySelectorAll('img'));

            galImgs.map((y, a) => {
                y.addEventListener('click', e => {
                    if (null == document.querySelector('#js-modal-overlay')) {
                        document.body.insertBefore(overlayEl, document.body.firstChild);
                    }
                    this.loadImg(overlayEl, closeBtn, elContainer, y, a, galImgs, [elContainer.offsetHeight, elContainer.offsetWidth]);
                })
            })
        })
    }

    loadImg(overlayEl, closeBtn, elContainer, img, imgNum, imgArr, modalHtWd) {

        let nxtImg = imgArr.length - 1 > imgNum ? imgNum + 1 : 0;
        let prevImg = 0 < imgNum ? imgNum - 1 : imgArr.length - 1;
        let imgOfTot = 1 < imgArr.length ? `<font style="font-size:11px;" > (${imgNum + 1}/${imgArr.length})</font>` : '';
        let imgTitleCont = 0 < img.title.length ? img.title + imgOfTot : '' + imgOfTot;
        closeBtn.style.display = 'none';
        elContainer.style.display = 'none';
        elContainer.style.overflow = '';

        let imgToload = new Image();
        imgToload.setAttribute('data-img-count', imgArr.length)
        imgToload.src = img.src;



        if (undefined == elContainer.querySelector('#img-title')) {
            let imgTitle = document.createElement('span');
            imgTitle.id = 'img-title';
            imgTitle.style = `overflow:scroll;font-size:15px;color:rgba(0,0,0,1);line-height:1.5;font-family:'Courier New', Courier, monospace;text-align:center;position:absolute;left:0px;height:25px;width:${modalHtWd[1]}px;margin-top:${modalHtWd[0] - 25}px;z-index:100;`;
            imgTitle.innerHTML = imgTitleCont;
            elContainer.appendChild(imgTitle);
        } else {
            elContainer.querySelector('#img-title').innerHTML = imgTitleCont;
        }

        if (2 <= imgArr.length) {
            if (undefined == elContainer.querySelector('#prev-btn')) {
                let prevBtn = document.createElement('span');
                prevBtn.id = 'prev-btn';
                prevBtn.title = 'Previous Image'
                prevBtn.innerHTML = '<'
                prevBtn.setAttribute('data-img-num', prevImg);
                prevBtn.style = `color:rgba(0,0,0,1);border:1px solid rgba(0,0,0,1);font-size:20px;cursor:pointer;font-family:'Courier New', Courier, monospace;text-align:center;line-height: 1.1;margin-left:2px;margin-top:${(modalHtWd[0] - 25) / 2}px;width:20px;height:20px;float:left;z-index:100;`;
                prevBtn.addEventListener('mouseover', e => e.target.style.boxShadow = '1px 1px 5px 1px rgba(0,0,0,1)')
                prevBtn.addEventListener('mouseleave', e => e.target.style.boxShadow = '')
                prevBtn.addEventListener('click', e => this.loadImg(overlayEl, closeBtn, elContainer, imgArr[parseInt(e.target.getAttribute('data-img-num'))], parseInt(e.target.getAttribute('data-img-num')), imgArr, [elContainer.offsetHeight, elContainer.offsetWidth]));
                elContainer.appendChild(prevBtn)
            } else {
                elContainer.querySelector('#prev-btn').setAttribute('data-img-num', prevImg)
            }

            if (undefined == elContainer.querySelector('#next-btn')) {
                let nextBtn = document.createElement('span');
                nextBtn.id = 'next-btn';
                nextBtn.innerHTML = '>'
                nextBtn.title = 'Next Image'
                nextBtn.style = `color:rgba(0,0,0,1);border:1px solid rgba(0,0,0,1);font-size:20px;cursor:pointer;font-family:'Courier New', Courier, monospace;text-align:center;line-height: 1.1;margin-right:2px;margin-top:${(modalHtWd[0] - 25) / 2}px;width:20px;height:20px;float:right;z-index:100;`;
                nextBtn.setAttribute('data-img-num', nxtImg)
                nextBtn.addEventListener('mouseover', e => e.target.style.boxShadow = '1px 1px 5px 1px rgba(0,0,0,1)')
                nextBtn.addEventListener('mouseleave', e => e.target.style.boxShadow = '')
                nextBtn.addEventListener('click', e => this.loadImg(overlayEl, closeBtn, elContainer, imgArr[parseInt(e.target.getAttribute('data-img-num'))], parseInt(e.target.getAttribute('data-img-num')), imgArr, [elContainer.offsetHeight, elContainer.offsetWidth]));
                elContainer.appendChild(nextBtn)
            } else {
                elContainer.querySelector('#next-btn').setAttribute('data-img-num', nxtImg);
            }

        }

        if (undefined != elContainer.querySelector('img')) {
            elContainer.removeChild(elContainer.querySelector('img'));
        }

        let loadingDivCir = elContainer.querySelector('#content-loading');

        if (null == loadingDivCir) {

            loadingDivCir = document.createElement('div');
            loadingDivCir.id = `img-loading`;
            loadingDivCir.style = `display:inline-block;float:left;position:relative;margin-left:${(window.innerWidth - 46) / 2}px;margin-top:${(window.innerHeight - 46) / 2}px;height:40px;width:40px;border-radius:50%;border-color:rgba(255,255,255,1);border-style: solid; border-width: 3px;z-index:1100; `;
            loadingDivCir.setAttribute('data-wait', 'left');
            overlayEl.appendChild(loadingDivCir);

            var loadingInt = setInterval(() => {
                switch (loadingDivCir.getAttribute('data-wait')) {
                    case 'left':
                        loadingDivCir.setAttribute('data-wait', 'top');
                        loadingDivCir.style.borderColor = 'rgba(255,255,255,1)';
                        loadingDivCir.style.borderTop = '3px solid  rgba(0,0,0,1)';
                        break;
                    case 'top':
                        loadingDivCir.setAttribute('data-wait', 'right');
                        loadingDivCir.style.borderColor = 'rgba(255,255,255,1)';
                        loadingDivCir.style.borderRight = '3px solid  rgba(0,0,0,1)';
                        break;
                    case 'right':
                        loadingDivCir.setAttribute('data-wait', 'bottom');
                        loadingDivCir.style.borderColor = 'rgba(255,255,255,1)';
                        loadingDivCir.style.borderBottom = '3px solid  rgba(0,0,0,1)';

                        break;
                    case 'bottom':
                        loadingDivCir.setAttribute('data-wait', 'left');
                        loadingDivCir.style.borderColor = 'rgba(255,255,255,1)';
                        loadingDivCir.style.borderLeft = '3px solid  rgba(0,0,0,1)';
                        break;
                }

            }, 400);
        }

        imgToload.addEventListener('load', e => {
            overlayEl.removeChild(loadingDivCir);
            clearInterval(loadingInt);
            closeBtn.style.display = '';
            elContainer.style.display = '';
            let optImgDim = this.getOptimizedElSize((modalHtWd[1] - 60), (modalHtWd[0] - 60), e.target.width, e.target.height, 1)
            let contMargLeft = 1 < imgArr.length ? ((modalHtWd[1] - optImgDim.width) / 2) - 26 : (modalHtWd[1] - optImgDim.width) / 2;
            e.target.id = `js-overlay-img`;
            e.target.style = `position:relative;border:1px solid rgba(0,0,0,1);float:left;height:${optImgDim.height}px;width:${optImgDim.width}px;margin-left:${contMargLeft}px;margin-top:${(modalHtWd[0] - optImgDim.height) / 2}px;`;
            elContainer.appendChild(e.target);

        });

    }

    /** 
    *Optimize el dimension for viewing 
    * 
    *@param scrnWd Maximum width available
    *@param scrnHt Maximum height available
    *@param elActWd Original width of el
    *@param elActHt Original height of el
    *@param alwdMargPrcnt Optional allowed container percent
    *
    */

    getOptimizedElSize(scrnWd, scrnHt, elActWd, elActHt, alwdElPrcnt) {

        let elScrnHtRatio = 0, elScrnWdRatio = 0, optElHt = 0, optElWd = 0;
        let elPrcnt = undefined != alwdElPrcnt ? alwdElPrcnt : 0.89;
        let margPrcnt = 1 - elPrcnt;
        if ((elActWd >= scrnWd) && (elActHt >= scrnHt)) {
            if (elActWd >= elActHt) {
                if (elActWd > elActHt) {
                    elScrnWdRatio = elActWd / scrnWd;
                    optElWd = (elActWd / elScrnWdRatio) - (margPrcnt * scrnWd);
                    optElHt = elActHt * (optElWd / elActWd);
                    if (optElHt >= (elPrcnt * scrnHt)) {
                        elScrnHtRatio = scrnHt / elActHt;
                        optElHt = elActHt * elScrnHtRatio - (margPrcnt * scrnHt);
                        optElWd = elActWd * (optElHt / elActHt);
                    }
                } else {
                    if (scrnWd > scrnHt) {
                        optElHt = (elPrcnt * scrnHt);
                        optElWd = optElHt;
                    } else if (scrnHt > scrnWd) {
                        optElWd = (elPrcnt * scrnWd);
                        optElHt = optElWd;
                    } else {
                        elScrnHtRatio = scrnHt / elActHt;
                        optElHt = elActHt * elScrnHtRatio - (margPrcnt * scrnHt);
                        optElWd = elActWd * (optElHt / elActHt);
                    }
                }
            } else {
                elScrnHtRatio = elActHt / scrnHt;
                optElHt = (elActHt / elScrnHtRatio) - (margPrcnt * scrnHt);
                optElWd = elActWd * (optElHt / elActHt);
            }

        } else if (elActWd >= scrnWd && elActHt < scrnHt) {
            elScrnWdRatio = scrnWd / elActWd;
            optElWd = elActWd * elScrnWdRatio - (margPrcnt * scrnWd);
            optElHt = elActHt * (optElWd / elActWd);
        } else if (elActHt >= scrnHt && elActWd < scrnWd) {
            elScrnHtRatio = scrnHt / elActHt;
            optElHt = elActHt * elScrnHtRatio - (margPrcnt * scrnHt);
            optElWd = elActWd * (optElHt / elActHt);
            optElHt = elActHt * (optElWd / elActWd);
        } else {
            let avlElWd = elPrcnt * scrnWd;
            let avlElHt = elPrcnt * scrnHt;
            if (elActWd >= avlElWd && elActHt >= avlElHt) {
                let elAvlWdRatio = avlElWd / elActWd;
                let elAvlHtRatio = avlElHt / elActHt;
                optElWd = avlElWd * elAvlWdRatio;
                optElHt = scrnHt * elScrnHtRatio;
            } else if (elActWd >= avlElWd && elActHt < avlElHt) {
                let elAvlWdRatio = avlElWd / elActWd;
                optElWd = elActWd * elAvlWdRatio;
                optElHt = elActHt * (optElWd / elActWd);
            } else if (elActHt >= avlElHt && elActWd < avlElWd) {
                let elAvlHtRatio = avlElHt / elActHt;
                optElHt = elActHt * elAvlHtRatio;
                optElWd = elActWd * (optElHt / elActHt);
            } else {
                optElWd = elActWd;
                optElHt = elActHt;
            }
            optElHt = elActHt * (optElWd / elActWd);
        }
        //at last check itopt width is still large			
        if (optElWd > (elPrcnt * scrnWd)) {
            optElWd = elPrcnt * scrnWd;
            optElHt = elActHt * (optElWd / elActWd);
        }
        return {
            width: optElWd,
            height: optElHt
        };
    }
}
