import { VStack, Text, HStack, Button, Divider, Input } from "@chakra-ui/react";
import {
  EmailAuthCredential,
  EmailAuthProvider,
  reauthenticateWithCredential,
  signOut,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import NavBar from "./navbar";

function AccountSettings() {
  const user = auth.currentUser;
  const [image, setImage] = React.useState(null);
  const usernameRef = React.useRef(null);
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  let navigate = useNavigate();
  const [username, setUsername] = React.useState(null);
  const [email, setEmail] = React.useState(null);

  // async function getUserDocument(field, value) {
  //   const usersRef = collection(db, "users"); // get collection (users is a collection) and db is firestore
  //   const q = query(usersRef, where("userID", "==", user.uid));
  //   const qs = await getDocs(q); // gets documents matching query (parameters) and await = wait till get it
  //   const usersRef1 = doc(db, "users", qs.docs[0].id); // database, collection, document id -> reference and qs.docs[0].id gets id of document since qs.docs is an array. And one object in it since only one matches the query/parameters.
  //   console.log(qs.docs[0].data().firstName); // this data printing works
  //   // updates document
  //   await updateDoc(usersRef1, {
  //     field: value, // field to update: new value
  //   });
  // }

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  async function usernameChange() {
    const usersRef = collection(db, "users"); // get collection (users is a collection) and db is firestore
    const q = query(usersRef, where("userID", "==", user.uid));
    const qs = await getDocs(q); // gets documents matching query (parameters) and await = wait till get it
    const usersRef1 = doc(db, "users", qs.docs[0].id); // database, collection, document id -> reference and qs.docs[0].id gets id of document since qs.docs is an array. And one object in it since only one matches the query/parameters.
    console.log(qs.docs[0].data().firstName); // this data printing works
    // updates document
    await updateDoc(usersRef1, {
      username: usernameRef.current.value, // field to update: new value
    });

    // change firebase displayname
    user.displayName = usernameRef.current.value;
    setUsername(user.displayName);

    // tell them it is successful
    alert(
      "Username change successful. Your new username is: " + user.displayName
    );

    // now sign them out.
    signOut(auth);

    // redirect them to log-in
    navigate("/log-in");
  }

  async function emailChange() {
    const usersRef = collection(db, "users"); // get collection (users is a collection) and db is firestore
    const q = query(usersRef, where("userID", "==", user.uid));
    const qs = await getDocs(q); // gets documents matching query (parameters) and await = wait till get it
    const usersRef1 = doc(db, "users", qs.docs[0].id); // database, collection, document id -> reference and qs.docs[0].id gets id of document since qs.docs is an array. And one object in it since only one matches the query/parameters.
    console.log(qs.docs[0].data().firstName); // this data printing works
    // updates document
    await updateDoc(usersRef1, {
      email: emailRef.current.value, // field to update: new value
    });

    // need to reauthenticate user to get their credential in order to change their email.
    // reauthenticate user credential with prompts
    const reAuthPassword = prompt("Enter current password: ");
    const credential = EmailAuthProvider.credential(user.email, reAuthPassword);
    const result = await reauthenticateWithCredential(user, credential);

    updateEmail(user, emailRef.current.value); // update the email in firebase
    setEmail(user.email); // update the state for re-render

    // tell them it is successful
    alert(
      "Email change successful. Your new email is: " + emailRef.current.value
    );

    // now sign them out.
    signOut(auth);

    // redirect them to log-in
    navigate("/log-in");
  }

  async function resetPassword() {
    const usersRef = collection(db, "users"); // get collection (users is a collection) and db is firestore
    const q = query(usersRef, where("userID", "==", user.uid));
    const qs = await getDocs(q); // gets documents matching query (parameters) and await = wait till get it
    const usersRef1 = doc(db, "users", qs.docs[0].id); // database, collection, document id -> reference and qs.docs[0].id gets id of document since qs.docs is an array. And one object in it since only one matches the query/parameters.
    console.log(qs.docs[0].data().firstName); // this data printing works
    // updates document
    await updateDoc(usersRef1, {
      email: passwordRef.current.value, // field to update: new value
    });

    // need to reauthenticate user to get their credential in order to change their email.
    // reauthenticate user credential with prompts
    const reAuthPassword = prompt("Enter current password: ");
    const credential = EmailAuthProvider.credential(user.email, reAuthPassword);
    const result = await reauthenticateWithCredential(user, credential);

    updatePassword(user, passwordRef.current.value);
    // setEmail(user.email);

    // tell them it is successful
    alert("Password change successful.");

    // now sign them out.
    signOut(auth);

    // redirect them to log-in
    navigate("/log-in");
  }

  console.log(image);
  return (
    <VStack w="100%" h="100vh">
      <NavBar />
      <Text fontSize="6xl">Account Settings</Text>
      <HStack w="90%" pt="1%" alignItems="start">
        {/* Buttons */}
        <VStack w="13%">
          <Button w="120%">Your Account</Button>
          <Button w="120%">Notifications</Button>
          <Button w="120%">Delete Account</Button>
        </VStack>

        {/* Content */}
        <VStack
          w="90%"
          maxW="90%"
          align="flex-start"
          justify="center"
          pl="5%"
          overflowWrap={"break-word"}
        >
          {/*padding -> padding the content in a div*/}
          {/* change profile picture */}
          <Text>Profile Picture</Text>
          <input type="file"></input>
          <Button onClick={handleImageChange}>Change Picture</Button>

          {/* change username */}
          <Text>Username</Text>
          <Text>Current username: {user.displayName}</Text>
          <Input ref={usernameRef}></Input>
          <Button onClick={usernameChange}>Change</Button>

          {/* change email */}
          <Text>Email</Text>
          <Text>Current Email: {user.email}</Text>
          <Input ref={emailRef}></Input>
          <Button onClick={emailChange}>Change</Button>

          <Text>Reset Password</Text>
          <Input ref={passwordRef}></Input>
          <Button onClick={resetPassword}>Reset Password</Button>
        </VStack>
      </HStack>
    </VStack>
  );
}

export default AccountSettings;
