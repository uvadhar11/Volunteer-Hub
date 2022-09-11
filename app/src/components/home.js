import { Box, Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import {
  FaBars,
  FaSun,
  FaMoon,
  FaBell,
  FaQuestionCircle,
} from "react-icons/fa";

function Home() {
  return (
    <Box bg="blackAlpha.800">
      <Flex>
        <IconButton aria-label="Menu" icon={<FaBars />}></IconButton>
        <IconButton aria-label="Menu" icon={<FaSun />}></IconButton>
        <IconButton aria-label="Menu" icon={<FaBell />}></IconButton>
        <IconButton aria-label="Menu" icon={<FaQuestionCircle />}></IconButton>
        <IconButton aria-label="Menu" icon={<FaMoon />}></IconButton>
      </Flex>
    </Box>
  );
}

export default Home;
