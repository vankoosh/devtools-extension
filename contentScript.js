// CSS property to add
const cssProperty = 'border';
const cssValue = '1px solid black';

// Function to apply CSS to all block-level elements
function applyCSSToBlockElements() {
  // Select all block-level elements
  const blockElements = document.querySelectorAll('div, p, h1, h2, h3, h4, h5, h6, ul, ol, li, blockquote, pre, section, article, aside, footer, header, nav, figure, figcaption');

  // Apply the CSS property to each element
  blockElements.forEach(element => {
    element.style[cssProperty] = cssValue;
  });
}

// Run the function
applyCSSToBlockElements();
