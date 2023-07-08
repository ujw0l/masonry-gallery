/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, {

	keywords: [__('Masonry galllery', 'ctc-gal'), __('masonry gallery', 'ctc-gal'), __("Gallery",'ctc-gal'), __("Collage",'ctc-gal')],
	
	attributes: {
		        brkWidth: { type: "Number", default: 48 },
		        gallery: { type: "Array", default: [] },
		        mediaIds: { type: "Array", default: [] },
		        gutWidth:{type:"Number", default:15},
		        clntId :{type:"String", default:""},
				addShadEff:{type:'Boolean', default:false},
				shadowCol:{type:"String", default:''},
				boxShadWd:{type:"Number", default:0},
				zoomOnHoverClass:{type:'String',default:'ctc-gal-zoom-on-hover'},
				overlayClass:{type:'String', default:''},
				zoomOnHover:{type:"Boolean", default:true},
				activateOverlay:{type:"Boolean",default:false} 
		    },
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
} );
