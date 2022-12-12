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
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import React, { useEffect } from "react";
import {
  FaAngleDown,
  FaAngleRight,
  FaCalendar,
  FaCaretRight,
  FaCaretSquareDown,
  FaChargingStation,
  FaClock,
  FaMale,
  FaMapMarkerAlt,
  FaUserFriends,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../../firebase";

// search card for each volunteer opportunity. This is for ONE volunteer opportunity so pass the data in as a prop then put the data in each element. Then in the search.js file, apply the queries and pass data in and load the search entries in accordingly with an Array.from like in the create vol ops with contact info or something.
function SearchEntry(objProps) {
  const user = auth.currentUser; // variables and stuff needs to be defined in a function/this functional component and you can put functions even async functions inside this react functional component.
  let navigate = useNavigate();
  const [VOIcon, setVOIcon] = React.useState(null);
  const [contactInfo, setContactInfo] = React.useState(false);
  console.log(objProps.objProps.data());
  const id = String(objProps.objProps.data().icon);
  console.log(id);
  function getImage() {
    return getDownloadURL(ref(storage, objProps.objProps.data().icon));
  }

  // sign up function
  async function handleSignUp() {
    console.log("Signed Up");
    const managementRef = collection(db, "management");
    await addDoc(managementRef, {
      opp_id: objProps.objProps.id,
      valid: true,
      volunteer_uid: user.uid,
    });

    // members += 1
    const membersCount = objProps.objProps.data().members;
    console.log(typeof membersCount);
    console.log(objProps.objProps.id, typeof objProps.objProps.id);
    await updateDoc(doc(db, "vol_ops", objProps.objProps.id), {
      members: membersCount + 1,
    });

    // navigate to the vol op home page
    navigate("/home");
  }

  // use effect so it runs on mount once
  useEffect(() => {
    getImage().then((val) => {
      setVOIcon(val);
    });
  }, []);

  console.log(user);
  console.log(objProps.objProps);
  console.log(objProps.objProps.data());
  const docData = objProps.objProps.data();

  const startDate = new Date(docData.start).toLocaleString();
  const endDate = new Date(docData.end).toLocaleString();

  // check if user in this op so we can disable the button
  // const signedUpDocs = userSignedUp();
  // console.log(signedUpDocs);

  return (
    <VStack
      bg="whiteAlpha.800"
      rounded="md"
      // w="-moz-fit-content"
      alignItems="start"
      w="462px" // makes the widths the same for all the search entries/vol ops
    >
      {/* profile picture */}
      <Image
        src={VOIcon}
        h="40vh"
        w="350px"
        fit={"contain"} // preserves the orginal aspect ratio of the image but scale it down
        fallbackSrc="/NoImageProvided.png"
        alignSelf={"center"} // makes images in the center
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
      <Button
        colorScheme={"button-default"}
        rightIcon={contactInfo ? <FaAngleRight /> : <FaAngleDown />}
        // MUST MAKE IT AN ANONYMOUS FUNCTION with the parenthesis.
        onClick={() =>
          setContactInfo((prev) => {
            return !prev;
          })
        }
      >
        Contact/More Info
      </Button>

      {/* display contact information */}
      {contactInfo ? (
        <HStack w="100%" justify={"space-evenly"}>
          {/* contact info */}
          <VStack w="40%">
            {docData &&
              docData.contactInformation.map((val, index) => {
                return (
                  <Text color={"black"} alignSelf="flex-start">
                    {val}
                  </Text>
                );
              })}
          </VStack>
          {/* platform type */}
          <VStack w="40%">
            {docData &&
              docData.contactInformationType.map((val, index) => {
                return (
                  <Text color={"black"} alignSelf="flex-end">
                    {val}
                  </Text>
                );
              })}
          </VStack>
        </HStack>
      ) : null}

      {/* join button */}
      <Button
        onClick={handleSignUp}
        colorScheme={"blackAlpha"}
        alignSelf="center"
        fontSize={"xl"}
        mb="2"
      >
        Sign-Up
      </Button>
    </VStack>
  );
}

export default SearchEntry;
