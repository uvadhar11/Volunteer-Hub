import { VStack, Text, HStack, Button, Divider } from "@chakra-ui/react";
import React from "react";
import NavBar from "./navbar";

function AccountSettings() {
  return (
    <VStack w="100%" h="100vh">
      <NavBar />
      <Text fontSize="6xl">Account Settings</Text>
      <HStack w="90%" pt="1%" alignItems="start">
        {/* Buttons */}
        <VStack w="13%">
          <Button w="120%">Your Account</Button>
          <Button w="120%">Notifications</Button>
          <Button w="120%">Delete Account</Button>
        </VStack>

        {/* Content */}
        <VStack
          w="90%"
          maxW="90%"
          align="flex-start"
          justify="center"
          pl="5%"
          overflowWrap={"break-word"}
        >
          {/*padding -> padding the content in a div*/}
          <Text>Profile Picture</Text>
          <Text>Username</Text>
          <Text>Email</Text>
          <Text>Reset Password</Text>
          {/* maybe a show password */}
        </VStack>
      </HStack>
    </VStack>
  );
}

export default AccountSettings;
