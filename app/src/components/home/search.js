import React, { useEffect } from "react";
import {
  chakra,
  Text,
  VStack,
  HStack,
  Center,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Spacer,
  Button,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import SearchEntry from "./search-entry";
import { auth, db } from "../../firebase";
import {
  collection,
  doc,
  documentId,
  getDocs,
  getDocsFromServer,
  query,
  waitForPendingWrites,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function Search() {
  // const user = auth.currentUser;
  const searchRef = React.useRef(null);
  const [docData, setDocData] = React.useState(null);
  const [signedUpIDs, setSignedUpIDs] = React.useState(null);
  const [user, setUser] = React.useState(null);

  onAuthStateChanged(auth, (user) => {
    if (user) setUser(user);
  });

  // get docs
  async function volOpData() {
    const querySnapshot = await getDocs(collection(db, "vol_ops"));

    let querySnap = [];
    console.log(querySnapshot);

    querySnapshot.forEach((doc) => {
      console.log(doc.id, doc.data());
      querySnap.push(doc); // doc.data()
    });
    console.log(querySnap);

    return querySnap; // a function with the doc data.
  }

  // get signed up vol ops of the current user
  async function userSignedUp() {
    if (user) {
      let docIDs = [];
      // check: valid or not, user id -> to get the number of ops they are in
      const q = query(
        collection(db, "management"),
        where("valid", "==", true),
        where("volunteer_uid", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
        docIDs.push(doc.data().opp_id);
      });
      return docIDs;
    }
  }

  // use effect so the function only runs once where it was on the function.
  useEffect(() => {
    volOpData().then((val) => {
      setDocData(val);
    });
  }, []);

  // use effect to get the signed up array
  useEffect(() => {
    userSignedUp().then((val) => {
      setSignedUpIDs(val);
    });
  }, [user]);

  return (
    <VStack w="100%" h="calc(100vh-3em)">
      {/* calc is a css property that can subtract stuff like the screen-navbar to get main content size */}
      <Text fontSize="3xl">Find Volunteer Opportunities</Text>
      {/* <Input w="80%"></Input> */}
      <Spacer />
      <InputGroup w="60%">
        <Input
          ref={searchRef}
          placeholder="Find Volunter Opportunities..."
        ></Input>
        <InputRightElement>
          <IconButton icon={<FaSearch />}></IconButton>
        </InputRightElement>
      </InputGroup>
      <Spacer />
      {/* needs to be map because map allows you to return from it. Using docData
      (the state). */}
      {docData &&
        docData.map((document, index) => {
          console.log(document);
          console.log(signedUpIDs);
          console.log(
            signedUpIDs && signedUpIDs.some((doc) => doc === document.id)
          );
          // only make a search entry for the documents that don't have vol_op_num -> also check if valid or not for start and end date.
          const currentDT = new Date(); // gets current date, time in UTC

          // made into dates to compare them and for comparisions
          const sDT = new Date(document.data().start);
          const eDT = new Date(document.data().end);
          return !document.data()?.vol_op_num &&
            sDT <= currentDT &&
            eDT >= currentDT &&
            signedUpIDs &&
            !signedUpIDs.some((doc) => doc === document.id) ? (
            <SearchEntry key={index + 1} objProps={document}></SearchEntry>
          ) : null;
          // vol op num, check whether date and time is in that range.
        })}
    </VStack>
  );
}

export default Search;
