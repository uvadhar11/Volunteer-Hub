import { VStack, Text } from "@chakra-ui/react";
import React from "react";
import NavBar from "./navbar";

function AccountSettings() {
  return (
    <VStack>
      <NavBar />
      <Text fontSize="6xl">Account Settings</Text>
    </VStack>
  );
}

export default AccountSettings;
