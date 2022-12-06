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
import { db } from "../../firebase";
import {
  collection,
  doc,
  getDocs,
  getDocsFromServer,
  waitForPendingWrites,
} from "firebase/firestore";

// variable for number of inputs for the create volunteer opportunities
const inputNum = 10;
let volOpNum;
// const [test, setTest] = React.useState(null);
// let querySnap = [];
// get docs
async function volOpData() {
  // const volOpCollectionRef = collection(db, "vol_ops");
  // ask about the search method.
  // console.log(volOpCollectionRef);

  const querySnapshot = await getDocs(collection(db, "vol_ops"));
  // console.log(querySnapshot);
  // console.log(querySnapshot.docs);
  // console.log(querySnapshot.docs[0]._document.data.value.mapValue.fields);
  // const thing = querySnapshot.docs[0]._document.data.value.mapValue.fields;
  // console.log(thing);
  // // console.log(thing.entries);
  // console.log(thing.length);

  // volOpNum =
  //   querySnapshot.docs[0]._document.data.value.mapValue.fields.length - 1;
  // console.log(volOpNum);

  // let str = "";
  // return querySnapshot.docs[0]._document.data.value.mapValue.fields;
  let querySnap = [];
  console.log(querySnapshot);

  querySnapshot.forEach((doc) => {
    console.log(doc.id, doc.data());
    querySnap.push(doc.data());
  });
  console.log(querySnap);
  // querySnap = Array.from(querySnapshot);

  // return <Text></Text>
  // setTest(querySnap);
  return querySnap;
}

const doNothing = () => {
  console.log("L");
};

function Search() {
  const searchRef = React.useRef(null);
  const [test, setTest] = React.useState(null);

  // const obj = volOpData();
  // console.log(querySnap);
  // volOpData();
  // console.log(querySnap);
  // const querySnapshot = getDocs(collection(db, "vol_ops"));
  // setTimeout(console.log("oof"), 1000);
  // Promise.all();

  // console.log(querySnapshot);
  // setTimeout(doNothing, 5000);
  // console.log(querySnapshot);
  // console.log(querySnapshot.docs[0]._document.data.value.mapValue.fields);

  // volOpData().then((data) => {
  //   console.log(data);
  // });

  // const val = volOpData();

  // const querySnap1 = volOpData();

  // querySnap1.forEach((data) => {
  //   console.log(data);
  // });
  useEffect(() => {
    volOpData().then((val) => {
      setTest(val);
    });
  }, []);

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

      {/* make a search card for each volunteer opportunity */}
      {/* {volOpData().then((data) => {
        return [
          <VStack w="60%" alignItems="start">
            {Array.from({ length: 10 }).map((_, index) => (
              <SearchEntry
                key={`search_op_${index}`}
                objProps={data}
                numProps={index}
              />
            ))}
          </VStack>,
        ];
      })} */}
      {/* {querySnap.forEach((doc) => {
        console.log(doc.id, doc.data());
      })} */}

      {/* {val.forEach((stuff) => {
        console.log(stuff);
      })} */}

      {/* needs to be map because map allows you to return from it. */}
      {test &&
        test.map((stuff) => {
          console.log(stuff);
          return <Text>{stuff.start}</Text>;
        })}
    </VStack>
  );
}

export default Search;
