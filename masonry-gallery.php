<?php
/*
 Plugin Name:CTC Gallery
 Plugin URI:https://github.com/ujw0l/masonry-gallery
 Description: Masonry Image Gallery for WordPress
 Version: 1.0.0
 Author: Ujwol Bastakoti
 Author URI:https://ujw0l.github.io/
 Text Domain:  ctc-gal
 License: GPLv2
*/


class ctcgGal{


public function __construct(){

    define('CTCG_DIR_PATH',plugin_dir_url(__FILE__));
    self::masGalRequiredWpAtion();
}


 /**
   * @since 1.0.0
   *
   * eneque Frontend JS file
   */

  public function enequeFrontendJs(){
    wp_enqueue_script('mgJsMasonry', CTCG_DIR_PATH.'js/js-masonry.js');
    wp_enqueue_script('mgJsOverlay', CTCG_DIR_PATH.'js/js-overlay.js');
    wp_enqueue_script('masGal', CTCG_DIR_PATH.'js/mas-gal.js',array('mgJsMasonry','mgJsOverlay'));
  }

     /**
   * @since 1.0.0
   *
   * eneque admin JS files
   */

  public function enequeAdminJs(){
    wp_enqueue_script('mgJsMasonry', CTCG_DIR_PATH.'js/js-masonry.js',array());

  }
/**
   * @since 1.0.0
   *
   * REquired Wp Actions
   * 
   */
private function masGalRequiredWpAtion(){


    add_action( 'init', array($this,'registerGutenbergBlocks' ));
    add_action( 'wp_enqueue_scripts', array($this,'enequeFrontendJs' ));
    add_action( 'admin_enqueue_scripts', array($this,'enequeAdminJs' ));
}


/**
   * @since 1.0.0
   *
   * Register gutenberg block
   * 
   */
  public function registerGutenbergBlocks(){
  


	// Block Editor Script.
wp_register_script(
    'mas-gal-block-editor',
    plugins_url( 'js/mas-gal-block.js',__FILE__ ),
    array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-edit-post','wp-components', 'wp-i18n','wp-data','mgJsMasonry' ),
 );
 
 register_block_type(
     'masonry-gallery/mas-gal-block',
    array(
       'editor_script' => 'mas-gal-block-editor',
    )
 );

  }


}

new ctcgGal();
