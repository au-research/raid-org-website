#!/bin/bash

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "ImageMagick is not installed. Please install it first."
    exit 1
fi

# Create output directory
mkdir -p resized_images

# Resize all images in current directory
for img in *.{jpg,jpeg,png,bmp}; do
    # Skip if no files found
    [ -e "$img" ] || continue
    
    echo "Resizing $img..."
    magick "$img" -resize 144x144! "resized_images/$img"
done

echo "Done! Resized images are in the 'resized_images' directory."