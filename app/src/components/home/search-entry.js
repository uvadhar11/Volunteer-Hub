import { chakra, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { collection, doc, getDocs } from "firebase/firestore";
import React from "react";
import {
  FaCalendar,
  FaCaretRight,
  FaMale,
  FaMapMarkerAlt,
  FaUserFriends,
} from "react-icons/fa";
import { db } from "../../firebase";

// search card for each volunteer opportunity. This is for ONE volunteer opportunity so pass the data in as a prop then put the data in each element. Then in the search.js file, apply the queries and pass data in and load the search entries in accordingly with an Array.from like in the create vol ops with contact info or something.
function SearchEntry(objProps) {
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
  return (
    <VStack
      bg="whiteAlpha.800"
      rounded="md"
      w="-moz-fit-content"
      alignItems="start"
    >
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
      {/* timeframe, hrs per wk */}
      <HStack pl="2" pr="2">
        <Icon as={FaCalendar} color="black"></Icon>
        <Text color="black">
          {volOpObject.timeframe} | {volOpObject.hrsPerWk}
        </Text>
      </HStack>
      {/* Number of Members in the volunteer opportunity */}
      <HStack pl="2" pr="2" pb="2">
        <Icon as={FaUserFriends} color="black"></Icon>
        <Text color="black">{volOpObject.memberNumber} Members</Text>
      </HStack>
      {/* requirements and can use the FaRegListAlt icon for that. */}
    </VStack>
  );
}

export default SearchEntry;
