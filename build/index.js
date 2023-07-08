/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/edit.js":
/*!*********************!*\
  !*** ./src/edit.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var js_masonry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! js-masonry */ "./node_modules/js-masonry/js-masonry.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");





/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */


/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
function Edit(_ref) {
  let {
    clientId,
    attributes,
    setAttributes
  } = _ref;
  const mainCont = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setAttributes({
      clntId: clientId
    });
    let Ids = Array();
    if (attributes.gallery.length >= 1) {
      new js_masonry__WEBPACK_IMPORTED_MODULE_3__.jsMasonry(`#mas-div-${attributes.clntId}`, {
        percentWidth: true,
        elMargin: attributes.gutWidth
      });
      setTimeout(() => window.dispatchEvent(new Event('resize')), 300);
      Ids = attributes.gallery.map(x => x.id);
      setAttributes({
        mediaIds: Ids
      });
    }
  }, [attributes.gallery, attributes.brkWidth, attributes.gutWidth]);

  /*
  	useEffect(()=>{
  
  		if(attributes.zoomOnHover){
  
  
  			Array.from(mainCont.current.querySelectorAll('img')).map(x=>{
  
  				x.addEventListener('mouseleave', e => {
  
  
  					e.target.style.position='relative';
  					e.target.style.zIndex = '';
  					e.target.display='inline-block';
  					e.target.style.width = e.target.getAttribute('data-mas-wd') + 'px';
  					e.target.style.height = e.target.getAttribute('data-mas-ht') + 'px';
  					e.target.style.left = e.target.getAttribute('data-mas-left') + 'px';
  					e.target.style.top = e.target.getAttribute('data-mas-top') + 'px';
  				});
  				x.addEventListener('mouseover', e => {
  	
  			
  					let htWtRatio = e.target.offsetHeight / e.target.offsetWidth;
  
  					e.target.style.zIndex = '500';
  					e.target.style.position='absolute';
  					e.target.style.display = 'block';
  					if (null == e.target.getAttribute('data-mas-ht') && null == e.target.getAttribute('data-mas-wd')) {
  						e.target.setAttribute('data-mas-ht', e.target.offsetHeight);
  						e.target.setAttribute('data-mas-wd', e.target.offsetWidth);
  						e.target.setAttribute('data-mas-left', e.target.style.left);
  						e.target.setAttribute('data-mas-top', e.target.style.top);
  					}
  	
  					e.target.style.width = mainCont.current.offsetWidth + 'px';
  					e.target.style.height = (mainCont.current.offsetWidth * htWtRatio) + 'px';
  				});
  
  			})
  
  		}
  
  
  	},[attributes.zoomOnHover])
  	*/

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__.useBlockProps)(), 0 < attributes.gallery.length && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "ctc-gal-gallery",
    ref: mainCont,
    id: `mas-div-${attributes.clntId}`
  }, attributes.gallery.map((x, i) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    key: i,
    className: `mas-img-${attributes.clntId} ${attributes.zoomOnHoverClass}`,
    style: {
      width: `${attributes.brkWidth}%`,
      boxShadow: `${attributes.boxShadWd}px ${attributes.boxShadWd}px ${attributes.boxShadWd / 2}px ${attributes.shadowCol}`
    },
    title: x.caption,
    src: x.url
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      border: '1px solid rgb(61, 148, 218)',
      backgroundColor: 'rgba(255,255,255,1)'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__.MediaUploadCheck, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__.MediaUpload, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Select Images', 'ctc-gal'),
    multiple: true,
    value: attributes.mediaIds,
    gallery: true,
    onSelect: gal => setAttributes({
      gallery: gal
    }),
    allowedTypes: ['image'],
    render: _ref2 => {
      let {
        open
      } = _ref2;
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        style: {
          width: '100%',
          backgroundColor: 'rgba(255,255,,255,1)',
          color: 'rgb(61, 148, 218)',
          padding: '10px'
        }
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", {
        className: "dashicons-before dashicons-format-gallery"
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('CTC Gallery', 'ctc-gal')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
        style: {
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'block',
          color: 'rgb(61, 148, 218)',
          border: '1px solid rgb(61, 148, 218)'
        },
        className: "ctc-gal-button dashicons-before dashicons-format-gallery",
        onClick: open
      }, attributes.gallery.length > 1 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)(" Edit Gallery", "ctc-gal") : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)(" Select Images", "ctc-gal")));
    }
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Image width in percentage', 'ctc-gal'),
    min: 1,
    max: 100,
    onChange: val => setAttributes({
      brkWidth: val
    }),
    value: attributes.brkWidth,
    resetFallbackValue: 30
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Gutter Width', 'ctc-gal'),
    min: 1,
    max: 50,
    onChange: val => setAttributes({
      gutWidth: val
    }),
    value: attributes.gutWidth,
    resetFallbackValue: 0
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)("Enlarge Images on Hover?", "ctc-gal"),
    checked: attributes.zoomOnHover,
    onChange: val => {
      if (val) {
        setAttributes({
          zoomOnHoverClass: 'ctc-gal-zoom-on-hover'
        });
        setAttributes({
          activateOverlay: false
        });
        setAttributes({
          overlayClass: ''
        });
      } else {
        setAttributes({
          zoomOnHoverClass: ''
        });
      }
      setAttributes({
        zoomOnHover: val
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)("Show Images on Overlay?", "ctc-gal"),
    checked: attributes.activateOverlay,
    onChange: val => {
      if (val) {
        setAttributes({
          overlayClass: 'ctc-gal-overlay'
        });
        setAttributes({
          zoomOnHover: false
        });
        setAttributes({
          zoomOnHoverClass: ''
        });
      } else {
        setAttributes({
          overlayClass: ''
        });
      }
      setAttributes({
        activateOverlay: val
      });
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)("Add Shadow Effect to images?", "ctc-gal"),
    checked: attributes.addShadEff,
    onChange: val => {
      if (!val) {
        setAttributes({
          shadowCol: ''
        });
        setAttributes({
          boxShadWd: 0
        });
      }
      setAttributes({
        addShadEff: val
      });
    }
  }), attributes.addShadEff && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)("Shadow Margin", "ctc-gal"),
    min: 0,
    max: 50,
    value: attributes.boxShadWd,
    onChange: val => setAttributes({
      boxShadWd: val
    }),
    resetFallback: true,
    Value: 0
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)("Shadow Color", "ctc-gal").toUpperCase()), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ColorPicker, {
    color: attributes.shadowCol,
    onChange: val => setAttributes({
      shadowCol: val
    }),
    enableAlpha: true,
    defaultValue: ""
  }))))));
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit */ "./src/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./save */ "./src/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./block.json */ "./src/block.json");
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */


