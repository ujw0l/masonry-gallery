window.addEventListener('DOMContentLoaded', () => {

    console.log(new jsMasonry());
    new jsMasonry('.mas-gal-gallery', { percentWidth: true, callback: el => el.style.opacity = '' });

    const overlay = new jsOverlay();
    overlay.createOverlay({
        imgGallery: '.mas-gal-gallery',
        containerHt: 1000,
        containerWd: 1500,
    })

    document.querySelector('body').style.overflow = '';

    setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
})