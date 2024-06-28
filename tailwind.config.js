/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "channel-background":
          "url('assets/1626160677_4-kartinkin-com-p-fon-dlya-chata-telegramm-krasivo-4.jpg')",
        "saidbar-background": "url('assets/bg-saidbar.jpg')",
      },
    },
  },
  plugins: [],
};
