import {
  Flex,
  IconButton,
  VStack,
  useColorMode,
  Spacer,
  HStack,
} from "@chakra-ui/react";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  FaBars,
  FaSun,
  FaMoon,
  FaBell,
  FaQuestionCircle,
  FaGrinAlt,
  FaHome,
  FaGrinTears,
} from "react-icons/fa";
import Logo from "./logo";

let homeClicked = true;
function switchHomeClicked() {
  homeClicked = !homeClicked;
}

function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark"; // the value is this boolean expression so the value technically doesn;t change but the evaluation
  // true/false doesn't change.

  return (
    <VStack w="100%" h="100vh">
      {/* nav bar */}
      <Flex w="100%" h="3em" bg="blackAlpha.600" pl="2" align="center">
        <IconButton
          aria-label="Menu Button"
          colorScheme="facebook"
          icon={<FaBars />}
        ></IconButton>
        <Logo />
        <Spacer />
        <IconButton
          aria-label="Help Button"
          colorScheme="facebook"
          icon={<FaQuestionCircle />}
        ></IconButton>
        <IconButton
          aria-label="Notification Bell"
          colorScheme="facebook"
          ml="2"
          icon={<FaBell />}
        ></IconButton>
        <IconButton
          aria-label="Theme Change"
          colorScheme="facebook"
          ml="2"
          icon={isDark ? <FaSun /> : <FaMoon />}
          onClick={toggleColorMode}
        ></IconButton>
        <IconButton
          aria-label="Profile"
          colorScheme="facebook"
          ml="2"
          mr="2"
          icon={<FaGrinAlt />}
        ></IconButton>
      </Flex>

      {/* side bar */}

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
          <Link to={homeClicked ? "home-sidebar" : "home"}>
            {" "}
            {/*embed JS example. Old: "home-sidebar*/}
            <IconButton
              mt="2"
              aria-label="Home Button"
              colorScheme="facebook"
              onClick={switchHomeClicked}
              icon={<FaHome />}
            ></IconButton>
          </Link>

          <Link to="volunteer-op-sidebar">
            <IconButton
              aria-label="Volunteer Opportunity"
              colorScheme="facebook"
              icon={<FaGrinTears />}
            ></IconButton>
          </Link>
        </VStack>
        {/* side side bar / sidebar 2 (like channel bar) */}
        {/* <VStack width="10em" height="100%" bg="red.100">
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
        </VStack> */}
        <Outlet /> {/*This outlet is for the channels sidebar. */}
        {/* content stuff */}
        {/* <Outlet /> */}
      </HStack>
    </VStack>
  );
}

export default Home;
