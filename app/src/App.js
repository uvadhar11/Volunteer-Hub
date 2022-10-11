import React from "react";
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
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
// import HomeSidebar from "./components/home-sidebar";

function App() {
  // context
  const [user, setUser] = React.useState(null);

  // get the current user value here so we can pass to context. Use a state with context.
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // user is signed in
      setUser(user);
    } else {
      // user is not signed in
      setUser(null);
    }
  });

  return (
    <UserContext.Provider value={user}>
      {/* <UserProvider value={user}> */}
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
          <Route path="*" element={<ErrorPage />} />{" "}
          {/* This error page route needs to be the last route!!! Star basically means all others*/}
        </Routes>
      </BrowserRouter>
      {/* </UserProvider> */}
    </UserContext.Provider>
  );
}

export default App;
