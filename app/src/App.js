import React, { useEffect } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Dashboard from "./components/home/dashboard";
import Features from "./components/features";
import Home from "./components/home/home";
import LogIn from "./components/log-in";
import SignUp from "./components/sign-up";
import Search from "./components/home/search";
import YourStats from "./components/home/your-stats";
import YourAwards from "./components/home/your-awards";
import VolunteerOpportunity from "./components/volunteer-opportunity";
import VODashboard from "./components/volunteer-opportunity/vo-dashboard";
import VOToDo from "./components/volunteer-opportunity/vo-to-do";
import VOAnnouncements from "./components/volunteer-opportunity/vo-announcements";
import VOMessages from "./components/volunteer-opportunity/vo-messages";
import ErrorPage from "./components/error-page";
import Help from "./components/help";
import AccountSettings from "./components/account-settings";
import Notifications from "./components/notifications";
import { UserContext, UserProvider } from "./components/context";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import NotificationSettings from "./components/notification-settings";
import {
  ChakraProvider,
  extendTheme,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import CreateVolunteerOpportunity from "./components/create-volunteer-opportunity";
import ForgotPassword from "./components/forgot-password";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
// import HomeSidebar from "./components/home-sidebar";

function App() {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [userOps, setUserOps] = React.useState(null);
  const [userOpData, setUserOpData] = React.useState(null);

  // onAuthStateChanged(auth, (user) => {
  //   setCurrentUser(user);
  // });

  // async function getUserOps() {
  //   // query for ops user is in. check if user is defined before running since takes a lil bit of time for user to load and this code might execute before that.
  //   if (currentUser) {
  //     let arr = [];
  //     const managementRef = collection(db, "management");
  //     console.log("yes");
  //     console.log(currentUser.uid);
  //     const q = query(
  //       managementRef,
  //       where("volunteer_uid", "==", currentUser.uid)
  //     );
  //     const querySnapshot = await getDocs(q);
  //     console.log(querySnapshot);
  //     querySnapshot.forEach((doc) => {
  //       if (doc.data().valid) arr.push(doc.data().opp_id);
  //       // if the opportunity is valid (prolly not deleted since only ops with current date inside their start-end date range will show up in the search), then push the opp_id (only thing we need since its the data of the op the user is in).
  //     });
  //     return arr;
  //   }
  // }

  // // function to return the document since getting an error when generating a document reference in the for loop.
  // async function accessDoc(id) {
  //   const docRef = doc(db, "vol_ops", id);
  //   return getDoc(docRef);
  // }

  // async function getOpData() {
  //   if (userOps) {
  //     // get data for the volunteer opportunities
  //     let arr = [];
  //     // cant use await and async inside a forEach loop so lets use a for loop
  //     console.log(userOps);
  //     for (let i = 0; i < userOps.length; i++) {
  //       const document = await accessDoc(userOps[i]);
  //       arr.push(document);
  //     }
  //     console.log(arr);
  //     console.log(arr[0].data());
  //     return arr;
  //   }
  // }

  // runs when user auth state reloads.
  // useEffect(() => {
  //   getUserOps().then((val) => {
  //     console.log(val);
  //     setUserOps(val); // set ops user is in
  //   });
  // }, [currentUser]);

  // // runs when the ops user is signed up for reloads
  // useEffect(() => {
  //   getOpData().then((val) => {
  //     console.log(val);
  //     setUserOpData(val);
  //   });
  // }, [userOps]);

  // THEME

  // TOKENS - uppercase hex letters make it not work. Must be lowercase.
  const tokens = {
    colors: {
      light: {
        "bg-default": "red.100",
        "navbar-default": "#718096",
        "button-default": "#edf2f7",
      },
      dark: {
        "bg-default": "#1a202c",
        "navbar-default": "#4a5568",
        "button-default": "#edf2f7",
      },
    },
  };

  // SEMANTIC TOKENS
  const semanticTokens = {
    colors: {
      "bg-default": {
        default: tokens.colors.light["bg-default"],
        _dark: tokens.colors.dark["bg-default"],
      },
      "navbar-default": {
        default: tokens.colors.light["navbar-default"],
        _dark: tokens.colors.dark["navbar-default"],
      },
      "button-default": {
        default: tokens.colors.light["button-default"],
        _dark: tokens.colors.light["button-default"],
      },
    },
  };

  // GLOBAL STYLES
  const styles = {
    global: {
      body: {
        background: "bg-default",
      },
    },
  };

  // Can add changed components here then pass them in

  // EXTEND THEME
  const theme = extendTheme({
    semanticTokens,
    styles,
  });

  // // use effect
  // useEffect(() => {
  //   data().then((val) => {
  //     setDatas(val);
  //     console.log(datas);
  //   });
  // }, [datas]);

  return (
    <ChakraProvider theme={theme}>
      <UserContext.Provider value={currentUser}>
        <UserProvider value={currentUser}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Features />} />
              <Route path="home" element={<Home />}>
                {/* <Route path="home-sidebar" element={<HomeSidebar />}> */}
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="search" element={<Search />} />
                <Route path="your-stats" element={<YourStats />}></Route>
                <Route path="your-awards" element={<YourAwards />}></Route>
                {/* </Route> */}
              </Route>
              <Route
                path="volunteer-opportunity"
                element={<VolunteerOpportunity />}
              >
                <Route path="dashboard" element={<VODashboard />} />
                <Route path="to-do" element={<VOToDo />} />
                <Route path="announcements" element={<VOAnnouncements />} />
                <Route path="messages" element={<VOMessages />} />
              </Route>
              <Route path="sign-up" element={<SignUp />} />
              <Route path="log-in" element={<LogIn />} />
              <Route path="help" element={<Help />} />
              <Route path="account-settings" element={<AccountSettings />} />
              <Route path="notifications" element={<Notifications />} />
              <Route
                path="notification-settings"
                element={<NotificationSettings />}
              />
              <Route
                path="create-volunteer-opportunity"
                element={<CreateVolunteerOpportunity />}
              />
              {/* make a certain amount of routes */}
              {/* {userOpData &&
              userOpData.map((val, index) => {
                console.log(val.data());
                return (
                  <Route
                    key={val.data().id}
                    path="volunteer-opportunity/:id"
                    element={<VolunteerOpportunity objProps={val} />}
                  />
                );
              })} */}
              {/* {userOps &&
              userOps.map((id, index) => {
                console.log(id);
                return (
                  <Route
                    key={id}
                    path="volunteer-opportunity/:id"
                    element={<VolunteerOpportunity props={id} />}
                  />
                );
              })} */}
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="*" element={<ErrorPage />} />{" "}
              {/* This error page route needs to be the last route!!! Star basically means all others*/}
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </UserContext.Provider>
    </ChakraProvider>
  );
}

export default App;
