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
import React, { useEffect } from "react";
import NavBar from "./navbar";
import { useNavigate } from "react-router-dom";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxxj17SlXivIeQczKJrDspmtjy0ZP_49k",
  authDomain: "volunteer-1856e.firebaseapp.com",
  projectId: "volunteer-1856e",
  storageBucket: "volunteer-1856e.appspot.com",
  messagingSenderId: "949286570426",
  appId: "1:949286570426:web:a05b0208f9ab36b7d33583",
  measurementId: "G-N346BNHXPS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

function LogIn() {
  const loginEmailPassword = async (auth, loginEmail, loginPassword) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(userCredential.user);
    } catch (error) {
      console.log(error);
      // showLogInError(error);
      console.log("Wrong pass.");
    }
  };

  // const app = initializeApp(firebaseConfig);
  let navigate = useNavigate();
  // const auth = getAuth(app);

  useEffect(() =>
    document
      .querySelector(".log-in-btn")
      .addEventListener(
        "click",
        loginEmailPassword(
          auth,
          document.querySelector(".log-in-email").ariaValueText,
          document.querySelector(".log-in-pass").ariaValueText
        )
      )
  );

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
                className="log-in-btn"
                type="submit"
                mt="4"
                ml="6"
                size="md"
                colorScheme="facebook"
                w="-webkit-fit-content"
              >
                Log in
              </Button>
              {/* Code below breaks app */}
              {/* {document
                .querySelector(".log-in-btn")
                .addEventListener(
                  "click",
                  loginEmailPassword(
                    auth,
                    document.querySelector(".log-in-email").ariaValueText,
                    document.querySelector(".log-in-pass").ariaValueText
                  )
                )} */}
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
