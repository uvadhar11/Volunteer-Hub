import { Route, BrowserRouter, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard";
import Features from "./components/features";
import Home from "./components/home";
import LogIn from "./components/log-in";
import SignUp from "./components/sign-up";
import Search from "./components/search";
import YourStats from "./components/your-stats";
import YourAwards from "./components/your-awards";
import HomeSidebar from "./components/home-sidebar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Features />} />
        <Route path="home" element={<Home />}>
          <Route path="home-sidebar" element={<HomeSidebar />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="search" element={<Search />} />
            <Route path="your-stats" element={<YourStats />}></Route>
            <Route path="your-awards" element={<YourAwards />}></Route>
          </Route>
          {/* Add the volunteer opportunity sidebar here */}
        </Route>
        <Route path="sign-up" element={<SignUp />} />
        <Route path="log-in" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
