import { useEffect, useRef } from '@wordpress/element';
import {
	Button,
	ColorPicker,
	PanelBody,
	RangeControl,
	ToggleControl,
} from '@wordpress/components';
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	useBlockProps,
} from '@wordpress/block-editor';
import { __, _n, sprintf } from '@wordpress/i18n';
import { mountMasonry } from './masonry';
import './editor.scss';

function GalleryIcon() {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			aria-hidden="true"
		>
			<rect x="3" y="3" width="7" height="11" rx="2" />
			<rect x="14" y="3" width="7" height="6" rx="2" />
			<rect x="3" y="18" width="7" height="3" rx="1.5" />
			<rect x="14" y="13" width="7" height="8" rx="2" />
		</svg>
	);
}

export default function Edit( { clientId, attributes, setAttributes } ) {
	const galleryRef = useRef();
	const hasImages = attributes.gallery.length > 0;
	const galleryId = `mas-div-${ clientId }`;

	useEffect( () => {
		if ( attributes.clntId !== clientId ) {
			setAttributes( { clntId: clientId } );
		}
		const mediaIds = attributes.gallery.map( ( image ) => image.id );
		if (
			JSON.stringify( mediaIds ) !== JSON.stringify( attributes.mediaIds )
		) {
			setAttributes( { mediaIds } );
		}
	}, [
		clientId,
		attributes.clntId,
		attributes.gallery,
		attributes.mediaIds,
		setAttributes,
	] );

	useEffect( () => {
		if ( galleryRef.current ) {
			return mountMasonry( galleryRef.current, {
				width: attributes.brkWidth,
				gutter: attributes.gutWidth,
			} );
		}
	}, [ attributes.gallery, attributes.brkWidth, attributes.gutWidth ] );

	return (
		<div { ...useBlockProps( { className: 'ctc-gallery-editor' } ) }>
			<InspectorControls>
				<div className="ctc-gallery-inspector-intro">
					<span className="ctc-gallery-eyebrow">
						{ __( 'CTC MASONRY GALLERY', 'ctc-gal' ) }
					</span>
					<p>
						{ __(
							'A little space. A beautiful collection.',
							'ctc-gal'
						) }
					</p>
				</div>
				<PanelBody title={ __( 'Layout', 'ctc-gal' ) } initialOpen>
					<RangeControl
						label={ __( 'Image width (%)', 'ctc-gal' ) }
						help={ __(
							'Set how much of the gallery each image occupies.',
							'ctc-gal'
						) }
						min={ 1 }
						max={ 100 }
						value={ attributes.brkWidth }
						onChange={ ( value ) =>
							setAttributes( { brkWidth: value ?? 40 } )
						}
						resetFallbackValue={ 40 }
					/>
					<RangeControl
						label={ __( 'Space between images (px)', 'ctc-gal' ) }
						min={ 1 }
						max={ 50 }
						value={ attributes.gutWidth }
						onChange={ ( value ) =>
							setAttributes( { gutWidth: value ?? 15 } )
						}
						resetFallbackValue={ 15 }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Interaction', 'ctc-gal' ) } initialOpen>
					<ToggleControl
						label={ __( 'Enlarge on hover', 'ctc-gal' ) }
						help={ __(
							'Bring an image closer when visitors hover.',
							'ctc-gal'
						) }
						checked={ attributes.zoomOnHover }
						onChange={ ( value ) =>
							setAttributes( {
								zoomOnHover: value,
								zoomOnHoverClass: value
									? 'ctc-gal-zoom-on-hover'
									: '',
								...( value
									? {
											activateOverlay: false,
											overlayClass: '',
									  }
									: {} ),
							} )
						}
					/>
					<ToggleControl
						label={ __( 'Open in image viewer', 'ctc-gal' ) }
						help={ __(
							'Browse, zoom, and play a slideshow in a full-screen overlay. Enabling this turns off hover enlargement.',
							'ctc-gal'
						) }
						checked={ attributes.activateOverlay }
						onChange={ ( value ) =>
							setAttributes( {
								activateOverlay: value,
								overlayClass: value ? 'ctc-gal-overlay' : '',
								...( value
									? {
											zoomOnHover: false,
											zoomOnHoverClass: '',
									  }
									: {} ),
							} )
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Appearance', 'ctc-gal' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Image shadow', 'ctc-gal' ) }
						help={ __(
							'Add depth with a custom shadow.',
							'ctc-gal'
						) }
						checked={ attributes.addShadEff }
						onChange={ ( value ) =>
							setAttributes( {
								addShadEff: value,
								...( ! value
									? { shadowCol: '', boxShadWd: 0 }
									: {} ),
							} )
						}
					/>
					{ attributes.addShadEff && (
						<>
							<RangeControl
								label={ __( 'Shadow size (px)', 'ctc-gal' ) }
								min={ 0 }
								max={ 50 }
								value={ attributes.boxShadWd }
								onChange={ ( value ) =>
									setAttributes( { boxShadWd: value ?? 0 } )
								}
								resetFallbackValue={ 0 }
							/>
							<p className="ctc-gallery-color-label">
								{ __( 'Shadow color', 'ctc-gal' ) }
							</p>
							<ColorPicker
								color={ attributes.shadowCol }
								onChange={ ( value ) =>
									setAttributes( { shadowCol: value } )
								}
								enableAlpha
							/>
						</>
					) }
				</PanelBody>
			</InspectorControls>
			<MediaUploadCheck>
				<MediaUpload
					title={ __( 'Select images', 'ctc-gal' ) }
					multiple
					value={ attributes.mediaIds }
					gallery
					allowedTypes={ [ 'image' ] }
					onSelect={ ( gallery ) => setAttributes( { gallery } ) }
					render={ ( { open } ) => (
						<div
							className={ `ctc-gallery-shell ${
								hasImages ? 'has-images' : 'is-empty'
							}` }
						>
							<div className="ctc-gallery-header">
								<div className="ctc-gallery-brand">
									<span className="ctc-gallery-mark">
										<GalleryIcon />
									</span>
									<div>
										<span className="ctc-gallery-eyebrow">
											{ __( 'CTC GALLERY', 'ctc-gal' ) }
										</span>
										<h3>
											{ __(
												'Masonry collection',
												'ctc-gal'
											) }
										</h3>
									</div>
								</div>
								{ hasImages && (
									<Button
										variant="secondary"
										className="ctc-gallery-edit-button"
										onClick={ open }
									>
										{ __( 'Edit gallery', 'ctc-gal' ) }
										<span aria-hidden="true">↗</span>
									</Button>
								) }
							</div>
							{ hasImages ? (
								<>
									<div className="ctc-gallery-preview">
										<div
											ref={ galleryRef }
											id={ galleryId }
											className="ctc-gal-gallery"
										>
											{ attributes.gallery.map(
												( image, index ) => (
													<img
														key={ `${ image.id }-${ index }` }
														className={ `mas-img-${ clientId } ${ attributes.zoomOnHoverClass }` }
														style={ {
															width: `${ attributes.brkWidth }%`,
															boxShadow: `${
																attributes.boxShadWd
															}px ${
																attributes.boxShadWd
															}px ${
																attributes.boxShadWd /
																2
															}px ${
																attributes.shadowCol
															}`,
														} }
														alt={ image.alt || '' }
														title={ image.caption }
														src={ image.url }
													/>
												)
											) }
										</div>
									</div>
									<div className="ctc-gallery-footer">
										<span>
											{ sprintf(
												/* translators: %d: Number of images in the gallery. */
												_n(
													'%d image',
													'%d images',
													attributes.gallery.length,
													'ctc-gal'
												),
												attributes.gallery.length
											) }
											<span
												className="ctc-gallery-dot"
												aria-hidden="true"
											>
												·
											</span>
											{ __(
												'Masonry layout',
												'ctc-gal'
											) }
										</span>
										<span>
											{ __(
												'Fine-tune in block settings',
												'ctc-gal'
											) }
										</span>
									</div>
								</>
							) : (
								<div className="ctc-gallery-empty">
									<div
										className="ctc-gallery-art"
										aria-hidden="true"
									>
										<span />
										<span />
										<span />
										<span />
										<span />
									</div>
									<span className="ctc-gallery-eyebrow">
										{ __(
											'YOUR IMAGES, BEAUTIFULLY ARRANGED',
											'ctc-gal'
										) }
									</span>
									<h2>
										{ __(
											'Make room for your collection.',
											'ctc-gal'
										) }
									</h2>
									<p>
										{ __(
											'Choose your images. We’ll bring them together in a flowing masonry gallery.',
											'ctc-gal'
										) }
									</p>
									<Button
										variant="primary"
										className="ctc-gallery-select-button"
										onClick={ open }
									>
										<span aria-hidden="true">+</span>
										{ __( 'Select images', 'ctc-gal' ) }
									</Button>
									<span className="ctc-gallery-empty-note">
										{ __(
											'Upload new images or choose from your media library.',
											'ctc-gal'
										) }
									</span>
								</div>
							) }
						</div>
					) }
				/>
			</MediaUploadCheck>
		</div>
	);
}
