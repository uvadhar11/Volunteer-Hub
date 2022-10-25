import { VStack, Text, HStack, Button, Divider } from "@chakra-ui/react";
import React from "react";
import NavBar from "./navbar";

function AccountSettings() {
  return (
    <VStack>
      <NavBar />
      <Text fontSize="6xl">Account Settings</Text>
      <HStack width="100%">
        {/* Buttons */}
        <HStack
          flexDirection="column"
          align="left"
          w="15vh"
          justify="center"
          bg="blue"
        >
          <Button w="8vh">Hello</Button>
          <Button w="8vh">Hello1</Button>
          {/* <Button>Hello again</Button> */}
        </HStack>
        {/*  */}
        <HStack></HStack>
      </HStack>
    </VStack>
  );
}

export default AccountSettings;
