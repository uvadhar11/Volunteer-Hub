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
  Button,
  Avatar,
  Wrap,
  WrapItem,
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
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { UserContext } from "./context";

function NavBar(props) {
  const user = auth.currentUser;
  console.log(user);
  console.log(user?.email);

  // set display name to see if it works - it does and now the pfp shows when logged in and no when not logged in
  if (user) {
    user.displayName = "John Doe";
  }

  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark"; // the value is this boolean expression so the value technically doesn't change but the evaluation true/false doesn't change.
  let navigate = useNavigate();

  const logOut = () => {
    signOut(auth)
      .then(() => {
        // sign out successful
        console.log("Sign out successful!");
        navigate("/log-in");
      })
      .catch((error) => {
        // Error occured when signing out
        console.log("An Error occured when signing out.");
      });
  };

  // state for the current user.
  // const [userState, setUserState] = React.useState(null);
  // console.log(userState);

  // <UserContext.Consumer>
  //   {(user) => {
  //     // console.log(user);
  //     setUserState(user.name);
  //   }}
  // </UserContext.Consumer>;
  // console.log(userState.name);

  // now update the state/context. - maybe use auth state changed and put UserContext.Consumer inside there.

  // auth then can refactor with context later
  // let name;
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     // User is signed in, see docs for a list of available properties
  //     // https://firebase.google.com/docs/reference/js/firebase.User
  //     name = user.name;
  //     // ...
  //   } else {
  //     // User is signed out
  //     // ...
  //     name = null;
  //   }
  // });

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

      {/* would dynamically load the elements in here. */}
      {props.signUp === "true" ? (
        <Button
          mr="3"
          size="md"
          colorScheme="facebook"
          onClick={() => navigate("/sign-up")}
        >
          Sign Up
        </Button>
      ) : null}
      {props.logIn === "true" ? (
        <Button
          colorScheme="facebook"
          size="md"
          onClick={() => navigate("/log-in")}
          mr="3"
        >
          Log In
        </Button>
      ) : null}

      <IconButton
        aria-label="Help Button"
        colorScheme="facebook"
        onClick={() => navigate("/help")}
        icon={<FaQuestionCircle />}
      ></IconButton>

      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Notification Bell"
          colorScheme="facebook"
          ml="2"
          icon={<FaBell />}
        />
        <MenuList>
          <MenuItem onClick={() => navigate("/notifications")}>
            <u>Notifications Page</u>
          </MenuItem>
          {/* On click for these Menu items and direct them to the volunteer opportunities and say the info. Also notification page to see all these things in big. */}
          <MenuItem>Notification 1</MenuItem>
          <MenuItem>You got scammed.</MenuItem>
          <MenuItem>New announcement in "Boy Scouts"</MenuItem>
        </MenuList>
      </Menu>

      <IconButton
        aria-label="Theme Change"
        colorScheme="facebook"
        ml="2"
        icon={isDark ? <FaSun /> : <FaMoon />}
        onClick={toggleColorMode}
      ></IconButton>

      {/* Account Settings/Profile Button */}
      <Menu>
        {/* Profile Picture/Profile Button */}
        {/* <MenuButton
          as={IconButton}
          aria-label="Profile"
          icon={<FaGrinAlt />}
          ml="2"
          mr="2"
          colorScheme="facebook"
        /> */}
        {/* <UserContext.Consumer>
          {(user) => {
            userVar = user;
          }}
        </UserContext.Consumer> */}
        <MenuButton
          as={Avatar}
          aria-label="Profile"
          name={user ? user.displayName : null}
          ml="2"
          mr="2"
          colorScheme="facebook"
        />

        {/* Menu Selections */}
        <MenuList>
          <MenuItem onClick={() => navigate("/account-settings")}>
            Account Settings
          </MenuItem>
          <MenuItem onClick={() => navigate("/help")}>Help</MenuItem>
          <MenuItem onClick={logOut}>Log Out</MenuItem>{" "}
          {/*onClick={() => navigate("/log-in")} */}
          {/* sign them out then send to log in page */}
        </MenuList>
      </Menu>
    </Flex>
  );
}

export default NavBar;
