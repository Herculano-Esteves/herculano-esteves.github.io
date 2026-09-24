#!/usr/bin/env python3
"""
convert_to_webp.py — Image Optimization Utility

Converts JPG, JPEG, and PNG images to modern WebP format using Pillow.
Reduces file sizes significantly while maintaining visual fidelity.

Usage:
    python convert_to_webp.py [directory_or_file] [--quality 82] [--remove-source]

Examples:
    python convert_to_webp.py assets/projects/exam_preparation
    python convert_to_webp.py assets/projects/exam_preparation --remove-source
"""

import os
import sys
import argparse
from PIL import Image

SUPPORTED_EXTENSIONS = ('.jpg', '.jpeg', '.png')

def convert_image(input_path: str, quality: int = 82, remove_source: bool = False) -> tuple[int, int] | None:
    """Converts a single image to WebP format."""
    ext = os.path.splitext(input_path)[1].lower()
    if ext not in SUPPORTED_EXTENSIONS or ext == '.webp':
        return None

    dir_name = os.path.dirname(input_path)
    base_name = os.path.splitext(os.path.basename(input_path))[0]
    
    # Clean naming: lowercase and snake_case if CamelCase
    output_filename = f"{base_name}.webp"
    output_path = os.path.join(dir_name, output_filename)

    orig_size = os.path.getsize(input_path)

    try:
        with Image.open(input_path) as img:
            # Handle RGBA/transparency for PNGs, convert to RGB if needed
            if img.mode in ('RGBA', 'LA') and ext != '.png':
                background = Image.new('RGB', img.size, (255, 255, 255))
                background.paste(img, mask=img.split()[-1])
                img = background
            elif img.mode == 'P':
                img = img.convert('RGBA')

            img.save(output_path, 'WEBP', quality=quality, method=6)

        new_size = os.path.getsize(output_path)
        saved_pct = (1.0 - (new_size / orig_size)) * 100.0 if orig_size > 0 else 0.0

        print(f"[OK] Converted: {os.path.basename(input_path)} -> {output_filename}")
        print(f"     Size: {orig_size / 1024:.1f} KB -> {new_size / 1024:.1f} KB ({saved_pct:.1f}% saved)")

        if remove_source and os.path.abspath(input_path) != os.path.abspath(output_path):
            os.remove(input_path)
            print(f"     Removed source: {os.path.basename(input_path)}")

        return orig_size, new_size

    except Exception as e:
        print(f"[ERROR] Failed to convert {input_path}: {e}", file=sys.stderr)
        return None

def process_path(target_path: str, quality: int, remove_source: bool):
    """Processes a file or recursively scans a directory for images."""
    if not os.path.exists(target_path):
        print(f"Error: Path '{target_path}' not found.", file=sys.stderr)
        sys.exit(1)

    total_orig = 0
    total_new = 0
    count = 0

    if os.path.isfile(target_path):
        res = convert_image(target_path, quality, remove_source)
        if res:
            total_orig += res[0]
            total_new += res[1]
            count += 1
    else:
        for root, _, files in os.walk(target_path):
            for file in sorted(files):
                if file.lower().endswith(SUPPORTED_EXTENSIONS) and not file.lower().endswith('.webp'):
                    full_path = os.path.join(root, file)
                    res = convert_image(full_path, quality, remove_source)
                    if res:
                        total_orig += res[0]
                        total_new += res[1]
                        count += 1

    if count > 0:
        total_saved_pct = (1.0 - (total_new / total_orig)) * 100.0 if total_orig > 0 else 0.0
        print("-" * 50)
        print(f"Converted {count} images.")
        print(f"Total size: {total_orig / 1024:.1f} KB -> {total_new / 1024:.1f} KB ({total_saved_pct:.1f}% saved)")
    else:
        print(f"No JPG/PNG images found to convert in '{target_path}'.")

def main():
    parser = argparse.ArgumentParser(description="Convert JPG/PNG images to modern WebP format.")
    parser.add_argument(
        'path', 
        nargs='?', 
        default='assets/projects/exam_preparation', 
        help="Path to image file or directory (default: assets/projects/exam_preparation)"
    )
    parser.add_argument('--quality', type=int, default=82, help="WebP compression quality 1-100 (default: 82)")
    parser.add_argument('--remove-source', action='store_true', help="Delete original JPG/PNG files after conversion")

    args = parser.parse_args()
    process_path(args.path, args.quality, args.remove_source)

if __name__ == '__main__':
    main()
