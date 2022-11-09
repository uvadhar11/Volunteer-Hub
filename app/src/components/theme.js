import React from "react";
import { chakra, extendTheme, useColorModeValue } from "@chakra-ui/react";

let customTheme;

function Theme() {
  // extend the theme
  customTheme = extendTheme({
    // initialColorMode: "light",
    // useSystemColorMode: false,
    // semanticTokens: {
    //   error: "red.500",
    //   colors: {
    //     // default: "red.100",
    //     // _dark: "black.100",
    //     text: {
    //       _light: "green.100",
    //       _dark: "pink.100",
    //     },
    //   },
    // },
    brand: {
      default: "red.100",
      _dark: "whiteAlpha.100",
    },
  });

  // themeObject = {
  //   background: useColorModeValue("redAlpha.100", "blackAlpha.100"),
  // };
  return <></>;
}

// export { theme, themeObject };
export { Theme, customTheme };
