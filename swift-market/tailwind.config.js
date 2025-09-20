
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      colors: {
        "swift-blue": "#4A6FFF",
        "swift-teal": "#00C49F",
        "swift-charcoal": "#1F2937",
        "swift-muted": "#D1D5DB",
      },
      boxShadow: {
        card: "0 10px 30px -12px rgba(74, 111, 255, 0.25)",
      },
    },
  },
  plugins: [],
}
