import { Button, Input, Text, VStack } from "@chakra-ui/react";
import { sendPasswordResetEmail } from "firebase/auth";
import React from "react";
import { auth } from "../firebase";
import NavBar from "./navbar";

function ForgotPassword() {
  const emailRef = React.useRef(null);

  function passwordResetEmail() {
    if (emailRef.current.value) {
      sendPasswordResetEmail(auth, emailRef.current.value)
        .then(() => {
          // reset email sent
          alert(
            "Password Reset Email Successfully Sent! Please check your email - Be sure to check your spam/junk folders too."
          );
        })
        .catch((error) => {
          alert("Password Reset Email Could Not Be Sent");
          console.log(error.code, error.message);
        });
    } else {
      alert("Please type the email you signed up with in the input box.");
    }
  }

  return (
    <VStack w="100%" h="100vh">
      <NavBar logIn="true" signUp="true" />
      <Text fontSize="6xl">Forgot Password</Text>
      <Text fontSize="2xl">
        You will be sent a password reset email in the email you used to sign
        up. Type the email you signed up with below.
      </Text>
      <Input type="email" ref={emailRef} w="30%"></Input>
      <Button onClick={passwordResetEmail}>Send Password Reset Email</Button>
    </VStack>
  );
}

export default ForgotPassword;
