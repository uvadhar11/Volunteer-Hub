import { VStack, Text, HStack, Button, Divider, Input } from "@chakra-ui/react";
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
  let navigate = useNavigate();

  async function getUserDocument(field, value) {
    const usersRef = collection(db, "users"); // get collection (users is a collection) and db is firestore
    const q = query(usersRef, where("userID", "==", user.uid));
    const qs = await getDocs(q); // gets documents matching query (parameters) and await = wait till get it
    const usersRef1 = doc(db, "users", qs.docs[0].id); // database, collection, document id -> reference and qs.docs[0].id gets id of document since qs.docs is an array. And one object in it since only one matches the query/parameters.
    console.log(qs.docs[0].data().firstName); // this data printing works
    // updates document
    await updateDoc(usersRef1, {
      field: value, // field to update: new value
    });
  }

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const usernameChange = () => {
    getUserDocument("username", usernameRef.current.value);
    // change firebase displayname
    user.displayName = usernameRef.current.value;
  };

  const emailChange = () => {
    getUserDocument("email", emailRef.current.value);
    // can change firebase property too
    user.email = emailRef.current.value;
  };

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
          <input type="file" onClick={handleImageChange}></input>

          {/* change username */}
          <Text>Username</Text>
          <Text>Current username: {user.displayName}</Text>
          <Input onClick={usernameChange}></Input>
          <Button>Change</Button>

          {/* change email */}
          <Text>Email</Text>
          <Text>Current Email: {user.email}</Text>
          <Input onClick={emailChange}></Input>
          <Button>Change</Button>

          <Text>Reset Password</Text>
        </VStack>
      </HStack>
    </VStack>
  );
}

export default AccountSettings;
