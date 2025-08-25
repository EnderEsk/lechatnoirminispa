# Images Folder for Awards & Achievements

This folder contains all the award and achievement images referenced in the `awards-data.json` file.

## How to Use

1. **Add your award images** to this folder
2. **Reference them in the JSON file** by filename
3. **Supported formats**: JPG, PNG, GIF, WebP
4. **Recommended size**: 400x300 pixels or larger
5. **File naming**: Use descriptive names (e.g., `excellence-spa-management.jpg`)

## Current Images Referenced

Based on the `awards-data.json` file, the following images are expected:

- `excellence-spa-management.jpg` - Excellence in Spa Management award
- `customer-service-excellence.jpg` - Customer Service Excellence award
- `leadership-achievement.jpg` - Leadership Achievement award
- `innovation-award.jpg` - Innovation Award
- `professional-certification.jpg` - Professional Certification
- `community-recognition.jpg` - Community Recognition award

## Image Guidelines

- **Quality**: Use high-quality images (at least 72 DPI for web)
- **Aspect Ratio**: 4:3 or 16:9 works best with the current layout
- **File Size**: Keep images under 2MB for optimal loading
- **Format**: JPG for photos, PNG for graphics with transparency

## Adding New Images

1. Save your image file in this folder
2. Update the `awards-data.json` file to reference the new image
3. The website will automatically display the new image

## Troubleshooting

- **Image not showing**: Check that the filename in JSON matches exactly
- **Wrong image**: Verify the image filename in the JSON data
- **Missing image**: The system will show a placeholder if an image is missing

## Example JSON Entry

```json
{
  "id": 7,
  "title": "New Award",
  "description": "Description of the award",
  "date": "January 2024",
  "organization": "Awarding Organization",
  "image": "new-award.jpg",
  "category": "New Category",
  "badge": "🎉"
}
```

The `image` field should contain just the filename (e.g., `new-award.jpg`), not the full path.
