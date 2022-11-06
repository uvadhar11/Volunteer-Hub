import React from "react";
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
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import SearchEntry from "./search-entry";

function Search() {
  const searchRef = React.useRef(null);

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
      <VStack w="60%" alignItems="start">
        <SearchEntry />
      </VStack>
    </VStack>
  );
}

export default Search;
