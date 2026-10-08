# CTC Masonry Gallery 🎨

**Contributors:** UjW0L
**Donate link:** https://www.paypal.com/donate/?hosted_button_id=VUJCB99MC6R48
**Tags:** block, gallery, masonry, overlay, image-album
**Requires at least:** 5.7.2
**Tested up to:** 6.7.10
**Requires PHP:** 7.4.9
**Stable tag:** 2.8.0
**License:** GPL V2

## Description

CTC Masonry Gallery creates flowing image collections in the WordPress Gutenberg editor. Version 2.8.0 brings a refined editor, a polished image viewer, and more reliable image loading while preserving the existing gallery features and saved block markup.

### Key Features

- **Masonry layout:** Images retain their proportions and arrange automatically as the gallery resizes.
- **Refined editor:** A welcoming image-selection state, a live gallery preview, an image count, and a clear Edit gallery action.
- **Grouped settings:** Layout, Interaction, and Appearance panels keep every existing control easy to find.
- **Image viewer:** Browse thumbnails, navigate to the first or last image, zoom in or out, and play or pause a slideshow.
- **Keyboard access:** Open the viewer with Enter or Space; use Left/Right to browse, Up/Down to zoom, and Escape to close. Tab stays within the viewer and focus returns to the selected image on close.
- **Hover enlargement:** Optionally enlarge images on hover. Hover enlargement and the image viewer remain mutually exclusive.
- **Custom shadows:** Adjust shadow size and color, including transparency.
- **Flexible spacing:** Set image width from 1–100% and the gutter from 1–50 pixels.
- **Reliable loading:** Cached, slow, and failed image loads no longer keep the entire gallery hidden.
- **Existing galleries preserved:** No migration is needed; the original masonry and viewer libraries remain in the plugin.

### What's Next

Explore my other WordPress projects:

- [CTC Gallery 🎨](https://ujwol.gumroad.com/l/brrfn) - Four unique premium galleries block in same plugin
- [Gravity Forms Add-ons](https://gfaddon.ujwolb.com.np/)
- [CT Commerce Lite 🛒](https://wordpress.org/plugins/ctc-lite/) - A block-based eCommerce plugin.

## Installation

To install and activate CTC Masonry Gallery:

1. Upload the plugin files to the `/wp-content/plugins/masonry-gallery` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress.
3. Go to the Post screen and look for the Masonry Gallery block in the Gutenberg section.
4. Add the block to your post or page.
5. Use **Edit gallery** to add, remove, or reorder images in the media library.
6. Adjust image width and spacing under **Layout**, choose hover enlargement or the viewer under **Interaction**, and configure shadows under **Appearance**.
7. Save or publish the post to display the gallery.

To update an existing installation, replace the plugin files with the new release. Existing galleries keep their images and settings.

## Screenshots

1. Refined Gutenberg gallery editor with a live masonry preview and collection details.
2. Grouped Layout, Interaction, and Appearance settings alongside the gallery preview.
3. A published masonry gallery with rounded image corners and balanced spacing.
4. The full-screen image viewer with thumbnails, captions, navigation, zoom, and slideshow controls.
5. The image-selection screen for starting a new collection.

## Changelog

### 2.8.0

- Redesigned the editor with a refined empty state, gallery header, live preview, and collection details.
- Organized all existing controls into Layout, Interaction, and Appearance panels.
- Polished image corners and hover transitions while preserving the enlargement option.
- Refined the existing overlay viewer with responsive controls, thumbnail selection, and a dark backdrop.
- Added keyboard activation, dialog focus handling, accessible control names, and reduced-motion support.
- Improved masonry initialization for cached, slow, and failed images, and fixed full-width layouts.
- Fixed source-library exports so production rebuilds retain both original scripts.
- Preserved saved block markup and existing gallery settings.
- Updated project links and documentation.

### 2.7.0
- Enhanced gallery display on image load 📥

### 2.6.0
- Added image box shadow background effect 🖍️
- Added optional image enlargement on hover 🔍
- Added optional display of images in overlay 🖼️

### 2.5.1
- Minor bug fixes 🐞

### 2.5.0
- Added JSX support for development 🛠️
- Minified version of JavaScript included ⚡

### 2.0.0
- Introduced CTC Overlay viewer 🎥
- Added gutter width adjustment option 📏

### 1.0.0
- Initial stable release 🚀

## Frequently Asked Questions

**Q: How do I adjust the gutter width between images?**
A: You can adjust the gutter width in the block settings under the Gutenberg editor.

**Q: Can I customize the modal view?**
A: Enable **Open in image viewer** in the Interaction panel. The viewer includes thumbnail navigation, zoom controls, and a slideshow.

**Q: Where can I get support?**
A: For support or to report issues, please visit the [Support Forum](https://wordpress.org/support/plugin/block-for-masonry-gallery).
## Development

```sh
npm ci
npm run build
npm run lint:js
npm run lint:css
```

The `src/` directory contains the editable source. Commit the generated `build/` assets with source changes so the plugin can be installed without Node.js. The webpack adapter in `tooling/` exposes the classes from the existing `js-masonry` and `ctc-gallery-viewer` packages; both dependencies and all existing npm scripts are retained.

## WordPress.org listing assets

The `assets/` directory contains the masonry icon as an editable SVG and 128×128 and 256×256 PNG files. The directory listing uses a static icon. Copy these three icon files and the five root-level `screenshot-*.png` files to the plugin's top-level SVN `assets/` directory, alongside `trunk/` and `tags/`. See the [WordPress.org asset requirements](https://developer.wordpress.org/plugins/wordpress-org/plugin-assets/) for publishing details.
