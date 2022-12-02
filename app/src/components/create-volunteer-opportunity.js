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
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React from "react";
import { FaMinus, FaPlus, FaPlusCircle, FaPlusSquare } from "react-icons/fa";
import { Form } from "react-router-dom";
import { db } from "../firebase";
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
  const contactInformationRef = React.useRef(null);
  const locationRef = React.useRef(null); // ONLY use when locationValue useState is not Global so check that when storing data
  const startRef = React.useRef(null);
  const endRef = React.useRef(null);
  const hoursWeekRef = React.useRef(null);

  let contactInfoArray = [];
  let contactInfoTypeArray = [];

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
  async function generateID() {
    // JS integer limit: 15 digits
    // get array from datastore with volunteer op IDs
    // ID variable
    let ID = 1;

    const volRef = collection(db, "vol_ops");
    console.log(volRef);
    console.log(volRef._path.length); // found out its _path from printing volRef to console

    ID = volRef._path.length + 1; // generate new ID
    console.log(ID);

    // convert ID to a string since IDs must be numbers
    ID = ID.toString();

    // store data in the variable
    const data = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      orgName: orgNameRef.current.value,
      // contact information stuff
      contactInformation: contactInformationRef.current.value,
      // check location ref stuff
      location:
        locationValue === "Location/Area"
          ? locationRef.current.value
          : "Global",
      start: startRef.current.value,
      end: endRef.current.value,
      hoursPerWeek: hoursWeekRef.current.value,
    };
    // create the document for this volunteer opportunity in the vol_ops array and the data. And ID is the doc name.
    await setDoc(doc(db, "vol_ops", ID), data);
  }

  // data storing stuff when create button pressed
  const handleCreate = () => {
    console.log("checks");
    const contactInfoThing = document.querySelector(".ContactInfo1");
    console.log(contactInfoThing);
    console.log(contactInfoThing.value);
  };

  const test = (e) => {
    console.log(e);
    console.log(e.target.value);
    console.log(e.target.className);
    console.log(e.target.classList[1].includes("ContactInfo"));
    const num = Number(e.target.classList[1].slice(11));
    console.log(num);
    contactInfoArray[num] = [e.target.value];
    console.log(contactInfoArray);
    // contactInfoArray[num] = [contactInfoArray[num], "Only"];
    // console.log(contactInfoArray);
  };

  const test2 = (e) => {
    const num = Number(e.target.classList[1].slice(12));
    contactInfoTypeArray[num] = e.target.value;
    console.log(contactInfoTypeArray);
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

      <Button onClick={generateID}>Test Database</Button>

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
            <Input
              className={`ContactInfo${index}`}
              placeholder="Contact Information"
              onChange={test}
            ></Input>
            <Select className={`ContactInfo2${index}`} onChange={test2}>
              <option>On-Platform</option>
              <option>Off-Platform</option>
            </Select>

            {index === 0 ? (
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
