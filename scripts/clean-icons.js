#!/usr/bin/env node

/**
 * Clean Generated Icons Script
 * 
 * Removes all generated icon components from src/components/icons/
 * 
 * Usage: npm run icons:clean
 */

const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'components', 'icons');

console.log('🧹 Cleaning generated icons...\n');

if (!fs.existsSync(OUTPUT_DIR)) {
  console.log('✅ Nothing to clean - directory does not exist\n');
  process.exit(0);
}

try {
  // Remove all .tsx files
  const files = fs.readdirSync(OUTPUT_DIR);
  let removedCount = 0;
  
  files.forEach(file => {
    const filePath = path.join(OUTPUT_DIR, file);
    if (fs.statSync(filePath).isFile()) {
      fs.unlinkSync(filePath);
      removedCount++;
      console.log(`   ❌ Removed: ${file}`);
    }
  });
  
  console.log(`\n✅ Cleaned ${removedCount} file(s) from ${OUTPUT_DIR}\n`);
} catch (error) {
  console.error('❌ Error cleaning icons:', error.message);
  process.exit(1);
}
