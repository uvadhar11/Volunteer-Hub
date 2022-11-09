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
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FaBars,
  FaSun,
  FaMoon,
  FaBell,
  FaQuestionCircle,
  FaGrinAlt,
  FaHome,
} from "react-icons/fa";
import Logo from "./logo";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { UserContext } from "./context";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { customTheme } from "./theme";

async function getCurrentUserData() {
  const user = auth.currentUser;
  if (user) {
    // if user exists -> isn't undefined/there is one logged in
    const usersRef = collection(db, "users"); // get collection (users is a collection) and db is firestore
    const q = query(usersRef, where("userID", "==", user.uid)); // property, equals, value -> makes query
    const qs = await getDocs(q); // gets documents matching query (parameters) and await = wait till get it
    // qs.forEach((doc) => {
    //   console.log(doc.id + ": " + doc.data().firstName);
    // });
  }
}

function NavBar(props) {
  const user = auth.currentUser;
  // console.log(user);
  // console.log(user?.email);

  // if (user) console.log(user.photoURL);

  getCurrentUserData();

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

  return (
    <Flex
      w="100%"
      h="3em"
      bg={useColorModeValue("gray.100", "red.100")}
      pl="2"
      align="center"
    >
      {/* blackAlpha.600 */}
      {/* Menu Button */}
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Menu Button"
          colorScheme="facebook"
          icon={<FaBars />}
        />
        {/* only show up if user exists */}
        {user ? (
          <MenuList>
            <MenuItem onClick={() => navigate("/home/dashboard")}>
              Home
            </MenuItem>
            <MenuItem
              onClick={() => navigate("/volunteer-opportunity/dashboard")}
            >
              Volunteer Opportunity
            </MenuItem>
          </MenuList>
        ) : null}
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
        onClick={() =>
          window.location.pathname == "/help"
            ? navigate("/")
            : navigate("/help")
        }
        icon={
          window.location.pathname == "/help" ? (
            <FaHome />
          ) : (
            <FaQuestionCircle />
          )
        }
      ></IconButton>

      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Notification Bell"
          colorScheme="facebook"
          ml="2"
          icon={<FaBell />}
        />

        {user ? (
          <MenuList>
            <MenuItem onClick={() => navigate("/notifications")}>
              <u>Notifications Page</u>
            </MenuItem>
            {/* On click for these Menu items and direct them to the volunteer opportunities and say the info. Also notification page to see all these things in big. */}
            <MenuItem>Notification 1</MenuItem>
            <MenuItem>You got scammed.</MenuItem>
            <MenuItem>New announcement in "Boy Scouts"</MenuItem>
          </MenuList>
        ) : null}
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
        <MenuButton
          as={Avatar}
          aria-label="Profile"
          // name={user ? user.displayName : null} // maybe use the user data in firestore instead of display name in auth.
          src={user ? user.photoURL : null}
          // pl={user ? "3" : "0"} // padding so the profile picture is centered. Padding offsets content.
          ml="2"
          mr="2"
          colorScheme="facebook"
        />

        {/* Menu Selections */}
        {user ? (
          <MenuList>
            <MenuItem onClick={() => navigate("/account-settings")}>
              Account Settings
            </MenuItem>
            <MenuItem onClick={() => navigate("/help")}>Help</MenuItem>
            <MenuItem onClick={logOut}>Log Out</MenuItem>{" "}
            {/*onClick={() => navigate("/log-in")} */}
            {/* sign them out then send to log in page */}
          </MenuList>
        ) : null}
      </Menu>
    </Flex>
  );
}

export default NavBar;
