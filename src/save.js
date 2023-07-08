/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({attributes}) {
	return (
		<div { ...useBlockProps.save() }>
			{0 < attributes.gallery.length && <div style={{opacity:'0'}} data-gut-wd={attributes. gutWidth} className= {`mas-gal-gallery ${attributes.overlayClass}`} id= {`mas-div-${attributes.clntId}` } > 
			{
			    attributes.gallery.map((x,i)=><img   key={i} className={ `mas-img-${attributes.clntId} ${attributes.zoomOnHoverClass}`} style={ { boxShadow:`${attributes.boxShadWd}px ${attributes.boxShadWd}px ${attributes.boxShadWd/2}px ${attributes.shadowCol}`, width : `${attributes.brkWidth}% `} } title={ x.caption} src= {x.url}  /> )
			}
			</div> 
			}

		</div>
	);
}
