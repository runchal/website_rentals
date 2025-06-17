document.addEventListener("DOMContentLoaded", function() {
  // Carousel Functionality
  const carousels = document.querySelectorAll('.carousel-wrapper');

  carousels.forEach(carousel => {
    const arrowLeft = carousel.querySelector('.carousel-arrow.left');
    const arrowRight = carousel.querySelector('.carousel-arrow.right');
    const productGrid = carousel.querySelector('.product-grid, .industry-grid');

    if(arrowLeft){
        arrowLeft.addEventListener('click', () => {
          productGrid.scrollBy({ left: -320, behavior: 'smooth' });
        });
    }

    if(arrowRight){
        arrowRight.addEventListener('click', () => {
          productGrid.scrollBy({ left: 320, behavior: 'smooth' });
        });
    }
  });

  // Modal Functionality
  const modal = document.getElementById('rental-modal');
  const rentNowButton = document.querySelector('.actions .btn-primary');
  const closeButton = document.querySelector('.close-button');

  if (rentNowButton) {
      rentNowButton.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'block';
      });
  }

  if (closeButton) {
      closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
      });
  }

  window.addEventListener('click', (e) => {
    if (e.target == modal) {
      modal.style.display = 'none';
    }
  });
});