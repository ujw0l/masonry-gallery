<?php
/**
*
 *Plugin Name:CTC Masonry Gallery
 *Plugin URI:https://github.com/ujw0l/masonry-gallery
 *Description: Masonry image gallery Gutenberg block for WordPress
 *Version: 2.7.0
 *Author: Ujwol Bastakoti
 *Author URI:https://ujw0l.github.io/
 *Text Domain:  ctc-gal
 *License: GPLv2
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_ctc_gal_block_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_ctc_gal_block_block_init' );
