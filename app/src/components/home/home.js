import { IconButton, VStack, HStack, Button, Text } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaHome, FaGrinTears, FaPlus } from "react-icons/fa";
import NavBar from "../navbar";
import { UserConsumer, UserContext } from "../context";
import { auth, db } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function Home() {
  let navigate = useNavigate();
  const [user, setUser] = React.useState(null);
  // const [userOps, setUserOps] = React.useState(null);
  // const [userOpData, setUserOpData] = React.useState(null);
  // let userOps;
  const userOps = React.useRef(null);

  // update user state when user is logged in
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("auth state changed runs...");
      setUser(user);
    }
  });

  // could move this inside the useEffect or add the eslint-disable-next-line comment to ignore it
  async function getUserOps() {
    // query for ops user is in. check if user is defined before running since takes a lil bit of time for user to load and this code might execute before that.
    if (user) {
      // const currentUser = auth.currentUser;
      let arr = [];
      const managementRef = collection(db, "management");
      console.log("yes");
      // console.log(currentUser.uid);
      const q = query(managementRef, where("volunteer_uid", "==", user.uid));
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
        if (doc.data().valid) arr.push(doc.data().opp_id);
        // if the opportunity is valid (prolly not deleted since only ops with current date inside their start-end date range will show up in the search), then push the opp_id (only thing we need since its the data of the op the user is in).
      });
      return arr;
    }
  }

  // function to return the document since getting an error when generating a document reference in the for loop.
  async function accessDoc(id) {
    const docRef = doc(db, "vol_ops", id);
    return getDoc(docRef);
  }

  async function getOpData() {
    if (userOps) {
      console.log(userOps);
      // get data for the volunteer opportunities
      let arr = [];
      // cant use await and async inside a forEach loop so lets use a for loop
      console.log(userOps);
      for (let i = 0; i < userOps.length; i++) {
        const document = await accessDoc(userOps[i]);
        arr.push(document);
      }
      console.log(arr);
      // console.log(arr[0].data());
      return arr;
    }
  }

  // use effect
  // useEffect(() => {
  //   getUserOps().then((val) => {
  //     console.log(val);
  //     setUserOps(val);
  //   });
  // }, [user]);
  // getUserOps().then((val) => {
  //   console.log(val);
  //   userOps = val;
  // });
  // the problem that was making it crash was it was in an infinite loop because useEffect happens when the component re-renders and I was updating a state which makes the componenet re-render, getting it stuck in an infinite loop. So instead of a state to store the ops the user is in, I could store it in a variable, since this won't need to be updated -> the only way the user can update this is by leaving the page to join an opportunity or create one and anyways when they get back to this page, the function will have been called again and the array will have the right IDs.

  useEffect(() => {
    getUserOps().then((val) => {
      console.log(val);
      userOps.current = val;
      console.log(userOps);
      console.log(userOps.current);
      console.log(typeof userOps.current);
      console.log("use effect runs...");
    });
  }, [user]);

  // rewriting the code to get ops user is in, data for those ops -> maybe query the vol op collection based on the IDs that the user is in from the management collection instead of having to loop through the array of the IDs the user is in.
  // async function userData() {
  //   // 1. get the opportunity IDs of the vol ops the user is in
  // }

  return (
    <VStack w="100%" h="100vh" bg="bg-default">
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
          bg="navbar-default"
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

          {/* vol op buttons */}
          {/* {userOpData &&
            userOpData.map((doc, index) => {
              console.log(userOpData);
              return <IconButton key={index} icon={<FaPlus />}></IconButton>;
            })} */}

          {/* TEST */}
          {/* {console.log(userOps)} */}
          {/* {userOps &&
            userOps.map((val, _, array) => {
              console.log(array);
              return <IconButton key={val} icon={<FaPlus />}></IconButton>;
            })} */}

          {/* Attempt again */}
          {userOps &&
            Array.from(userOps.current).map((val) => {
              console.log("hello");
              return <IconButton key={val} icon={<FaPlus />}></IconButton>;
            })}

          {/* set up -> basically each vol op icon for each volunteer opportunity the user is in will have  */}

          {/* create volunteer opportunity button */}
          <IconButton
            aria-label="Create Volunteer Opportunity Button"
            colorScheme="facebook"
            onClick={() => navigate("/create-volunteer-opportunity")}
            icon={<FaPlus />}
          ></IconButton>

          {/* come up with icon buttons */}
        </VStack>
        {/* side side bar / sidebar 2 (like channel bar) */}
        <VStack width="10em" height="100%" bg="navbar-default">
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
        <Outlet />
      </HStack>
    </VStack>
  );
}

export default Home;
