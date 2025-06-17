# Humble Website Project

## Overview

This project is the development of the Humble website, a platform for renting batteries and related accessories. The development is based on wireframes provided in Figma and translated into HTML and CSS.

## Project Structure

- `index.html`: The main HTML file for the homepage.
- `style.css`: The stylesheet containing all the CSS rules for the website.
- `Wireframes/`: A directory containing the original wireframe images that serve as the design specification.
- `README.md`: This documentation file.

## How to View

To view the website, simply open the `index.html` file in any modern web browser.

## Code Overview

### HTML (`index.html`)

The HTML is structured semantically with the following main sections:

- `<header>`: Contains the main navigation, including the logo and links to other pages.
- `<main>`: The main content of the page, which is further divided into sections:
    - `.hero`: The main introductory section with the primary headline and call-to-action.
    - `.products`: Sections for displaying product grids (e.g., "Explore our batteries", "Accessories").
    - `.industries`: Showcases the different industry-specific bundles.
    - `.advantages-section`: Highlights the key benefits of the service.
    - `.testimonials`: Features customer testimonials.
    - `.trusted-by`: A section to display logos of partner or client companies.
    - `.cta`: A final call-to-action section.
- `<footer>`: Contains contact information and site-wide links.

### CSS (`style.css`)

The CSS is organized to correspond with the HTML structure. Key class patterns include:

- `.product-card`: Styles for the individual product cards.
- `.industry-card`: Styles for the industry-specific cards.
- `.advantage-card`: Styles for the cards in the advantages section.
- Utility classes and element selectors are used for general styling.

## Next Steps

- Implement the specific fonts from the wireframes.
- Add icons to product cards and other areas.
- Build out the additional pages (Industries, Product Detail, etc.).
- Add the images and logos to replace the placeholders.
