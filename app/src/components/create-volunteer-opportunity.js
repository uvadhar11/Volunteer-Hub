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
  async function generateID() {
    // JS integer limit: 15 digits
    // get array from datastore with volunteer op IDs
    // const managementRef = collection(db, "management");
    const volOpIDArrayRef = doc(db, "management", "vol_op_IDs");
    const volOpIDArraySnap = await getDoc(volOpIDArrayRef);

    // ID variable
    let ID;

    // deleted IDs array
    const deletedVolOpIDArrayRef = doc(db, "management", "deleted_vol_op_IDs");
    const deletedVolOpIDArraySnap = await getDoc(deletedVolOpIDArrayRef);
    const deletedIDsArray = deletedVolOpIDArraySnap.data().DeletedVolOpIdArray; // gets deleted ID array. Is it okay storing this data in variable where multiple clients can access and so will this variable have the most current data?

    // get max variable
    const VolOpIDVarsRef = doc(db, "management", "vol_op_ID_vars");
    const VolOpIDVarsSnap = await getDoc(VolOpIDVarsRef);
    console.log(VolOpIDVarsSnap.data().maxVolOpId);

    console.log(volOpIDArraySnap.data().VolOpIDArray["length"]); // gets the length
    console.log(volOpIDArraySnap.data().VolOpIDArray[0]); // gets the first index place

    // check deleted array from IDs. Also
    // Values in the array move if you delete an index place in the middle.
    if (deletedIDsArray[0] !== null && deletedIDsArray[0] !== undefined) {
      ID = deletedIDsArray[0];
      console.log(ID);
      // delete the ID from the deleted IDs array -> DOESN'T DELETE???
      await updateDoc(deletedVolOpIDArrayRef, {
        DeletedVolOpIdArray: arrayRemove(ID),
      });
    } else {
      // if no IDs in deleted array then generate the ID

      // generate ID from previous ID generated ONLY IF no ID in deleted array.
      const index = volOpIDArraySnap.data().VolOpIDArray["length"] - 1; // get the last index place in the array
      ID = volOpIDArraySnap.data().VolOpIDArray[index] + 1; // add one to the previous ID
      console.log("ID: ", ID);

      // max number checks with ID generated
      const max = VolOpIDVarsSnap.data().maxVolOpId;
      console.log("max: ", max);

      if (max > ID) {
        console.log("max > ID");
        ID = max + 1;
        // update max -> max = ID;
        await updateDoc(VolOpIDVarsRef, {
          maxVolOpId: ID,
        });
        console.log("ID", ID);
      } else if (ID > max) {
        console.log("ID > max");
        // max = ID;
        await updateDoc(VolOpIDVarsRef, {
          maxVolOpId: ID,
        });
        console.log("ID", ID);
      } else {
        console.log("Max number equals ID!"); // this could happen when the just generated opportunity gets deleted so the max number could be the only ID in the deleted IDs array. So the max would equal the ID. So in that case, leaving it would be fine. TEST all possibilites including this to see if it works or not - it should I think.
      }

      // when a volunteer opportunity is deleted, I can add that ID to an array of deleted IDs then when assigning an ID, I check that array first and if its empty, I generate a new one by adding a number to the array.
    }
    // save the ID for this volunteer opportunity in the array
    await updateDoc(volOpIDArrayRef, {
      VolOpIDArray: arrayUnion(ID),
    });
  }

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