/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * Internal dependencies
 */




/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_5__.name, {
  keywords: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Masonry galllery', 'ctc-gal'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('masonry gallery', 'ctc-gal'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Gallery", 'ctc-gal')],
  attributes: {
    brkWidth: {
      type: "Number",
      default: 48
    },
    gallery: {
      type: "Array",
      default: []
    },
    mediaIds: {
      type: "Array",
      default: []
    },
    gutWidth: {
      type: "Number",
      default: 15
    },
    clntId: {
      type: "String",
      default: ""
    },
    addShadEff: {
      type: 'Boolean',
      default: false
    },
    shadowCol: {
      type: "String",
      default: ''
    },
    boxShadWd: {
      type: "Number",
      default: 0
    },
    zoomOnHoverClass: {
      type: 'String',
      default: 'ctc-gal-zoom-on-hover'
    },
    overlayClass: {
      type: 'String',
      default: ''
    },
    zoomOnHover: {
      type: "Boolean",
      default: true
    },
    activateOverlay: {
      type: "Boolean",
      default: false
    }
  },
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_3__["default"],
  /**
   * @see ./save.js
   */
  save: _save__WEBPACK_IMPORTED_MODULE_4__["default"]
});

/***/ }),

/***/ "./src/save.js":
/*!*********************!*\
  !*** ./src/save.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */


/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
function save(_ref) {
  let {
    attributes
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save(), 0 < attributes.gallery.length && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      opacity: '0'
    },
    "data-gut-wd": attributes.gutWidth,
    className: `mas-gal-gallery ${attributes.overlayClass}`,
    id: `mas-div-${attributes.clntId}`
  }, attributes.gallery.map((x, i) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    key: i,
    className: `mas-img-${attributes.clntId} ${attributes.zoomOnHoverClass}`,
    style: {
      boxShadow: `${attributes.boxShadWd}px ${attributes.boxShadWd}px ${attributes.boxShadWd / 2}px ${attributes.shadowCol}`,
      width: `${attributes.brkWidth}% `
    },
    title: x.caption,
    src: x.url
  }))));
}

/***/ }),

/***/ "./node_modules/js-masonry/js-masonry.js":
/*!***********************************************!*\
  !*** ./node_modules/js-masonry/js-masonry.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   jsMasonry: () => (/* binding */ jsMasonry)
/* harmony export */ });
/*
 * Js Masonry
 * javascript library to create masnory layout of elements 
 * https://ujw0l.github.io/
 * MIT license
 *  
 */


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

/***/ }),

/***/ "./src/editor.scss":
/*!*************************!*\
  !*** ./src/editor.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./src/block.json":
/*!************************!*\
  !*** ./src/block.json ***!
  \************************/
/***/ ((module) => {

module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"masonry-gallery/ctc-gal-block","version":"2.5.0","title":"CTC Masonry Gallery ","category":"media","icon":"layout","description":"Create a Masonry Image gallery with Gutenberg block","example":{},"supports":{"html":false},"textdomain":"ctc-gal","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","viewScript":"file:/frontend.js"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkctc_gal_block"] = globalThis["webpackChunkctc_gal_block"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map