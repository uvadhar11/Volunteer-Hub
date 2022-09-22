import React from "react";
import { VStack, Text } from "@chakra-ui/react";
import NavBar from "./navbar";

function Notifications() {
  return (
    <VStack>
      <NavBar />
      <Text fontSize="6xl">Notifications</Text>
    </VStack>
  );
}

export default Notifications;
