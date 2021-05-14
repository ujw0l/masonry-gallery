/*
 * Js Masonry
 * javascript library to create masnory layout of elements 
 * https://ujw0l.github.io/
 * MIT license
 *  
 */

'use strict'
class jsMasonry {
    constructor(elems, opt) {
        this.prepMas(elems, opt);
    }
    /**
     * Prepare masonry
     * 
     * @param {*} elems Elements to apply masonry
     * @param {*} opt Masonry options
     */
    prepMas(elems, opt) {
        let masArr = Array.from(document.querySelectorAll(elems));
        let massApplied = 0;
        masArr.map(el => {
            let elFirstChild = undefined != opt && undefined != opt.elSelector ? el.querySelector(opt.elSelector) : el.children[0];
            if (undefined != elFirstChild) {
                let brkPer = undefined != opt && undefined == opt.elWidth && true === opt.percentWidth ? elFirstChild.offsetWidth / el.offsetWidth : null;
                this.layBrks(el, opt, brkPer);
                massApplied++
                window.addEventListener('resize', () => this.layBrks(el, opt, brkPer, event));
            }
        });
        if (1 < massApplied) {
            window.dispatchEvent(new Event('resize'));
        }
    }
    /**
     * 
     * Lay bricks
     * 
     * @param {*} el  Element to apply masonry to
     * @param {*} opt Masonry options
     * @param {*} brkPer Percent Width
     * @param {*} resizeEvnt Resize event
     */
    layBrks(el, opt, brkPer, resizeEvnt) {
        let allRawBrks = undefined != opt && undefined != opt.elSelector ? Array.from(el.querySelectorAll(opt.elSelector)) : Array.from(el.children);
        let contWidth = el.offsetWidth;
        let brkWidth = undefined != opt && undefined != opt.elWidth ? opt.elWidth : undefined != brkPer || null != brkPer ? contWidth * brkPer : allRawBrks[0].offsetWidth;
        let rawBrkMargin = undefined != opt && undefined != opt.elMargin ? opt.elMargin : 0;
        let rawBrkPerRow = (contWidth - rawBrkMargin) / (brkWidth + rawBrkMargin);
        let brkPerRow = Math.floor(rawBrkPerRow);
        let brkMargin = (((rawBrkPerRow - brkPerRow) * brkWidth) + ((rawBrkPerRow + 1) * (rawBrkMargin))) / (brkPerRow + 1);
        let availSpots = Array();
        let availTop = Array();
        let brkHt = Array();
        let allBrks = Array();
        for (let z = 0; z <= brkPerRow - 1; z++) {
            availTop.push(el.offsetTop + rawBrkMargin);
            availSpots.push([el.offsetTop + rawBrkMargin, el.offsetLeft + (z * brkWidth) + ((z + 1) * brkMargin)]);
        }


        if (undefined != opt && undefined != opt.heightSort) {
            for (let i in allRawBrks) {
                brkHt.push(allRawBrks[i].offsetHeight);
            }

            if ('DESC' == opt.heightSort.toUpperCase()) {
                brkHt.sort((a, b) => b - a);
            } else if ('ASC' == opt.heightSort.toUpperCase()) {
                brkHt.sort((a, b) => a - b);
            }
            for (let a in brkHt) {
                for (let b in allRawBrks) {
                    if (allRawBrks[b].offsetHeight == brkHt[a]) {
                        allBrks.push(allRawBrks.splice(b, 1)[0]);
                    }
                }

            }

        } else {
            allBrks = allRawBrks;
        }


        allBrks.map((x, i) => {
            let placeCount = 1;
            availSpots.map((n, l) => {
                if (availTop[0] === n[0] && 1 === placeCount) {
                    x.style.width = `${brkWidth}px`;
                    x.style.position = 'absolute';
                    x.style.left = `${n[1]}px`;
                    x.style.top = `${n[0]}px`;
                    placeCount++;
                    if ('img' === x.nodeName.toLowerCase()) {
                        x.style.height = '';
                        let brkHt = brkWidth / x.offsetWidth * x.offsetHeight;
                        x.style.height = `${brkHt}px`;
                        availTop[0] = n[0] + brkHt + brkMargin;
                        availSpots[l] = [n[0] + brkHt + brkMargin, n[1]]
                        availTop.sort((a, b) => a - b);
                    } else {
                        availTop[0] = n[0] + x.offsetHeight + brkMargin;
                        availSpots[l] = [n[0] + x.offsetHeight + brkMargin, n[1]]
                        availTop.sort((a, b) => a - b);
                    }
                }
            });
            if (i === allBrks.length - 1) {
                availTop.sort((a, b) => b - a);
                el.style.height = (availTop[0] - el.offsetTop + rawBrkMargin) + 'px';
                if (undefined == resizeEvnt) {
                    if (undefined != opt) {
                        if ('function' == typeof (opt.callback)) {
                            opt.callback(el);
                        }
                    } else {
                        window.dispatchEvent(new Event('resize'));
                    }
                }
            }
        });
    }

}