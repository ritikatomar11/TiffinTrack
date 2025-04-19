/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4CAF50",       // Fresh Green
        accent: "#FFC107",        // Warm Yellow
        earthy: "#8D6E63",        // Earthy Brown
        cream: "#FFF8E1",         // Soft Cream background
        textDark: "#333333",      // Charcoal
        textMuted: "#777777",     // Muted Gray
        success: "#81C784",       // Herbal Green (alerts/status)
      },
      fontFamily: {
        body: ["Inter", "sans-serif"], // Customize as needed
        heading: ["Poppins", "sans-serif"]
      }
    },
  },
  plugins: [],
}