import { VStack, Text, Flex, Input, Center, Button } from "@chakra-ui/react";
import React from "react";
import NavBar from "./navbar";
import { useNavigate } from "react-router-dom";

function LogIn() {
  let navigate = useNavigate();

  return (
    // <div>
    //   <nav className="top-bar">
    //     <div>
    //       <img src="app\src\logo.png" alt="logo" className="logo" />
    //       <h3 className="volunteer-hub-logo-text">Volunteer Hub</h3>
    //     </div>
    //     <div className="LI-sign-up-btn">
    //       <a href="/sign-up" className="sign-up-btn">
    //         Sign Up
    //       </a>
    //     </div>
    //   </nav>

    //   {/* <!-- Log in to an existing account -->
    //         <!-- Log in label (center the div, white background, background image maybe like a space one)-->
    //         <!-- email or username (firstName + LastName)-->
    //         <!-- password input field --> */}

    //   <form className="log-in-form">
    //     <h1>Log In</h1>

    //     <label>Email</label>
    //     <input required />

    //     <label>Password</label>
    //     <input type="password" required />

    //     <input
    //       type="button"
    //       value="Log In"
    //       className="log-in-form-submit-btn"
    //     />
    //   </form>

    //   <button className="log-in-forgot-password-btn">Forgot Password?</button>

    //   <footer className="footer">
    //     {/* <!-- Maybe put some stuff in here --> */}
    //     <h1>Footer</h1>
    //   </footer>
    // </div>
    <VStack>
      <NavBar />
      <Center w="100%" h="30em">
        {/* Log in text */}
        <Flex
          w="50%"
          h="21em"
          marginTop={"20"}
          bg="whiteAlpha.200"
          justify="left"
          align="left"
          flexDirection="column"
        >
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
      </Center>
    </VStack>
  );
}

export default LogIn;
