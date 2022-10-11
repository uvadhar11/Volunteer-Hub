import React, { useRef, useEffect } from "react";
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
// import React, { useEffect } from "react";
import NavBar from "./navbar";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { UserConsumer } from "./context";

// const UserContext = React.createContext();
// const UserProvider = UserContext.Provider;
// const UserConsumer = UserContext.Consumer;

// export { UserProvider, UserConsumer };

// const [user, setUser] = React.useState(null);

// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // user is signed in
//     setUser(user);
//   } else {
//     setUser(null);
//   }
// });

function LogIn() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const loginEmailPassword = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      console.log(userCredential.user);
      console.log("WORKS");
      // navigate to homepage after logging in
      navigate("/home");
      // <UserConsumer>
      //   {(username) => {
      //     return <Text>Hello {username}!</Text>;
      //   }}
      // </UserConsumer>;
    } catch (error) {
      console.log(error);
      // showLogInError(error);
      console.log("Wrong pass.");
    }
  };

  // const app = initializeApp(firebaseConfig);
  let navigate = useNavigate();
  // const auth = getAuth(app);

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
                ref={emailRef}
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
                ref={passwordRef}
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
                onClick={loginEmailPassword}
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
