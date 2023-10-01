module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./App.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      PretendardBlack: ["Pretendard-Black"],
      PretendardBold: ["Pretendard-Bold"],
      PretendardExtraBold: ["Pretendard-ExtraBold"],
      PretendardExtraLight: ["Pretendard-ExtraLight"],
      PretendardLight: ["Pretendard-Light"],
      PretendardMedium: ["Pretendard-Medium"],
      PretendardRegular: ["Pretendard-Regular"],
      PretendardSemiBold: ["Pretendard-SemiBold"],
      PretendardThin: ["Pretendard-Thin"],
    },
    extend: {
      colors: {
        black: "#000000",
        black5: "rgba(0, 0, 0, 0.05)",
        black30: "rgba(0, 0, 0, 0.3)",
        black50: "#00000080",
        black70: "#000000b2",
        buy: "#ffb800",
        darkgray: "#13131a",
        darkgray50: "#13131a80",
        deepgreen: "#34b859",
        green: "#9bca69",
        lightsky: "#79b4ff",
        lightsky60: "#79b4ff99",
        bluesky: "#3190FF",
        red: "#f33434",
        sky: "#3786c0",
        sub01: "#4a4a4a",
        sub02: "#6c6c6c",
        sub03: "#d9d9d9",
        white: "#ffffff",
        white10: "#ffffff1a",
        white20: "rgba(255, 255, 255, 0.2)",
        white50: "rgba(255, 255, 255, 0.5)",
        white70: "#ffffffb2",
        white90: "#ffffffe5",
        mainColor: "#21e5a9",
      },
      fontSize: {
        "2xs": 14,
        xs: 16,
        sm: 18,
        md: 20,
        lg: 22,
        "2lg": 24,
        "3lg": 26,
        "4lg": 28,
        xl: 30,
        "2xl": 32,
        xxl: 64,
      },
    },
  },
  plugins: [],
};
