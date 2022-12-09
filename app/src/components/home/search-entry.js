import {
  Button,
  ButtonGroup,
  Center,
  chakra,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { collection, doc, getDocs } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import React, { useEffect } from "react";
import {
  FaAngleDown,
  FaCalendar,
  FaCaretRight,
  FaCaretSquareDown,
  FaClock,
  FaMale,
  FaMapMarkerAlt,
  FaUserFriends,
} from "react-icons/fa";
import { db, storage } from "../../firebase";

// sign up function
function handleSignUp() {
  console.log("hello");
}

// search card for each volunteer opportunity. This is for ONE volunteer opportunity so pass the data in as a prop then put the data in each element. Then in the search.js file, apply the queries and pass data in and load the search entries in accordingly with an Array.from like in the create vol ops with contact info or something.
function SearchEntry(objProps) {
  const [VOIcon, setVOIcon] = React.useState(null);
  console.log(objProps.objProps.data());
  const id = String(objProps.objProps.data().icon);
  console.log(id);
  function getImage() {
    return getDownloadURL(ref(storage, objProps.objProps.data().icon));
  }

  // use effect so it runs on mount once
  useEffect(() => {
    getImage().then((val) => {
      setVOIcon(val);
    });
  }, []);
  // creating an example volunteer opportunity object.
  const volOpObject = {
    name: "Volunteer Opportunity",
    type: "Global",
    location: "Global",
    by: "John Doe", // might make user object here
    timeframe: "On and Off",
    hrsPerWk: "2 hours/week",
    description: "This is a volunteer opportunity",
    memberNumber: 100,
  };
  console.log(objProps.objProps);
  console.log(objProps.objProps.data());
  const docData = objProps.objProps.data();

  const startDate = new Date(docData.start).toLocaleString();
  const endDate = new Date(docData.end).toLocaleString();

  return (
    <VStack
      bg="whiteAlpha.800"
      rounded="md"
      w="-moz-fit-content"
      alignItems="start"
    >
      {/* profile picture */}
      <Image
        src={VOIcon}
        h="40vh"
        w="350px"
        fit={"contain"} // preserves the orginal aspect ratio of the image but scale it down
        fallbackSrc="/NoImageProvided.png"
      ></Image>

      {/* opportunity name - might wanna add volunteer opportunity icon somewhere as well*/}
      <Text color="black" fontSize="xl" pl="2" pr="2" pt="2">
        {docData.name}
      </Text>
      {/* description (have max characters, then additional desc if a button is clicked on side) */}
      <HStack pl="2" pr="2">
        <Icon as={FaCaretRight} color="black"></Icon>
        <Text color="black">{docData.description}</Text>
      </HStack>
      {/* by */}
      <HStack pl="2" pr="2">
        <Icon as={FaMale} color="black"></Icon>
        <Text color="black">{docData.orgName}</Text>
      </HStack>
      {/* type/location - might want to do jut location and if its global then location will be that */}
      <HStack pl="2" pr="2">
        <Icon as={FaMapMarkerAlt} color="black"></Icon>
        <Text color="black">
          {/* {volOpObject.type === volOpObject.location
            ? volOpObject.type
            : volOpObject.type | volOpObject.location} */}
          {docData.location}
        </Text>
      </HStack>
      {/* timeframe */}
      <HStack pl="2" pr="2">
        <Icon as={FaCalendar} color="black"></Icon>
        <Text color="black">{`${startDate} - ${endDate}`}</Text>
      </HStack>
      {/* hours per week */}
      <HStack pl="2" pr="2">
        <Icon as={FaClock} color="black"></Icon>
        <Text color="black">{`${docData.hoursPerWeek} hrs/wk`}</Text>
      </HStack>
      {/* Number of Members in the volunteer opportunity */}
      <HStack pl="2" pr="2" pb="2">
        <Icon as={FaUserFriends} color="black"></Icon>
        <Text color="black">{docData.members} Members</Text>
      </HStack>
      {/* requirements and can use the FaRegListAlt icon for that as a later feature. */}

      {/* more info */}
      <Button colorScheme={"button-default"} rightIcon={<FaAngleDown />}>
        Contact/More Info
      </Button>

      {/* join button */}
      <Button
        onClick={handleSignUp}
        colorScheme={"blackAlpha"}
        alignSelf="center"
        fontSize={"xl"}
        mb="2"
        // disabled="true"
      >
        Sign-Up
      </Button>
    </VStack>
  );
}

export default SearchEntry;
