import {
  VStack,
  Text,
  Flex,
  Input,
  Center,
  Button,
  HStack,
} from "@chakra-ui/react";
import React from "react";
import NavBar from "./navbar";
import { useNavigate } from "react-router-dom";

function LogIn() {
  let navigate = useNavigate();

  return (
    <VStack>
      <NavBar />
      <Center w="100%" h="30em">
        <HStack w="45%" h="21em" bg="whiteAlpha.200">
          {/* Log in text */}
          <Flex justify="left" align="left" flexDirection="column">
            <Text ml="3" mt="1.5" fontSize="3xl">
              Log-In
            </Text>

            {/* Email */}
            <Text ml="3" mt="4" fontSize="xl">
              Email
            </Text>
            <Input placeholder="Email" size="md" w="20em" mt="2" ml="3"></Input>

            {/* Password */}
            <Text ml="3" mt="4" fontSize="xl">
              Password
            </Text>
            <Input
              placeholder="Password"
              size="md"
              w="20em"
              mt="2"
              ml="3"
            ></Input>
            <Button
              size="xs"
              w="-webkit-fit-content"
              variant="link"
              mt="1"
              ml="3"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </Button>

            {/* Log in button */}
            <Button
              mt="4"
              ml="3"
              size="md"
              colorScheme="facebook"
              w="-webkit-fit-content"
            >
              Log in
            </Button>
          </Flex>

          {/* sign in with google */}
          <Flex>
            <Text fontSize="2xl" ml="10">
              OR
            </Text>
            <Button size="md" ml="10" w="-webkit-fit-content">
              Sign in with google
            </Button>
          </Flex>
        </HStack>
      </Center>
    </VStack>
  );
}

export default LogIn;
