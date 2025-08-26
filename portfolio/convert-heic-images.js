#!/usr/bin/env node

/**
 * HEIC to Web-Compatible Format Converter
 * 
 * This script helps convert HEIC images to JPEG or PNG format for better web compatibility.
 * 
 * Prerequisites:
 * 1. Install Node.js
 * 2. Install sharp: npm install sharp
 * 3. Install heic-convert: npm install heic-convert
 * 
 * Usage:
 * node convert-heic-images.js
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuration
const inputDir = './images';
const outputDir = './images/converted';
const outputFormat = 'jpeg'; // or 'png'
const quality = 90; // JPEG quality (1-100)

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Get all HEIC files
function getHeicFiles(dir) {
    const files = fs.readdirSync(dir);
    return files.filter(file => 
        file.toLowerCase().endsWith('.heic') || 
        file.toLowerCase().endsWith('.HEIC')
    );
}

// Convert HEIC to web format
async function convertHeicToWeb(inputPath, outputPath) {
    try {
        console.log(`Converting ${path.basename(inputPath)}...`);
        
        await sharp(inputPath)
            .jpeg({ quality: quality })
            .toFile(outputPath);
            
        console.log(`✓ Converted: ${path.basename(outputPath)}`);
    } catch (error) {
        console.error(`✗ Error converting ${path.basename(inputPath)}:`, error.message);
    }
}

// Main conversion process
async function main() {
    console.log('🔄 Starting HEIC to Web format conversion...\n');
    
    const heicFiles = getHeicFiles(inputDir);
    
    if (heicFiles.length === 0) {
        console.log('No HEIC files found in the images directory.');
        return;
    }
    
    console.log(`Found ${heicFiles.length} HEIC files to convert:\n`);
    
    for (const file of heicFiles) {
        const inputPath = path.join(inputDir, file);
        const outputFileName = path.basename(file, path.extname(file)) + '.' + outputFormat;
        const outputPath = path.join(outputDir, outputFileName);
        
        await convertHeicToWeb(inputPath, outputPath);
    }
    
    console.log('\n🎉 Conversion complete!');
    console.log(`Converted files are saved in: ${outputDir}`);
    console.log('\nNext steps:');
    console.log('1. Update the HTML to use the converted images');
    console.log('2. Remove the HEIC files if no longer needed');
    console.log('3. Update the image paths in the photoshoot gallery');
}

// Run the conversion
main().catch(console.error);
