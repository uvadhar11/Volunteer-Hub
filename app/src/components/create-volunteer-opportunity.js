import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { FaPlus, FaPlusCircle } from "react-icons/fa";
import NavBar from "./navbar";

function CreateVolunteerOpportunity() {
  return (
    <VStack w="100%" h="100vh">
      <NavBar logIn="true" signUp="true" />
      <Text fontSize="6xl">Create a Volunteer Opportunity</Text>

      {/* create a volunteer opportunity:
        things we want:
        - name
        - short description (250 characters or so)
        - creator/org name
        - Location/Global
        - Timeframe
        - Hours per week
        - Maybe whether it gives community hours/not
      */}

      <FormControl>
        {/* Volunteer Opportunity Name */}
        <FormHelperText>Volunteer Opportunity Name</FormHelperText>
        <Input placeholder="Name"></Input>
        {/* Description */}
        <FormHelperText>Description of Opportunity</FormHelperText>
        <Input placeholder="Description"></Input>
        {/* Organization Name */}
        <FormHelperText>
          Organization Name - the name people see for who is hosting the
          volunteer opportunity. Can be your username, a made up name, etc.
        </FormHelperText>
        <Input placeholder="Organization Name"></Input>
        {/* Organizer Contact Information - who to contact with questions */}
        <FormHelperText>
          Organizers Contact Information - usernames for on platform contact for
          questions before signing up, off platform contact. Include contact and
          platform in the inputs.
        </FormHelperText>

        {/* plus button that will add more input fields. */}
        <InputGroup>
          <Input placeholder="Contact Information"></Input>{" "}
          <InputRightElement>
            <IconButton icon={<FaPlusCircle />}></IconButton>
          </InputRightElement>
        </InputGroup>
        {/* onClick={AddContactInfoInput} */}
        {/*  */}
        {/*  */}
        {/* Location/Global */}
        <FormHelperText>
          Opportunity Location - if people anywhere can do it - type Global or
          if a certain area or building, type the address.
        </FormHelperText>
        {/* no on/off setting. */}
        <Input placeholder="Location/Global"></Input>
        {/* Timeframe */}
        <FormHelperText>
          Timeframe - the dates/time the opportunity will last for
        </FormHelperText>
        {/* ^ start, end date input. Also a time input if that applies.*/}
        <FormHelperText>Start Date/Time</FormHelperText>
        <Input type="datetime-local"></Input>
        <FormHelperText>End Date/Time</FormHelperText>
        <Input type="datetime-local"></Input>
        {/* Hours Per Week */}
        <FormHelperText>
          Hours Per Week - the number of hours those signed up should work for
          or if its a single day
        </FormHelperText>
        <Input type="number" placeholder="Hours Per Week"></Input>
      </FormControl>
    </VStack>
  );
}

export default CreateVolunteerOpportunity;
