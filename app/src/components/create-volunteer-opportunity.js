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
  Image,
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
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React from "react";
import { FaMinus, FaPlus, FaPlusCircle, FaPlusSquare } from "react-icons/fa";
import { Form, useNavigate } from "react-router-dom";
import { db, storage } from "../firebase";
import NavBar from "./navbar";

function CreateVolunteerOpportunity() {
  let navigate = useNavigate();
  // STATES
  const [locationValue, setLocationValue] = React.useState(null);
  const [newContactInfoValue, setContactInfoValue] = React.useState(1);
  // store url stuff for the image
  const [image, setImage] = React.useState(null);
  const [url, setUrl] = React.useState(null);

  // REFS
  const nameRef = React.useRef(null);
  const descriptionRef = React.useRef(null);
  const orgNameRef = React.useRef(null);
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

  const handlePreviewImage = () => {
    // test showing an image preview without uploading it to cloud storage
    const reader = new FileReader(); // assuming this file reader reads the inputs with the type of file
    reader.onload = function (e) {
      // select the display image element
      const displayImage = document.querySelector(".displayImage");
      // change the display image src to the file uploaded/to display
      displayImage.src = e.target.result;
    };
    reader.readAsDataURL(image);
  };

  // generate a specific ID for the volunteer opportunity for saving and stuff, save data
  async function handleCreate() {
    // TO DO: ADD A CHECK TO MAKE SURE ALL THE FIELDS ARE FILLED OUT BEFORE SUBMITTING.
    // JS integer limit: 15 digits
    // get array from datastore with volunteer op IDs
    // ID variable
    let ID;

    // const volRef = collection(db, "vol_ops");
    const VolOpNumberRef = doc(db, "vol_ops", "vol_op_number");
    const VolOpNumber = await getDoc(VolOpNumberRef);
    // console.log(volRef);
    // console.log(volRef._path.length); // found out its _path from printing volRef to console
    console.log(VolOpNumber.data());
    ID = VolOpNumber.data().vol_op_num + 1;
    // ID = volRef._path.length + 1; // generate new ID
    console.log(ID);

    // convert ID to a string since IDs must be numbers
    ID = ID.toString();

    // store values in the contactInfoArray
    // TO DO: MIGHT NEED TO UPDATE THE CONTACT INFO IF ONE OF THE ON-PLATFORM USERS DELETES THEIR ACCOUNT AND MIGHT WANT TO ADD A CHECK FOR IF THE ON PLATFORM USERS ACTUALLY EXIST, AND MIGHT NEED TO SHOW THE UID FOR THE VOLUNTEERS ON THEIR PROFILE (MAKE ONE?) AND THEN ASK FOR THAT. OR, CAN MAKE A "PUBLIC USER ID" THAT FOLLOWS THE SAME ID GENERATION AS THE VOLUNTEERS OPPORTUNITIES IN CASE WE DON'T WANT TO MAKE THE UID PUBLIC FOR DATA BASE BEING SAFE AND STUFF.
    for (let i = 0; i < newContactInfoValue; i++) {
      const inp = document.querySelector(`.ContactInfo${i}`);
      const inpType = document.querySelector(`.ContactInfo2${i}`);
      contactInfoArray[i] = inp.value;
      contactInfoTypeArray[i] = inpType.value;
      // ^ need to make 2 arrays since nested arrays are not supported with firestore.
    }

    // upload image to cloud storage
    const imageName = `vol_op_icon_${ID}`; // generate imageName
    const imageRef = ref(storage, imageName); // parameter 2 is the name of the file. Made it the uid for ez access.
    uploadBytes(imageRef, image) // use the image state for the file which is updated when the file is uploaded which is why we don't have to change it with the file reader.
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
            console.log(url);
          })
          .catch((error) => {
            console.log(error.message, "error getting the image url");
          });
        setImage(null);
      })
      .catch((error) => {
        console.log(error.message);
      });

    // change local time
    const startTime = new Date(startRef.current.value).toISOString();
    const endTime = new Date(endRef.current.value).toISOString();

    // store data in the variable
    const data = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      orgName: orgNameRef.current.value,
      // contact information stuff
      contactInformation: contactInfoArray,
      contactInformationType: contactInfoTypeArray,
      // check location ref stuff
      location:
        locationValue === "Location/Area"
          ? locationRef.current.value
          : "Global",
      start: startTime,
      end: endTime,
      hoursPerWeek: hoursWeekRef.current.value,
      icon: imageName, // cloud storage name for the image file
    };
    // create the document for this volunteer opportunity in the vol_ops array and the data. And ID is the doc name.
    await setDoc(doc(db, "vol_ops", ID), data);

    // then update the number of volunteer opportunities
    await updateDoc(VolOpNumberRef, { vol_op_num: Number(ID) });

    // say the opportunity was successfully made
    alert("Volunteer opportunity successfully made!");

    // then navigate them to home/or the opportunity home page
    navigate("/home");
  }

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
          {/* <Avatar mb="2" className="displayImage"></Avatar> */}
          <Image
            ml="5"
            className="displayImage"
            h="40vh"
            w="350px"
            fit={"contain"} // preserves the orginal aspect ratio of the image but scales it down to fit in the size set in the image.
            fallbackSrc="/NoImageProvided.png"
          ></Image>
          <input
            type="file"
            variant={"unstyled"}
            onChange={handleImageChange}
          ></input>
          <Button onClick={handlePreviewImage} w="-webkit-fit-content">
            Preview Image
          </Button>
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
            ></Input>
            <Select className={`ContactInfo2${index}`}>
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
