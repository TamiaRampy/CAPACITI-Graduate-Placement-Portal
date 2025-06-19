# CAPACITI Graduate Placement Portal

## Recent Updates

### Welcome Page Redesign

- Completely redesigned the welcome page to provide a gorgeous and extraordinary user experience.
- Removed Tailwind CSS from the project and replaced it with custom plain CSS for styling.
- Added a modern, elegant design with:
  - Gradient background with smooth color transitions.
  - Translucent, frosted-glass style cards with rounded corners and shadows.
  - Smooth hover animations on informational cards.
  - Refined typography using the 'Inter' font for better readability and aesthetics.
  - A prominent "Get Started" button with hover effects.
- Integrated the official CAPACITI logo on the welcome page.
- Ensured responsive and clean layout for various screen sizes.
- Updated CSS is located in `src/pages/Welcome.css`.
- The welcome page component is in `src/pages/Welcome.jsx`.

### Tailwind CSS Removal

- Removed Tailwind CSS directives from `src/index.css`.
- Removed Tailwind CSS configuration file (`tailwind.config.js`).
- Updated PostCSS configuration (`postcss.config.cjs`) to remove Tailwind CSS plugin.
- This simplifies the project styling to use only plain CSS.

## How to Run

- Start the development server with:

  ```
  npm run dev
  ```

- Open the application in your browser at the specified local URL (e.g., http://localhost:5173/).

## Next Steps

- Verify the welcome page appearance and functionality.
- Add any additional features or pages as needed.
- Perform testing as per project requirements.

---

For any questions or further assistance, please contact the development team.
