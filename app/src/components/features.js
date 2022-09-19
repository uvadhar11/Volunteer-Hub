import { VStack, Text, Flex, Spacer, Button } from "@chakra-ui/react";
import React from "react";
import NavBar from "./navbar";
import { useNavigate } from "react-router-dom";

function Features() {
  let navigate = useNavigate();

  return (
    <VStack>
      <NavBar signUp="true" logIn="true" />
      <Text fontSize="6xl">Volunteer Hub</Text>
      <Text fontSize="3xl">Changing the world, 1 volunteer at a time.</Text>
      <Spacer />

      {/* Find Volunteer Opportunities */}
      <Flex flexDirection="row">
        <Text fontSize="5xl">Find Volunteer Opportunities</Text>
      </Flex>

      {/* Earn Community Service Hours */}
      <Flex flexDirection="row">
        <Text fontSize="5xl">Earn Community Service Hours</Text>
      </Flex>

      {/* Communicate with your volunteer opportunities */}
      <Flex flexDirection="row">
        <Text fontSize="5xl">
          Communicate With Your Volunteer Opportunities
        </Text>
      </Flex>

      {/* Interested? Sign up today! */}
      <Flex flexDirection="column">
        <Text fontSize="5xl">Interested? Sign Up Today!</Text>
      </Flex>

      <Button
        onClick={() => navigate("/sign-up")}
        size="lg"
        colorScheme="facebook"
      >
        Sign Up
      </Button>
    </VStack>
  );
}

export default Features;
