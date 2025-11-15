module.exports = {
  content: ["./index.html", "./edit.html", "./assests/script/Script.js"],
  darkMode: "class",
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
        primary: "#2563EB",
        primaryDark: "#1D4ED8",
        secondary: "#64748B",
        danger: "#EF4444",
        muted: "#6B7280",
        card: "#FFFFFF",
        background: "#F3F4F6",
        dark: {
          background: "#111827",
          card: "#1F2937",
          text: "#F9FAFB",
          border: "#374151",
        },
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
