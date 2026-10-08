import { ctcOverlayViewer } from 'ctc-gallery-viewer';
import { __, sprintf } from '@wordpress/i18n';
import { mountMasonry } from './masonry';

/** Keep the existing viewer, adding responsive presentation and keyboard access. */
class GalleryViewer extends ctcOverlayViewer {
	prepareGal( gallery ) {
		const images = Array.from( gallery.querySelectorAll( 'img' ) );
		images.forEach( ( image, index ) => {
			image.setAttribute( 'role', 'button' );
			image.tabIndex = 0;
			image.setAttribute(
				'aria-label',
				sprintf(
					/* translators: %d: Image number in the gallery. */
					__( 'Open image %d in viewer', 'ctc-gal' ),
					index + 1
				)
			);
			image.addEventListener( 'click', ( event ) =>
				this.createOverlay( event.currentTarget, index, images )
			);
			image.addEventListener( 'keydown', ( event ) => {
				if ( event.key === 'Enter' || event.key === ' ' ) {
					event.preventDefault();
					image.click();
				}
			} );
		} );
	}

	getOptimizedImageSize( width, height, imageWidth, imageHeight ) {
		const ratio = Math.min(
			1,
			Math.max( 1, width - ( width <= 600 ? 40 : 200 ) ) /
				( imageWidth || 1 ),
			Math.max( 1, height - 200 ) / ( imageHeight || 1 )
		);
		return {
			width: ( imageWidth || 1 ) * ratio,
			height: ( imageHeight || 1 ) * ratio,
		};
	}

	createOverlay( image, index, images ) {
		if ( document.getElementById( 'gallery-overlay' ) ) {
			return;
		}
		this.returnFocus = image;
		this.previousOverflow = document.body.style.overflow;
		this.previousMargin = document.body.style.margin;
		super.createOverlay( image, index, images );
		const overlay = document.getElementById( 'gallery-overlay' );
		overlay.classList.add( 'ctc-premium-viewer' );
		overlay.setAttribute( 'role', 'dialog' );
		overlay.setAttribute( 'aria-modal', 'true' );
		overlay.setAttribute( 'aria-label', __( 'Image viewer', 'ctc-gal' ) );
		const labels = {
			'overlay-close-btn': __( 'Close viewer', 'ctc-gal' ),
			'gal-prev-img': __( 'Previous image', 'ctc-gal' ),
			'gal-first-img': __( 'First image', 'ctc-gal' ),
			'img-zoom-in': __( 'Zoom in', 'ctc-gal' ),
			'gal-slide-show': __( 'Play or pause slideshow', 'ctc-gal' ),
			'img-zoom-out': __( 'Zoom out', 'ctc-gal' ),
			'gal-last-img': __( 'Last image', 'ctc-gal' ),
			'gal-next-img': __( 'Next image', 'ctc-gal' ),
		};
		Object.entries( labels ).forEach( ( [ id, label ] ) => {
			const control = overlay.querySelector( `#${ id }` );
			if ( ! control ) {
				return;
			}
			control.setAttribute( 'role', 'button' );
			control.setAttribute( 'aria-label', label );
			control.title = label;
			control.tabIndex = 0;
			control.addEventListener( 'keydown', ( event ) => {
				if ( event.key === 'Enter' || event.key === ' ' ) {
					event.preventDefault();
					control.click();
				}
			} );
		} );
		overlay.querySelector( '#overlay-close-btn' ).textContent = '×';
		overlay
			.querySelectorAll( '.img-preview' )
			.forEach( ( preview, previewIndex ) => {
				preview.setAttribute( 'role', 'button' );
				preview.setAttribute(
					'aria-label',
					sprintf(
						/* translators: %d: Image number in the gallery. */
						__( 'View image %d', 'ctc-gal' ),
						previewIndex + 1
					)
				);
				preview.tabIndex = 0;
				preview.addEventListener( 'keydown', ( event ) => {
					if ( event.key === 'Enter' || event.key === ' ' ) {
						event.preventDefault();
						preview.click();
					}
				} );
			} );
		this.updateImageInfo( index, images, overlay );
		overlay.querySelector( '#overlay-close-btn' ).focus();
	}

	updateImageInfo( index, images, overlay ) {
		overlay.querySelector( '#loaded-img' ).alt = images[ index ].alt || '';
		overlay
			.querySelectorAll( '.img-preview' )
			.forEach( ( preview, previewIndex ) =>
				preview.setAttribute(
					'aria-current',
					String( index === previewIndex )
				)
			);
	}

	loadImg( index, images, overlay, image ) {
		super.loadImg( index, images, overlay, image );
		this.updateImageInfo( index, images, overlay );
	}

	adjustApp( event ) {
		// The original library expects a loading label even after navigation.
		const overlay = document.getElementById( 'gallery-overlay' );
		if ( overlay && ! overlay.querySelector( '#image-loading-main' ) ) {
			const loading = document.createElement( 'span' );
			loading.id = 'image-loading-main';
			loading.style.display = 'none';
			overlay.appendChild( loading );
		}
		super.adjustApp( event );
	}

	onKeyStroke( event ) {
		const overlay = document.getElementById( 'gallery-overlay' );
		if ( ! overlay ) {
			return;
		}
		const controls = {
			ArrowUp: 'img-zoom-in',
			ArrowDown: 'img-zoom-out',
			ArrowLeft: 'gal-prev-img',
			ArrowRight: 'gal-next-img',
			Escape: 'overlay-close-btn',
		};
		if ( controls[ event.key ] ) {
			event.preventDefault();
			overlay.querySelector( `#${ controls[ event.key ] }` )?.click();
		}
		if ( event.key === 'Tab' ) {
			const buttons = Array.from(
				overlay.querySelectorAll( '[tabindex="0"]' )
			);
			const current = buttons.indexOf(
				overlay.ownerDocument.activeElement
			);
			event.preventDefault();
			buttons[
				( current + ( event.shiftKey ? -1 : 1 ) + buttons.length ) %
					buttons.length
			]?.focus();
		}
	}

	closeOverlay( overlay ) {
		super.closeOverlay( overlay );
		document.body.style.overflow = this.previousOverflow;
		document.body.style.margin = this.previousMargin;
		this.returnFocus?.focus( { preventScroll: true } );
	}
}

function initializeGalleries() {
	document.querySelectorAll( '.mas-gal-gallery' ).forEach( ( gallery ) => {
		// Populate accessible names at runtime, preserving existing saved markup.
		gallery.querySelectorAll( 'img' ).forEach( ( image ) => {
			if ( ! image.hasAttribute( 'alt' ) ) {
				image.alt = new window.DOMParser().parseFromString(
					image.title || '',
					'text/html'
				).body.textContent;
			}
		} );
		mountMasonry( gallery, {
			gutter: gallery.getAttribute( 'data-gut-wd' ),
		} );
	} );
	new GalleryViewer( '.mas-gal-gallery.ctc-gal-overlay' );
}

if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', initializeGalleries, {
		once: true,
	} );
} else {
	initializeGalleries();
}
