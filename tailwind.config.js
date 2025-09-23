/** @type {import('tailwindcss').Config} */
export default {
  // `content` configures the paths for files that Tailwind should scan for utility classes.
  // This is crucial for tree-shaking and minimizing final build size.
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // `theme` is where you can customize Tailwind's default theme, such as colors, fonts, and spacing.
  theme: {
    // `extend` is the recommended way to add to Tailwind's theme without overriding the defaults.
    extend: {
      colors: {
        // Define a custom color palette with semantic names to maintain consistency.
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          // ... your custom color shades
          900: '#075985',
        },
        // Add other custom colors here
      },
      fontFamily: {
        // Add custom fonts to your project.
        sans: ['Inter', 'sans-serif'],
      },
      // You can extend other properties like spacing, borderRadius, etc., here.
    },
  },
  // `plugins` adds extra functionality or custom utilities.
  // Example plugins include form styling, typography, and aspect ratios.
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
  // `darkMode` lets you control how dark mode is enabled.
  // Using 'class' allows you to toggle dark mode by adding the 'dark' class to the root element.
  darkMode: 'class',
}
