import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { auth } from "../firebase";

// This file holds all the contexts.

// user object context
const UserContext = React.createContext();
const UserProvider = UserContext.Provider;
const UserConsumer = UserContext.Consumer;

export { UserContext, UserProvider, UserConsumer };

// function Context() {
//   // authentication contexts
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       // user is signed in
//       setUser(user);
//     } else {
//       // user is not signed in
//       setUser(null);
//     }
//   });

//   return (
//     <>
//       <UserConsumer></UserConsumer>
//     </>
//   );
// }

// export default Context;
