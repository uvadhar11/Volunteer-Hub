import React from "react";
import { Flex, Heading, Img } from "@chakra-ui/react";

function Logo() {
  return (
    <Flex align="center">
      <Img src="/logo.png" boxSize="55px" alt="logo" pl="0.5" />
      <Heading pl="1.5" fontSize="3xl" fontWeight="bold">
        Volunteer Hub
      </Heading>
    </Flex>
  );
}

export default Logo;
