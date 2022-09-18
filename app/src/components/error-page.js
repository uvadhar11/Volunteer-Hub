import React from "react";
import { useNavigate } from "react-router-dom";
import { Text, Flex, Button } from "@chakra-ui/react";
import NavBar from "./navbar";

function ErrorPage() {
  let navigate = useNavigate();
  return (
    <>
      <NavBar />
      <Flex
        alignItems="center"
        justify="center"
        width="100%"
        height="15em"
        flexDirection="column"
      >
        <Text fontSize="6xl"> Sorry, we couldn't find that page. </Text>
        <Flex flexDirection="row" align="center" justify="center" gap="5">
          <Button colorScheme="facebook" onClick={() => navigate("/home")}>
            Home
          </Button>
          <Button colorScheme="facebook" onClick={() => navigate("/log-in")}>
            Log In
          </Button>
          <Button colorScheme="facebook" onClick={() => navigate("/sign-up")}>
            Sign Up
          </Button>
        </Flex>
      </Flex>
    </>
  );
}

export default ErrorPage;
