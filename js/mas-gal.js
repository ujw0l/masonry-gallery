window.addEventListener('DOMContentLoaded', () => {

    new jsMasonry('.mas-gal-gallery', { percentWidth: true, callback: el => el.style.opacity = '' });

    const overlay = new jsOverlay();
    overlay.createOverlay({
        imgGallery: '.mas-gal-gallery',
        containerHt: 700,
        containerWd: 900,
    })

    document.querySelector('body').style.overflow = '';

    setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
})