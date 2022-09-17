import React from "react";
import { Button, Link, VStack, Text, HStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

function HomeSidebar() {
  return (
    <HStack>
      <VStack width="10em" height="100%" bg="red.100">
        <Text fontSize="1xl">Channels</Text>
        <Link to="dashboard">
          <Button colorScheme={"facebook"} size="sm">
            Dashboard
          </Button>{" "}
        </Link>
        <Link to="search">
          <Button colorScheme={"facebook"} size="sm">
            Search
          </Button>
        </Link>
        <Link to="your-stats">
          <Button colorScheme={"facebook"} size="sm">
            Your Stats
          </Button>
        </Link>
        <Link to="your-awards">
          <Button colorScheme={"facebook"} size="sm">
            Your Awards
          </Button>
        </Link>
      </VStack>
      <Outlet />
    </HStack>
  );
}

export default HomeSidebar;
