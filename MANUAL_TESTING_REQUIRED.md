# Manual Testing Required

This document lists all the interactive components and user flows that could not be reliably tested with the automated screenshotting tools due to limitations with local `file://` URLs.

It is crucial that these items are manually tested by a human user to ensure they function as expected.

## Components to Test:

1.  **"Request Rental" Modal (`product-detail.html`):
    *   **Trigger:** Clicking the "Rent Now" button.
    *   **Expected Behavior:** The modal window should appear.
    *   **Close Action 1:** Clicking the '×' button should close the modal.
    *   **Close Action 2:** Clicking outside the modal content should close the modal.

2.  **Bundle Dropdown Menu (Not yet implemented):
    *   **Trigger:** Clicking the dropdown element.
    *   **Expected Behavior:** The dropdown menu should appear with a list of options.

3.  **Bundle Creation Modal (Not yet implemented):
    *   **Trigger:** TBD (likely from a "Create Bundle" button).
    *   **Expected Behavior:** The modal for creating a custom bundle should appear.

4.  **All Navigation Links (`<a href...>`):
    *   While I have manually verified the `href` attributes in the code, a full manual click-through of the entire site navigation (header, footer, and all in-page links) is essential to guarantee a seamless user experience.