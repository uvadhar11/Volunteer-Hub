import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  InputRightElement,
  MenuItemOption,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { FaMinus, FaPlus, FaPlusCircle, FaPlusSquare } from "react-icons/fa";
import NavBar from "./navbar";

function CreateVolunteerOpportunity() {
  // states
  const [locationValue, setLocationValue] = React.useState(null);
  const [newContactInfoValue, setContactInfoValue] = React.useState(1);

  // functions
  function handleNewContactInfo(add) {
    if (add === true) setContactInfoValue((prevCount) => prevCount + 1);
    else setContactInfoValue((prevCount) => prevCount - 1);
    // we don't need to worry about the count becoming 0 so contact information input is not rendered at all because the subtracting is only applied to the minus icon button (with false as the parameter) because we are only rendering that for the 2nd and on components. So if you delete the 2nd and other components, the remaining (first component) won't have the onClick to delete or not.
  }

  return (
    <VStack w="100%" h="100vh">
      <NavBar />
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

      {/* Can use these input types even though not on chakra docs. INPUT TYPES: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input#input_types */}

      <FormControl>
        {/* Volunteer Opportunity ProfIle Picture */}

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

        {/* plus button that will add more input fields based on number. */}
        {Array.from({ length: newContactInfoValue }).map((_, index) => (
          <Flex key={index}>
            <Input placeholder="Contact Information"></Input>
            <Select>
              <option>On-Platform</option>
              <option>Off-Platform</option>
            </Select>
            {/* <IconButton
              onClick={handleNewContactInfo}
              icon={<FaPlus />}
            ></IconButton> */}

            {/* TEST */}
            {index == 0 ? (
              <IconButton
                onClick={() => handleNewContactInfo(true)}
                icon={<FaPlus />}
              ></IconButton>
            ) : (
              <IconButton
                onClick={() => handleNewContactInfo(false)}
                icon={<FaMinus />}
              ></IconButton>
            )}
          </Flex>
        ))}

        {/* Location/Global */}
        <FormHelperText>
          Opportunity Location - if people anywhere can do it - type Global or
          if a certain area or building, type the address.
        </FormHelperText>
        {/* no on/off setting. */}

        <RadioGroup onChange={setLocationValue} value={locationValue}>
          <Stack direction={"row"}>
            <Radio value="Global">Global</Radio>
            <Radio value="Location/Area">Location/Area</Radio>
          </Stack>
        </RadioGroup>
        {/* if the location/area is selected, make input box show up. But if its global then don't. */}
        {locationValue == "Location/Area" ? (
          <Flex direction={"column"}>
            <FormHelperText>Enter Location/Area</FormHelperText>
            <Input placeholder="Location/Area"></Input>
          </Flex>
        ) : null}

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
