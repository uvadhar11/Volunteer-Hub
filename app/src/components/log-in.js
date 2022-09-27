import {
  VStack,
  Text,
  Flex,
  Input,
  Center,
  Button,
  HStack,
  FormControl,
  FormLabel,
  Spacer,
} from "@chakra-ui/react";
import React from "react";
import NavBar from "./navbar";
import { useNavigate } from "react-router-dom";
import app, { loginEmailPassword } from "../firebase";
import { getAuth } from "firebase/auth";

function LogIn() {
  let navigate = useNavigate();
  const auth = getAuth(app);
  // {.firebase-emulator-warning {display: none}}
  return (
    <VStack>
      <NavBar signUp="true" />
      <Center w="100%" h="30em">
        <HStack w="45%" h="22.3em" bg="whiteAlpha.200">
          {/* Sign Up text */}
          <Flex justify="left" align="left" flexDirection="column">
            <Text ml="6" mt="1.5" fontSize="3xl">
              Log In
            </Text>

            {/* Email */}
            <FormControl>
              <FormLabel ml="6" mt="4" fontSize="xl">
                Email
              </FormLabel>
              <Input
                type="email"
                className="log-in-email"
                placeholder="Email"
                size="md"
                w="20em"
                // mt="2"
                ml="6"
              ></Input>

              {/* Password */}
              <FormLabel ml="6" mt="4" fontSize="xl">
                Password
              </FormLabel>
              <Input
                type="password"
                className="log-in-pass"
                placeholder="Password"
                size="md"
                w="20em"
                // mt="2"
                ml="6"
              ></Input>
              <Button
                size="xs"
                w="-webkit-fit-content"
                variant="link"
                ml="6"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </Button>
              <Spacer />
              {/* Log in button */}
              <Button
                type="submit"
                mt="4"
                ml="6"
                size="md"
                colorScheme="facebook"
                w="-webkit-fit-content"
                onClick={loginEmailPassword(
                  auth,
                  document.querySelector(".log-in-email"),
                  document.querySelector(".log-in-pass")
                )}
              >
                Log in
              </Button>
            </FormControl>
          </Flex>

          {/* sign in with google */}
          <Flex>
            <Text fontSize="2xl" mr="5" mt="0.5">
              OR
            </Text>
            <Button size="md" ml="5" w="-webkit-fit-content" mr="12" mt="0.5">
              Log in with google
            </Button>
          </Flex>
        </HStack>
      </Center>
    </VStack>
  );
}

export default LogIn;
