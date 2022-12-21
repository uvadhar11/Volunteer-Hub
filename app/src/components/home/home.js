import { IconButton, VStack, HStack, Button, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
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
  // const [currentUser, setCurrentUser] = React.useState(null);
  const [userOps, setUserOps] = React.useState(null);
  const [userOpData, setUserOpData] = React.useState(null);

  // onAuthStateChanged(auth, (user) => {
  //   setCurrentUser(user);
  //   getUserOps().then((val) => {
  //     console.log(val);
  //     setUserOps(val); // set ops user is in
  //   });
  //   getOpData().then((val) => {
  //     console.log(val);
  //     setUserOpData(val);
  //   });
  // });

  // if (auth.currentUser) setCurrentUser(auth.currentUser);

  // onAuthStateChanged(auth, (user) => {
  //   getUserOps().then((val) => {
  //     console.log(val);
  //     setUserOps(val); // set ops user is in
  //   });
  //   getOpData().then((val) => {
  //     console.log(val);
  //     setUserOpData(val);
  //   });
  // });

  // runs when user auth state reloads.
  // useEffect(() => {
  //   getUserOps().then((val) => {
  //     console.log(val);
  //     setUserOps(val); // set ops user is in
  //   });
  //   getOpData().then((val) => {
  //     console.log(val);
  //     setUserOpData(val);
  //   });
  // }, []);

  // // runs when the ops user is signed up for reloads
  // useEffect(() => {
  //   getOpData().then((val) => {
  //     console.log(val);
  //     setUserOpData(val);
  //   });
  // }, []);

  async function getUserOps() {
    // query for ops user is in. check if user is defined before running since takes a lil bit of time for user to load and this code might execute before that.
    if (auth.currentUser) {
      const currentUser = auth.currentUser;
      let arr = [];
      const managementRef = collection(db, "management");
      console.log("yes");
      console.log(currentUser.uid);
      const q = query(
        managementRef,
        where("volunteer_uid", "==", currentUser.uid)
      );
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

  // if (currentUser) {
  //   getUserOps().then((val) => {
  //     console.log("user, ", val);
  //     setUserOps(val);
  //   });
  // }

  // if (userOps) {
  //   getOpData().then((val) => {
  //     setUserOpData(val);
  //     console.log("set user op data ", val);
  //   });
  // }

  onAuthStateChanged(auth, (user) => {
    getUserOps().then((val) => {
      console.log(val);
      setUserOps(val); // set ops user is in
    });
    getOpData().then((val) => {
      console.log(val);
      setUserOpData(val);
    });
  });

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
