import {
  Avatar,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
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
import { Form } from "react-router-dom";
import NavBar from "./navbar";

function CreateVolunteerOpportunity() {
  // STATES
  const [locationValue, setLocationValue] = React.useState(null);
  const [newContactInfoValue, setContactInfoValue] = React.useState(1);
  // store url stuff for the image
  const [image, setImage] = React.useState(null);

  // REFS
  const nameRef = React.useRef(null);
  const descriptionRef = React.useRef(null);
  const orgNameRef = React.useRef(null);
  // store contact information, usernames for people to contact
  const locationRef = React.useRef(null); // ONLY use when locationValue useState is not Global so check that when storing data
  const startRef = React.useRef(null);
  const endRef = React.useRef(null);
  const hoursWeekRef = React.useRef(null);

  // FUNCTIONS
  // add/subtract to state value for number of contact informations
  function handleNewContactInfo(add) {
    if (add === true) setContactInfoValue((prevCount) => prevCount + 1);
    else setContactInfoValue((prevCount) => prevCount - 1);
    // we don't need to worry about the count becoming 0 so contact information input is not rendered at all because the subtracting is only applied to the minus icon button (with false as the parameter) because we are only rendering that for the 2nd and on components. So if you delete the 2nd and other components, the remaining (first component) won't have the onClick to delete or not.
  }

  // store image for opportunity icon in a state
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      // if a file exists in "e" (event thing)
      setImage(e.target.files[0]); // then set the state to that file
    }
  };

  // generate a specific ID for the volunteer opportunity for saving and stuff
  const generateID = () => {
    // ID Params: 32 characters max
    const characters = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "a",
      "A",
      "b",
      "B",
      "c",
      "C",
      "d",
      "D",
      "e",
      "E",
      "f",
      "F",
      "g",
      "G",
      "h",
      "H",
      "i",
      "I",
      "j",
      "J",
      "k",
      "K",
      "l",
      "L",
      "m",
      "M",
      "n",
      "N",
      "o",
      "O",
      "p",
      "P",
      "q",
      "Q",
      "r",
      "R",
      "s",
      "S",
      "t",
      "T",
      "u",
      "U",
      "v",
      "V",
      "w",
      "W",
      "x",
      "X",
      "y",
      "Y",
      "z",
      "Z",
    ];
  };

  // data storing stuff when create button pressed
  const handleCreate = () => {
    console.log("checks");
  };

  return (
    <VStack w="100%" h="100vh">
      <NavBar />
      <Text fontSize="6xl">Create a Volunteer Opportunity</Text>

      {/* create a volunteer opportunity:
        things we want:
        - icon
        - name
        - short description (250 characters or so)
        - creator/org name
        - Location/Global
        - Timeframe
        - Hours per week
        - Maybe whether it gives community hours/not
      */}

      {/* Can use these input types even though not on chakra docs. INPUT TYPES: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input#input_types */}

      <FormControl isRequired>
        {/* Volunteer Opportunity Icon */}
        <Flex direction={"column"}>
          <Avatar mb="2"></Avatar>
          <input
            type="file"
            variant={"unstyled"}
            onChange={handleImageChange}
          ></input>
        </Flex>

        {/* Volunteer Opportunity Name */}
        <FormLabel>Volunteer Opportunity Name</FormLabel>
        <Input placeholder="Name" ref={nameRef}></Input>

        {/* Description */}
        <FormLabel>Description of Opportunity</FormLabel>
        <Input placeholder="Description" ref={descriptionRef}></Input>

        {/* Organization Name */}
        <FormLabel>
          Organization Name - the name people see for who is hosting the
          volunteer opportunity. Can be your username, a made up name, etc.
        </FormLabel>
        <Input placeholder="Organization Name" ref={orgNameRef}></Input>

        {/* Organizer Contact Information - who to contact with questions */}
        <FormLabel>
          Organizers Contact Information - usernames for on platform contact for
          questions before signing up, off platform contact. Include contact and
          platform in the inputs.
        </FormLabel>

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
        <FormLabel>
          Opportunity Location - if people anywhere can do it - type Global or
          if a certain area or building, type the address.
        </FormLabel>
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
            <Input ref={locationRef} placeholder="Location/Area"></Input>
          </Flex>
        ) : null}

        {/* Timeframe */}
        <FormLabel>
          Timeframe - the dates/time the opportunity will last for
        </FormLabel>
        {/* ^ start, end date input. Also a time input if that applies.*/}
        <FormLabel>Start Date/Time</FormLabel>
        <Input ref={startRef} type="datetime-local"></Input>
        <FormLabel>End Date/Time</FormLabel>
        <Input ref={endRef} type="datetime-local"></Input>
        {/* Hours Per Week */}
        <FormLabel>
          Hours Per Week - the number of hours those signed up should work for
          or if its a single day
        </FormLabel>
        <Input
          type="number"
          placeholder="Hours Per Week"
          ref={hoursWeekRef}
        ></Input>
        <Button type="submit" onClick={handleCreate}>
          Create Opportunity
        </Button>
      </FormControl>
    </VStack>
  );
}

export default CreateVolunteerOpportunity;
