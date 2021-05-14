const { useEffect } = React;
const jsMas = new jsMasonry();
const { CheckboxControl, PanelBody, TextControl, Button, SideBar, SelectControl, RangeControl, } = wp.components;
const { InspectorControls, MediaUpload, RichText } = wp.blockEditor;
const { PluginSidebar } = wp.editPost;
const { __ } = wp.i18n;
const mgEl = wp.element.createElement;
const { registerBlockType } = wp.blocks;



/**
 *  @since 1.0.0
 *
 * Register Gallery Block
 */


wp.blocks.registerBlockType('masonry-gallery/mas-gal-block', {
    title: __("Masonry Gallery", 'mas-gal'),
    icon: 'format-gallery',
    description: __("Masonry galllery", 'mas-gal'),
    category: 'media',
    keywords: [__('Masonry galllery', 'mas-gal'), __('masonry gallery', 'mas-gal')],
    attributes: {
        timeStamp: {
            type: 'string', default: Date.now()
        },
        brkWidth: { type: Number, default: 48 },
        gallery: { type: Array, default: [] },
        title: { type: 'string', default: __('', 'mas-gal') }
    },
    example: {

    },
    edit: props => {
        useEffect(() => {
            if (props.attributes.gallery.length >= 1) {

                Array.from(document.querySelectorAll(`.mas-img-${props.attributes.timeStamp}`)).map(x => x.style.width = '');

                jsMas.prepMas(`#mas-div-${props.attributes.timeStamp}`, { percentWidth: true });
                setTimeout(() => window.dispatchEvent(new Event('resize')), 100);

            }
        }, [props.attributes.gallery, props.attributes.brkWidth]);


        return mgEl('div', null, mgEl('div', {},),
            mgEl('div', { className: 'mas-gal-gallery', 'id': `mas-div-${props.attributes.timeStamp}` }, props.attributes.gallery.map(x => mgEl('img', { className: `mas-img-${props.attributes.timeStamp}`, 'width': `${props.attributes.brkWidth}% `, 'title': x.caption, src: x.url }),
            )),
            mgEl(MediaUpload, {
                title: __('Select Images', 'mas-gal'),
                multiple: true,
                gallery: true,
                onSelect: gal => props.setAttributes({ gallery: gal }),
                render: ({ open }) => mgEl(Button, {
                    className: "dashicons-before dashicons-format-gallery", onClick: open
                }, __(" Select Images", "mas-gal")),
            }),
            mgEl(InspectorControls, null, mgEl(PanelBody, null,
                mgEl(RangeControl, {
                    label: __('Image width in %', 'mas-gal'),
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