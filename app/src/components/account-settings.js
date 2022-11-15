import {
  VStack,
  Text,
  HStack,
  Button,
  Divider,
  Input,
  Avatar,
} from "@chakra-ui/react";
import {
  deleteUser,
  EmailAuthCredential,
  EmailAuthProvider,
  reauthenticateWithCredential,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import NavBar from "./navbar";
// import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { setDefaultEventParameters } from "firebase/analytics";

// test user accounts:
// johndoe1@gmail.com -> bobbajoe
// helloguys@gmail.com -> password

function AccountSettings() {
  const user = auth.currentUser;
  const [image, setImage] = React.useState(null);
  const [url, setUrl] = React.useState(null);
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

  const handleSubmit = () => {
    const imageRef = ref(storage, "image");
    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            // setDefaultEventParameters(url);
            setUrl(url);
            console.log(url);
          })
          .catch((error) => {
            console.log(error.message, "error getting the image url");
          });
        setImage(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
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

  async function deleteAccount() {
    const usersRef = collection(db, "users"); // get collection (users is a collection) and db is firestore
    const q = query(usersRef, where("userID", "==", user.uid));
    const qs = await getDocs(q); // gets documents matching query (parameters) and await = wait till get it
    const usersRef1 = doc(db, "users", qs.docs[0].id); // database, collection, document id -> reference and qs.docs[0].id gets id of document since qs.docs is an array. And one object in it since only one matches the query/parameters.
    // console.log(qs.docs[0].data().firstName); // this data printing works
    // // updates document
    // await updateDoc(usersRef1, {
    //   email: passwordRef.current.value, // field to update: new value
    // });

    // need to reauthenticate user to get their credential in order to change their email.
    // reauthenticate user credential with prompts
    const reAuthPassword = prompt("Enter current password: ");
    const credential = EmailAuthProvider.credential(user.email, reAuthPassword);
    const result = await reauthenticateWithCredential(user, credential);

    let warning = prompt(
      "Are you sure you want to delete your account? This action cannot be undone. If so, type yes"
    );

    if (warning === "yes") {
      deleteUser(user)
        .then(() => {
          // user deleted
          alert("Account was successfully deleted.");
          // delete the document fields associated with the user id - using collection before user deletes.
          deleteDoc(usersRef1);

          // redirect them to log-in
          navigate("/log-in");
        })
        .catch((error) => {
          // An error occurred
          console.log(error);
          alert("Could not delete account!");
        });
    }
  }

  // console.log(image);
  // console.log(url);

  // // user.photoURL = url;
  // console.log(user.photoURL);
  // console.log(url);

  if (url) {
    user.photoURL = url;
    console.log("YESSIR IMO");
    // console.log(user.photoURL);
    updateProfile(user, {
      photoURL: url,
    })
      .then(() => {
        console.log("URL SETTING WORKS");
      })
      .catch((error) => {
        console.log("L", error);
      });
  }

  return (
    <VStack w="100%" h="100vh">
      <NavBar />
      <Text fontSize="6xl">Account Settings</Text>
      <HStack w="90%" pt="1%" alignItems="start">
        {/* Buttons */}
        <VStack w="13%">
          <Button
            w="120%"
            onClick={() => {
              navigate("/account-settings");
            }}
          >
            {" "}
            Your Account
          </Button>
          <Button
            w="120%"
            onClick={() => {
              navigate("/notification-settings");
            }}
          >
            {" "}
            Notifications
          </Button>
          <Button w="120%" onClick={deleteAccount}>
            Delete Account
          </Button>
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
          <Avatar src={url}></Avatar>
          <input type="file" onChange={handleImageChange}></input>
          <Button onClick={handleSubmit}>Change Picture</Button>

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
