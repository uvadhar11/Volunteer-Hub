import { VStack, Text } from "@chakra-ui/react";
import React from "react";
import NavBar from "./navbar";

function Help() {
  return (
    <VStack>
      <NavBar />
      <Text fontSize="6xl">Help</Text>
    </VStack>
  );
}

export default Help;
