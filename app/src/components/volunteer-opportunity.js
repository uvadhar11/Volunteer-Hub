import { IconButton, VStack, HStack, Button, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaHome, FaGrinTears } from "react-icons/fa";
import NavBar from "./navbar";

function VolunteerOpportunity(props) {
  let navigate = useNavigate();
  // const [prop, setProp] = React.useState(props);
  // console.log(props);

  // console.log(prop);

  return (
    <VStack w="100%" h="100vh">
      {/* nav bar */}
      <NavBar />

      {/* Icons Side Bar */}
      <HStack
        width="100%"
        height="100vh"
        justify="flex-start"
        align="flex-start"
      >
        <VStack
          w="4%"
          bg="blue"
          h="100%"
          justify="flex-start"
          align="center"
          alignSelf={"flex-start"}
          gap="1"
        >
          <IconButton
            mt="2"
            aria-label="Home Button"
            colorScheme="facebook"
            onClick={() => navigate("/home/dashboard")}
            icon={<FaHome />}
          ></IconButton>

          <IconButton
            aria-label="Volunteer Opportunity"
            colorScheme="facebook"
            onClick={() => navigate("/volunteer-opportunity/dashboard")}
            icon={<FaGrinTears />}
          ></IconButton>
        </VStack>

        {/* For good refactoring - make a sidebar compoenent then pass an object into it for information to show. And use map method to make it show up (map inside of the sidebar component.) */}
        {/* side side bar / sidebar 2 (like channel bar) */}
        <VStack width="10em" height="100%" bg="red.100">
          <Text fontSize="1xl">Volunteer Opportunity</Text>
          <Link to="dashboard">
            <Button colorScheme={"facebook"} size="sm">
              Dashboard
            </Button>{" "}
          </Link>
          <Link to="announcements">
            <Button colorScheme={"facebook"} size="sm">
              Announcements
            </Button>
          </Link>
          <Link to="to-do">
            <Button colorScheme={"facebook"} size="sm">
              To-Do
            </Button>
          </Link>
          {/* Messages here will probably have a ton of sub components which are the different channels you can make (private channels, etc - maybe could add roles later) */}
          <Link to="messages">
            <Button colorScheme={"facebook"} size="sm">
              Messages
            </Button>
          </Link>
        </VStack>
        <Outlet />
        {/* content stuff */}
        {/* <Outlet /> */}
      </HStack>
    </VStack>
  );
}

export default VolunteerOpportunity;
