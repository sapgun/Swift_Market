
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#2563EB',
        'primary-hover': '#1D4ED8',
        'secondary': '#F1F5F9',
        'background': '#FFFFFF',
        'text-primary': '#1E293B',
        'text-secondary': '#64748B',
        'accent': '#34D399',
      },
      boxShadow: {
        'card': '0px 4px 6px rgba(0, 0, 0, 0.05), 0px 1px 3px rgba(0, 0, 0, 0.1)',
        'card-hover': '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
