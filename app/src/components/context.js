import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { auth } from "../firebase";

// This file holds all the contexts.

// user object context
export const UserContext = React.createContext();
export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;

function Context() {
  // authentication contexts
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
    <>
      <UserConsumer></UserConsumer>
    </>
  );
}

export default Context;
