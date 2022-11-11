import { IconButton, VStack, HStack, Button, Text } from "@chakra-ui/react";
import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaHome, FaGrinTears, FaPlus } from "react-icons/fa";
import NavBar from "../navbar";
import { UserConsumer, UserContext } from "../context";

function Home() {
  let navigate = useNavigate();

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
          {/* home button */}
          <Link to="dashboard">
            {" "}
            {/*embed JS example. Old: "home-sidebar*/}
            <IconButton
              mt="2"
              aria-label="Home Button"
              colorScheme="facebook"
              // onClick={switchHomeClicked}
              icon={<FaHome />}
            ></IconButton>
          </Link>

          {/* volunteer opportunity button */}
          <IconButton
            aria-label="Volunteer Opportunity"
            colorScheme="facebook"
            onClick={() => navigate("/volunteer-opportunity/dashboard")}
            icon={<FaGrinTears />}
          ></IconButton>

          {/* create volunteer opportunity button */}
          <IconButton
            aria-label="Create Volunteer Opportunity Button"
            colorScheme="facebook"
            onClick={() => navigate("/create-volunteer-opportunity")}
            icon={<FaPlus />}
          ></IconButton>
        </VStack>
        {/* side side bar / sidebar 2 (like channel bar) */}
        <VStack width="10em" height="100%" bg="red.100">
          <Text fontSize="1xl">Channels</Text>
          <Link to="dashboard">
            <Button colorScheme={"facebook"} size="sm">
              Dashboard
            </Button>{" "}
          </Link>
          <Link to="search">
            <Button colorScheme={"facebook"} size="sm">
              Search
            </Button>
          </Link>
          <Link to="your-stats">
            <Button colorScheme={"facebook"} size="sm">
              Your Stats
            </Button>
          </Link>
          <Link to="your-awards">
            <Button colorScheme={"facebook"} size="sm">
              Your Awards
            </Button>
          </Link>
        </VStack>
        {/* <UserContext.Consumer> */}
        {/* {(user) => {
            console.log(user.email);
            return <Text>Hello {user.email}!</Text>;
          }} */}
        {/* </UserContext.Consumer> */}
        ;
        <Outlet />
        {/* content stuff */}
        {/* <UserContext.Consumer>
          {(username) => {
            <Text>Hello {username}!</Text>;
          }}
        </UserContext.Consumer>
        ;<Outlet /> */}
      </HStack>
    </VStack>
  );
}

export default Home;
