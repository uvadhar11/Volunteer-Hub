import {
  Button,
  Flex,
  HStack,
  Input,
  VStack,
  Text,
  Center,
  FormControl,
  FormLabel,
  Spacer,
  FormHelperText,
  FormErrorMessage,
  InputRightElement,
  InputGroup,
  InputLeftElement,
  Select,
} from "@chakra-ui/react";
import React from "react";
import NavBar from "./navbar";
import { useNavigate } from "react-router-dom";
import Fields from "./fields";

function SignUp() {
  let navigate = useNavigate();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [showConfirm, setShowConfirm] = React.useState(false);
  const handleClickConfirm = () => setShowConfirm(!showConfirm);

  return (
    <VStack>
      <NavBar logIn="true" />
      <Center w="100%" h="80em">
        <HStack w="45%" h="70em" bg="whiteAlpha.200">
          {/* Sign Up text */}
          <Flex justify="left" align="left" flexDirection="column">
            <Text ml="6" mt="1.5" fontSize="3xl">
              Sign Up
            </Text>

            {/* First Name */}
            <FormControl isRequired>
              <Fields name="First Name" req="true" />
              <FormErrorMessage>First Name is required/</FormErrorMessage>

              {/* Last Name */}
              <Fields name="Last Name" />
              <FormHelperText ml="6">
                Your first and last name will be your username and the name on
                awards.
              </FormHelperText>
              <FormErrorMessage>Last Name is required.</FormErrorMessage>

              {/* Email */}
              <Fields name="Email" type="email" />
              <FormHelperText ml="6">
                This will be used to send email notifications, volunteer
                opportunity communications, used for log in, and for account
                changes/recovery.
              </FormHelperText>
              <FormErrorMessage>Email is required.</FormErrorMessage>

              {/* Grade Level */}
              <FormLabel ml="6" mt="4" fontSize="xl">
                Grade Level
              </FormLabel>
              <Select
                placeholder="Select Your Grade Level"
                size="md"
                w="20em"
                ml="6"
                type="dr"
              >
                <option>Before Elementary School</option>
                <option>Elementary School</option>
                <option>Middle School</option>
                <option>High School</option>
                <option>College/University/Graduate School</option>
                <option>Not in school/other options don't apply</option>
              </Select>
              <FormHelperText ml="6">
                This will be used for volunteer opportunity eligibility.
              </FormHelperText>

              {/* Date of Birth */}
              <Fields name="Date of Birth" type="date" />
              <FormHelperText ml="6">
                Please be accurate; this will be used for determining volunteer
                opportunity eligibility.
              </FormHelperText>
              <FormErrorMessage>Date of birth is required.</FormErrorMessage>

              {/* Password */}
              <FormLabel ml="6" mt="4" fontSize="xl">
                Password
              </FormLabel>
              <InputGroup>
                <Input
                  placeholder="Password"
                  size="md"
                  w="20em"
                  ml="6"
                  type={show ? "text" : "password"}
                ></Input>
                <InputRightElement w="4.5rem">
                  <Button
                    h="1.75rem"
                    size="md"
                    pl="1.65em"
                    pr="1.65em"
                    onClick={handleClick}
                    ml="100"
                  >
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>Password is required.</FormErrorMessage>

              {/* Confirm Password */}
              <FormLabel ml="6" mt="4" fontSize="xl">
                Confirm Password
              </FormLabel>
              <InputGroup>
                <Input
                  placeholder="Password"
                  size="md"
                  w="20em"
                  ml="6"
                  type={showConfirm ? "text" : "password"}
                ></Input>
                <InputRightElement w="4.5rem">
                  <Button
                    h="1.75rem"
                    size="md"
                    pl="1.65em"
                    pr="1.65em"
                    onClick={handleClickConfirm}
                    ml="100"
                  >
                    {showConfirm ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>Confirm Password is required.</FormErrorMessage>

              <Spacer />
              {/* Sign Up Button */}
              <Button
                type="submit"
                mt="4"
                ml="6"
                size="md"
                colorScheme="facebook"
                w="-webkit-fit-content"
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
              Sign up with google
            </Button>
          </Flex>
        </HStack>
      </Center>
    </VStack>
  );
}

export default SignUp;
