const { useEffect } = React;
const jsMas = new jsMasonry();
const { CheckboxControl, PanelBody, Button, RangeControl, } = wp.components;
const { InspectorControls, MediaUpload } = wp.blockEditor;
const { __ } = wp.i18n;
const mgEl = wp.element.createElement;
const { registerBlockType } = wp.blocks;



/**
 *  @since 1.0.0
 *
 * Register Gallery Block
 */


wp.blocks.registerBlockType('masonry-gallery/ctc-gal-block', {
    title: __("CTC Gallery", 'ctc-gal'),
    icon: 'format-gallery',
    description: __("CTC Masonry galllery", 'ctc-gal'),
    category: 'media',
    keywords: [__('Masonry galllery', 'ctc-gal'), __('masonry gallery', 'ctc-gal')],
    attributes: {
        timeStamp: {
            type: 'string', default: Date.now()
        },
        brkWidth: { type: Number, default: 48 },
        gallery: { type: Array, default: [] },
        mediaIds: { type: Array, default: [] },
    },
    example: {

    },
    edit: props => {
        useEffect(() => {
            let Ids = Array;
            if (props.attributes.gallery.length >= 1) {

                Array.from(document.querySelectorAll(`.mas-img-${props.attributes.timeStamp}`)).map(x => x.style.width = '');

                jsMas.prepMas(`#mas-div-${props.attributes.timeStamp}`, { percentWidth: true });
                setTimeout(() => window.dispatchEvent(new Event('resize')), 100);

                Ids = props.attributes.gallery.map(x => x.id);
                props.setAttributes({ mediaIds: Ids })
            }

        }, [props.attributes.gallery, props.attributes.brkWidth]);


        return mgEl('div', null, mgEl('div', {},),
            mgEl('div', { className: 'ctc-gal-gallery', 'id': `mas-div-${props.attributes.timeStamp}` }, props.attributes.gallery.map(x => mgEl('img', { className: `mas-img-${props.attributes.timeStamp}`, 'width': `${props.attributes.brkWidth}% `, 'title': x.caption, src: x.url }),
            )),
            mgEl(MediaUpload, {
                title: __('Select Images', 'ctc-gal'),
                multiple: true,
                value: props.attributes.mediaIds,
                gallery: true,
                onSelect: gal => props.setAttributes({ gallery: gal }),
                render: ({ open }) => mgEl('div', { style: { width: '100%', backgroundColor: 'white', padding: '10px' } },
                    mgEl('h5', { className: 'dashicons-before dashicons-format-gallery' }, __('CTC Gallery', 'ctc-gal')),
                    mgEl(Button, {
                        className: "dashicons-before dashicons-embed-photo",
                        style: { marginLeft: 'auto', marginRight: 'auto', display: 'block', border: '1px solid black' },
                        onClick: open
                    }, __(" Select Images", "ctc-gal"))),
            }),
            mgEl(InspectorControls, null, mgEl(PanelBody, null,
                mgEl(RangeControl, {
                    label: __('Image width in percentage', 'ctc-gal'),
                    min: 1,
                    max: 100,
                    onChange: val => props.setAttributes({ brkWidth: val }),
                    value: props.attributes.brkWidth,
                    resetFallbackValue: 30
                }))))
    },
    save: props => mgEl('div', null,
        mgEl('div', { style: { opacity: '0' }, className: 'mas-gal-gallery' }, props.attributes.gallery.map(x => mgEl('img', { 'width': `${props.attributes.brkWidth}% `, 'title': x.caption, src: x.url })
        )
        ))

});