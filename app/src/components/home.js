import { Box, Flex, IconButton, VStack } from "@chakra-ui/react";
import React from "react";
import {
  FaBars,
  FaSun,
  FaMoon,
  FaBell,
  FaQuestionCircle,
  FaGrinAlt,
} from "react-icons/fa";
import Logo from "./logo";

function Home() {
  return (
    <VStack>
      <Flex w="100%" h="3em" bg="blackAlpha.600" pl="2" align="center">
        <IconButton
          aria-label="Menu Button"
          colorScheme="facebook"
          icon={<FaBars />}
        ></IconButton>
        <Logo />
        <IconButton
          aria-label="Help Button"
          colorScheme="facebook"
          ml="1000"
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
          icon={<FaMoon />}
        ></IconButton>

        <IconButton
          aria-label="Profile"
          colorScheme="facebook"
          ml="2"
          icon={<FaGrinAlt />}
        ></IconButton>
      </Flex>
    </VStack>
  );
}

export default Home;
