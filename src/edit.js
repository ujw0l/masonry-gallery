import {useEffect} from 'react';
import { CheckboxControl, PanelBody, Button, RangeControl, } from '@wordpress/components';
import { jsMasonry } from 'js-masonry';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps,InspectorControls,MediaUpload,MediaUploadCheck } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({clientId,attributes,setAttributes}) {



	useEffect(() => {

		setAttributes({clntId:clientId})
		let Ids = Array();
		if (attributes.gallery.length >= 1) {

			new jsMasonry(`#mas-div-${attributes.clntId}`, { percentWidth: true,  elMargin:attributes.gutWidth });
			setTimeout(() => window.dispatchEvent(new Event('resize')), 300);

			Ids = attributes.gallery.map(x => x.id);
			setAttributes({ mediaIds: Ids })
		}

	}, [attributes.gallery, attributes.brkWidth,attributes.gutWidth]);
	return (
		<div { ...useBlockProps() }>
			
			{0 < attributes.gallery.length && <div className= 'ctc-gal-gallery' id= {`mas-div-${attributes.clntId}` } > 
			{
			    attributes.gallery.map((x,i)=><img   key={i} className={ `mas-img-${attributes.clntId}`} style={ {width: `${attributes.brkWidth}%`} } title={ x.caption} src= {x.url}  /> )
			}
			</div> 
			}


<div  style={ { border: '1px solid rgb(61, 148, 218)', backgroundColor: 'rgba(255,255,255,1)', } }>
			<MediaUploadCheck>
					<MediaUpload
					 title = {__('Select Images', 'ctc-gal')}
					 multiple={ true}
					 value= {attributes.mediaIds}
					 gallery= {true}
					 onSelect={ gal => setAttributes({ gallery: gal })}
						allowedTypes={['image']}
						render={({ open }) => (

							<div  style= {{ width: '100%', backgroundColor: 'rgba(255,255,,255,1)', color: 'rgb(61, 148, 218)', padding: '10px' }}>
							<h5 className= 'dashicons-before dashicons-format-gallery'>{__('CTC Gallery','ctc-gal')}</h5>
							<Button style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block', color: 'rgb(61, 148, 218)', border: '1px solid rgb(61, 148, 218)'}} className= {"ctc-gal-button dashicons-before dashicons-format-gallery"}  onClick={open}>{__(" Select Images", "ctc-gal")}</Button>
						</div>
						)}
					/>
				</MediaUploadCheck>
</div>

			<div>
				<InspectorControls>

				<PanelBody>

					<RangeControl
					label={ __('Image width in percentage', 'ctc-gal')}
                    min= {1}
                    max= {100}
                    onChange = { val => setAttributes({ brkWidth: val })}
                    value = {attributes.brkWidth}
                    resetFallbackValue= {30}
					/>

					<RangeControl
					

					label={ __('Gutter Width', 'ctc-gal')}
                    min = {1}
                    max = {50}
                    onChange = {val => setAttributes({ gutWidth: val })}
                    value = {attributes.gutWidth}
                    resetFallbackValue = {0}
					
					/>

				</PanelBody>

				</InspectorControls>

			</div>
		</div>
	);
}
