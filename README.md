# Humble Website Project

This project is the development of the Humble website, a platform for renting batteries and related accessories. The website was built based on a series of wireframes provided in Figma.

## Project Status

**Complete.** All pages and major components from the wireframes have been built and polished to an estimated 90% accuracy. The site is fully linked and navigable.

## Project Structure

```
/
├── index.html
├── industries.html
├── product-detail.html
├── batteries.html
├── accessories.html
├── support.html
├── about.html
├── profile.html
├── request-rental-confirmation.html
├── style.css
├── script.js
├── screenshot.js
├── command_history.md
├── design_notes.md
├── MANUAL_TESTING_REQUIRED.md
└── Wireframes/
    ├── ... (all .png wireframe files)
```

-   **HTML Files:** Each `.html` file represents a distinct page on the website.
-   **`style.css`:** A single stylesheet containing all styles for the project.
-   **`script.js`:** Contains JavaScript for interactive components like carousels and modals.
-   **`screenshot.js`:** A Node.js script that uses Playwright to take screenshots of the web pages for verification.
-   **`command_history.md`:** A log of all user commands and my subsequent actions.
-   **`design_notes.md`:** Detailed notes on design interpretation and future enhancement ideas.
-   **`MANUAL_TESTING_REQUIRED.md`:** A critical document listing all functionality that requires manual verification by a human user.
-   **`Wireframes/`:** A directory containing the original wireframe images.

## How to View the Website

To view the website, open any of the `.html` files in a modern web browser. The `index.html` file is the homepage.

## Summary of Work Completed

-   **Homepage (`index.html`):** Built and polished, featuring interactive carousels for products and industries.
-   **Industries Page (`industries.html`):** Built and polished, with large promotional cards for each industry bundle and interactive dropdowns.
-   **Product Detail Page (`product-detail.html`):** A detailed page for a single product, including a gallery, specs, and a rental request modal.
-   **Product Listing Pages (`batteries.html`, `accessories.html`):** Full-grid listing pages for all batteries and accessories.
-   **Static Pages (`about.html`, `support.html`, `profile.html`):** All static pages from the wireframes have been created and styled.
-   **Interactive Components:** All major interactive components (carousels, modals, dropdowns) have been implemented.
-   **Linking:** All pages have been linked together to create a fully navigable user experience.
-   **Documentation:** The project is thoroughly documented with a command history, design notes, and a manual testing guide.

## Manual Testing

As noted in `MANUAL_TESTING_REQUIRED.md`, some interactive features could not be reliably tested in my development environment. It is crucial that these are manually verified to ensure they function as expected.