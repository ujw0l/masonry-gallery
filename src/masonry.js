import { jsMasonry } from 'js-masonry';

/**
 * Reuse the library's layout engine without accumulating resize listeners.
 *
 * @param {HTMLElement} gallery      Gallery container.
 * @param {Object}      root0        Layout options.
 * @param {number}      root0.width  Image width percentage.
 * @param {number}      root0.gutter Gap in pixels.
 */
export function mountMasonry( gallery, { width, gutter = 15 } = {} ) {
	const images = Array.from( gallery.querySelectorAll( 'img' ) );
	if ( ! images.length ) {
		gallery.style.opacity = '';
		return () => {};
	}
	const percentage = width ?? ( parseFloat( images[ 0 ].style.width ) || 40 );
	let frame;
	const layout = () => {
		const available = gallery.clientWidth;
		if ( ! available ) {
			return;
		}
		const margin = Math.min(
			Math.max( Number( gutter ) || 0, 0 ),
			available / 4
		);
		const brick = Math.max(
			1,
			Math.min( ( available * percentage ) / 100, available - 2 * margin )
		);
		// The original engine uses offset-parent coordinates. Our galleries have
		// their own positioning context, so normalize its output to that context.
		jsMasonry.prototype.layBrks.call( {}, gallery, {
			elWidth: brick,
			elMargin: margin,
			callback: () => {
				gallery.style.opacity = '';
			},
		} );
		images.forEach( ( image ) => {
			image.style.left = `${
				parseFloat( image.style.left ) - gallery.offsetLeft
			}px`;
			image.style.top = `${
				parseFloat( image.style.top ) - gallery.offsetTop
			}px`;
		} );
	};
	const schedule = () => {
		window.cancelAnimationFrame( frame );
		frame = window.requestAnimationFrame( layout );
	};
	images.forEach( ( image ) => {
		image.addEventListener( 'load', schedule );
		image.addEventListener( 'error', schedule );
	} );
	const observer =
		typeof window.ResizeObserver !== 'undefined'
			? new window.ResizeObserver( schedule )
			: null;
	observer?.observe( gallery );
	window.addEventListener( 'resize', schedule );
	schedule();
	return () => {
		window.cancelAnimationFrame( frame );
		observer?.disconnect();
		window.removeEventListener( 'resize', schedule );
		images.forEach( ( image ) => {
			image.removeEventListener( 'load', schedule );
			image.removeEventListener( 'error', schedule );
		} );
	};
}
