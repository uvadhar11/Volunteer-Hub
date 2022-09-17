import React from "react";
import { Flex, IconButton, useColorMode, Spacer } from "@chakra-ui/react";
import {
  FaBars,
  FaSun,
  FaMoon,
  FaBell,
  FaQuestionCircle,
  FaGrinAlt,
} from "react-icons/fa";
import Logo from "./logo";

function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark"; // the value is this boolean expression so the value technically doesn't change but the evaluation true/false doesn't change.

  return (
    <Flex w="100%" h="3em" bg="blackAlpha.600" pl="2" align="center">
      <IconButton
        aria-label="Menu Button"
        colorScheme="facebook"
        icon={<FaBars />}
      ></IconButton>
      <Logo />
      <Spacer />
      <IconButton
        aria-label="Help Button"
        colorScheme="facebook"
        icon={<FaQuestionCircle />}
      ></IconButton>
      <IconButton
        aria-label="Notification Bell"
        colorScheme="facebook"
        ml="2"
        icon={<FaBell />}
      ></IconButton>
      <IconButton
        aria-label="Theme Change"
        colorScheme="facebook"
        ml="2"
        icon={isDark ? <FaSun /> : <FaMoon />}
        onClick={toggleColorMode}
      ></IconButton>
      <IconButton
        aria-label="Profile"
        colorScheme="facebook"
        ml="2"
        mr="2"
        icon={<FaGrinAlt />}
      ></IconButton>
    </Flex>
  );
}

export default NavBar;
