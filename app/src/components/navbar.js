import React from "react";
import {
  Flex,
  IconButton,
  useColorMode,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  FaBars,
  FaSun,
  FaMoon,
  FaBell,
  FaQuestionCircle,
  FaGrinAlt,
} from "react-icons/fa";
import Logo from "./logo";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark"; // the value is this boolean expression so the value technically doesn't change but the evaluation true/false doesn't change.
  let navigate = useNavigate();

  return (
    <Flex w="100%" h="3em" bg="blackAlpha.600" pl="2" align="center">
      {/* Menu Button */}
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Menu Button"
          colorScheme="facebook"
          icon={<FaBars />}
        />
        <MenuList>
          <MenuItem onClick={() => navigate("/home/dashboard")}>Home</MenuItem>
          <MenuItem
            onClick={() => navigate("/volunteer-opportunity/dashboard")}
          >
            Volunteer Opportunity
          </MenuItem>
        </MenuList>
      </Menu>

      <Logo />
      <Spacer />

      <IconButton
        aria-label="Help Button"
        colorScheme="facebook"
        onClick={() => navigate("/help")}
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

      {/* Account Settings/Profile Button */}
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Profile"
          icon={<FaGrinAlt />}
          ml="2"
          mr="2"
          colorScheme="facebook"
        />
        <MenuList>
          <MenuItem onClick={() => navigate("/account-settings")}>
            Account Settings
          </MenuItem>
          <MenuItem onClick={() => navigate("/help")}>Help</MenuItem>
          <MenuItem onClick={() => navigate("/log-in")}>Log Out</MenuItem>{" "}
          {/* sign them out then send to log in page */}
        </MenuList>
      </Menu>
    </Flex>
  );
}

export default NavBar;
