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
import { auth, db } from "../firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { UserConsumer } from "./context";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  queryEqual,
  updateDoc,
  where,
} from "firebase/firestore";

async function getQuerySnapshot() {
  // get current user
  const user = auth.currentUser;

  // getting from child - better time wise, doing a check.
  const usersRef = collection(db, "users"); // get collection (users is a collection) and db is firestore
  const q = query(usersRef, where("userID", "==", user.uid)); // property, equals, value -> makes query
  // console.log(q);

  const qs = await getDocs(q); // gets documents matching query (parameters) and await = wait till get it
  // console.log(qs);
  qs.forEach((doc) => {
    console.log(doc.id + ": " + doc.data().firstName);
  });

  const usersRef1 = doc(db, "users", qs.docs[0].id); // database, collection, document id -> reference and qs.docs[0].id gets id of document since qs.docs is an array. And one object in it since only one matches the query/parameters.
  console.log(qs.docs[0].data().firstName); // this data printing works
  // updates document
  // await updateDoc(usersRef1, {
  //   firstName: "John Doe1", // field to update: new value
  // });

  // if username doesn't already exist, make one
  user.displayName = qs.docs[0].data().username;
  console.log(user.displayName);
}

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

      getQuerySnapshot(); // function that does the test load data.

      // getting a single document
      const docRef = doc(db, "users", userCredential.user.uid);
      const docSnap = await getDoc(docRef);
      console.log(docSnap);

      navigate("/home/dashboard");
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
