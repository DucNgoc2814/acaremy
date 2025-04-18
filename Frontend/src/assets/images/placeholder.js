/**
 * This file contains base64 encoded placeholder images for the application
 * to avoid external dependencies and SSL issues.
 */

// Simple colored rectangle with text SVG converted to base64
export const generatePlaceholderSVG = (color, text) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
      <rect width="600" height="400" fill="${color}" />
      <text x="300" y="200" font-family="Arial" font-size="36" fill="white" text-anchor="middle" dominant-baseline="middle">${text}</text>
    </svg>
  `;
  
  // Convert SVG to base64
  const base64 = btoa(svg);
  return `data:image/svg+xml;base64,${base64}`;
};

// Export placeholder images
export const placeholders = {
  laravel: generatePlaceholderSVG('#3949ab', 'Laravel'),
  vuejs: generatePlaceholderSVG('#41b883', 'Vue.js'),
  tailwind: generatePlaceholderSVG('#0ea5e9', 'TailwindCSS'),
  laravelApi: generatePlaceholderSVG('#3949ab', 'Laravel API'),
  book: generatePlaceholderSVG('#9c27b0', 'Book')
};

export default placeholders;
