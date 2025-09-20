const fs = require('fs');
const path = require('path');

const svgIcon = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#2d2d2d;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1a1a1a;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="buttonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#4a4a4a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#3a3a3a;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ffb143;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#ff9500;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="512" height="512" rx="80" fill="url(#bgGradient)"/>
  
  <!-- Calculator body -->
  <rect x="64" y="64" width="384" height="384" rx="32" fill="#2d2d2d" stroke="#404040" stroke-width="2"/>
  
  <!-- Display -->
  <rect x="96" y="96" width="320" height="80" rx="16" fill="#1a1a1a" stroke="#404040" stroke-width="1"/>
  <text x="396" y="150" font-family="Arial, sans-serif" font-size="36" font-weight="300" fill="#ffffff" text-anchor="end">123.45</text>
  
  <!-- Button grid -->
  <!-- Row 1 -->
  <rect x="96" y="200" width="60" height="40" rx="8" fill="#666666"/>
  <text x="126" y="225" font-family="Arial, sans-serif" font-size="16" font-weight="500" fill="#ffffff" text-anchor="middle">C</text>
  
  <rect x="168" y="200" width="60" height="40" rx="8" fill="#666666"/>
  <text x="198" y="225" font-family="Arial, sans-serif" font-size="16" font-weight="500" fill="#ffffff" text-anchor="middle">CE</text>
  
  <rect x="240" y="200" width="60" height="40" rx="8" fill="#666666"/>
  <text x="270" y="225" font-family="Arial, sans-serif" font-size="14" font-weight="500" fill="#ffffff" text-anchor="middle">⌫</text>
  
  <rect x="312" y="200" width="60" height="40" rx="8" fill="url(#orangeGradient)"/>
  <text x="342" y="225" font-family="Arial, sans-serif" font-size="18" font-weight="600" fill="#ffffff" text-anchor="middle">÷</text>
  
  <!-- Row 2 -->
  <rect x="96" y="252" width="60" height="40" rx="8" fill="url(#buttonGradient)"/>
  <text x="126" y="277" font-family="Arial, sans-serif" font-size="18" font-weight="400" fill="#ffffff" text-anchor="middle">7</text>
  
  <rect x="168" y="252" width="60" height="40" rx="8" fill="url(#buttonGradient)"/>
  <text x="198" y="277" font-family="Arial, sans-serif" font-size="18" font-weight="400" fill="#ffffff" text-anchor="middle">8</text>
  
  <rect x="240" y="252" width="60" height="40" rx="8" fill="url(#buttonGradient)"/>
  <text x="270" y="277" font-family="Arial, sans-serif" font-size="18" font-weight="400" fill="#ffffff" text-anchor="middle">9</text>
  
  <rect x="312" y="252" width="60" height="40" rx="8" fill="url(#orangeGradient)"/>
  <text x="342" y="277" font-family="Arial, sans-serif" font-size="18" font-weight="600" fill="#ffffff" text-anchor="middle">×</text>
  
  <!-- Row 3 -->
  <rect x="96" y="304" width="60" height="40" rx="8" fill="url(#buttonGradient)"/>
  <text x="126" y="329" font-family="Arial, sans-serif" font-size="18" font-weight="400" fill="#ffffff" text-anchor="middle">4</text>
  
  <rect x="168" y="304" width="60" height="40" rx="8" fill="url(#buttonGradient)"/>
  <text x="198" y="329" font-family="Arial, sans-serif" font-size="18" font-weight="400" fill="#ffffff" text-anchor="middle">5</text>
  
  <rect x="240" y="304" width="60" height="40" rx="8" fill="url(#buttonGradient)"/>
  <text x="270" y="329" font-family="Arial, sans-serif" font-size="18" font-weight="400" fill="#ffffff" text-anchor="middle">6</text>
  
  <rect x="312" y="304" width="60" height="40" rx="8" fill="url(#orangeGradient)"/>
  <text x="342" y="329" font-family="Arial, sans-serif" font-size="18" font-weight="600" fill="#ffffff" text-anchor="middle">−</text>
  
  <!-- Row 4 -->
  <rect x="96" y="356" width="60" height="40" rx="8" fill="url(#buttonGradient)"/>
  <text x="126" y="381" font-family="Arial, sans-serif" font-size="18" font-weight="400" fill="#ffffff" text-anchor="middle">1</text>
  
  <rect x="168" y="356" width="60" height="40" rx="8" fill="url(#buttonGradient)"/>
  <text x="198" y="381" font-family="Arial, sans-serif" font-size="18" font-weight="400" fill="#ffffff" text-anchor="middle">2</text>
  
  <rect x="240" y="356" width="60" height="40" rx="8" fill="url(#buttonGradient)"/>
  <text x="270" y="381" font-family="Arial, sans-serif" font-size="18" font-weight="400" fill="#ffffff" text-anchor="middle">3</text>
  
  <rect x="312" y="356" width="60" height="92" rx="8" fill="url(#orangeGradient)"/>
  <text x="342" y="407" font-family="Arial, sans-serif" font-size="20" font-weight="600" fill="#ffffff" text-anchor="middle">=</text>
  
  <!-- Row 5 -->
  <rect x="96" y="408" width="132" height="40" rx="8" fill="url(#buttonGradient)"/>
  <text x="162" y="433" font-family="Arial, sans-serif" font-size="18" font-weight="400" fill="#ffffff" text-anchor="middle">0</text>
  
  <rect x="240" y="408" width="60" height="40" rx="8" fill="url(#buttonGradient)"/>
  <text x="270" y="433" font-family="Arial, sans-serif" font-size="20" font-weight="300" fill="#ffffff" text-anchor="middle">.</text>
</svg>
`;

// Create icons directory if it doesn't exist
const iconsDir = path.join(__dirname, 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Write the SVG file
fs.writeFileSync(path.join(iconsDir, 'icon.svg'), svgIcon);

console.log('SVG icon created successfully!');
console.log('To generate platform-specific icons, install electron-icon-builder:');
console.log('npm install -g electron-icon-builder');
console.log('Then run: electron-icon-builder --input=./icons/icon.svg --output=./icons --flatten');