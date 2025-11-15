/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./script.js"],

  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: {
        lg: "720px",
        xl: "720px",
      },
    },

    extend: {
      colors: {
        primary: "#2563EB", // Biru modern
        secondary: "#64748B", // Gray lembut
        danger: "#EF4444", // Merah alert
        muted: "#6B7280", // gray teks kecil
        card: "#FFFFFF",
        background: "#F3F4F6",
      },

      borderRadius: {
        soft: "14px",
        xl2: "20px",
      },

      boxShadow: {
        smooth: "0 8px 22px rgba(0,0,0,0.06)",
        soft: "0 4px 14px rgba(0,0,0,0.04)",
      },

      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },

  plugins: [],
};
