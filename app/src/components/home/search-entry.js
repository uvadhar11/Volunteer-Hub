import { chakra, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import React from "react";
import {
  FaCalendar,
  FaCameraRetro,
  FaCaretRight,
  FaDumpsterFire,
  FaMale,
  FaMapMarkerAlt,
  FaTimes,
  FaUserFriends,
} from "react-icons/fa";

// search card for each volunteer opportunity.
function SearchEntry() {
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

  return (
    <VStack
      bg="whiteAlpha.800"
      rounded="md"
      w="-moz-fit-content"
      alignItems="start"
    >
      {/* opportunity name - might wanna add volunteer opportunity icon somewhere as well*/}
      <Text color="black" fontSize="xl" pl="2" pr="2" pt="2">
        {volOpObject.name}
      </Text>
      {/* description (have max characters, then additional desc if a button is clicked on side) */}
      <HStack pl="2" pr="2">
        <Icon as={FaCaretRight} color="black"></Icon>
        <Text color="black">{volOpObject.description}</Text>
      </HStack>
      {/* by */}
      <HStack pl="2" pr="2">
        <Icon as={FaMale} color="black"></Icon>
        <Text color="black">{volOpObject.by}</Text>
      </HStack>
      {/* type/location - might want to do jut location and if its global then location will be that */}
      <HStack pl="2" pr="2">
        <Icon as={FaMapMarkerAlt} color="black"></Icon>
        <Text color="black">
          {volOpObject.type === volOpObject.location
            ? volOpObject.type
            : volOpObject.type | volOpObject.location}
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
