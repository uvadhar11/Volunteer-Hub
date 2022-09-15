import {
  Flex,
  IconButton,
  VStack,
  useColorMode,
  Spacer,
  HStack,
  Button,
  Text,
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
// import { useRouteMatch } from "react-router-dom";
import Search from "./search";
import Dashboard from "./dashboard";
import Logo from "./logo";
import { domAnimation } from "framer-motion";

function changeURL(path, url, str) {
  // const {path, url } = useRouteMatch();
  path = path / str;
  // naviagator.push
}

function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark"; // the value is this boolean expression so the value technically doesn;t change but the evaluation
  // true/false doesn't change.
  // const { path, url } = useRouteMatch(); // get the url and the path.

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

      {/* side bar */}
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
            icon={<FaHome />}
          ></IconButton>

          <IconButton
            aria-label="Volunteer Opportunity"
            colorScheme="facebook"
            icon={<FaGrinTears />}
          />
        </VStack>
        {/* side side bar (like channel bar) */}
        <VStack width="10em" height="100%" bg="red.100">
          <Text fontSize="1xl">Channels</Text>
          <Link to="dashboard">
            <Button
              colorScheme={"facebook"}
              size="sm"
              // onClick={changeURL(path, url, "dashboard")}
            >
              Dashboard
            </Button>{" "}
          </Link>
          <Link to="search">
            <Button colorScheme={"facebook"} size="sm">
              Search
            </Button>
          </Link>
          <Button colorScheme={"facebook"} size="sm">
            Your Stats
          </Button>
          <Button colorScheme={"facebook"} size="sm">
            Your Awards
          </Button>
        </VStack>
        {/* content stuff */}
        <Outlet />
      </HStack>
    </VStack>
  );
}

export default Home;
