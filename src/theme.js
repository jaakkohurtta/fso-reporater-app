import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#586069",
    textWhite: "#fff",
    primary: Platform.select({
      android: "#4169e1",
      ios: "#4169e1",
      default: "#0366d6",
    }),
    error: "#d73a4a",
    backgroundPrimary: "#fafafa",
    backgroundSecondary: "#f0f0f0",
    backgroundWhite: "#fff",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    heading: 20,
  },
  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System",
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
};

export default theme;
