document.addEventListener("DOMContentLoaded", function() {
  const carousels = document.querySelectorAll('.carousel-wrapper');

  carousels.forEach(carousel => {
    const arrowLeft = carousel.querySelector('.carousel-arrow.left');
    const arrowRight = carousel.querySelector('.carousel-arrow.right');
    const productGrid = carousel.querySelector('.product-grid');

    arrowLeft.addEventListener('click', () => {
      productGrid.scrollBy({ left: -320, behavior: 'smooth' });
    });

    arrowRight.addEventListener('click', () => {
      productGrid.scrollBy({ left: 320, behavior: 'smooth' });
    });
  });
});