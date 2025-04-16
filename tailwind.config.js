/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // ✅ JSX/TSX 지원
  ],
  theme: {
    extend: {
      colors: {
        regular : {
          black : "#131313", // 전체 배경색
          white : '#FFFFFF', // 전체 글자색
          blackModal : '#212121', //모달 배경색
          greyText : '#D8D8D8', // 특정 글자색
          greyBorder : "#2E2E2E", // 전체 Border색
        },
        primary : {
          orange : "#EB5230",
          blackOpacity : "#00000080" 
        }
      },
    },
  },
  plugins: [],
}
