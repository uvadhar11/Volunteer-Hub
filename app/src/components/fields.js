import React from "react";
import { FormLabel, Input } from "@chakra-ui/react";

function Fields(props) {
  return (
    <>
      <FormLabel ml="6" mt="4" fontSize="xl">
        {props.name}
      </FormLabel>
      <Input
        placeholder={props.name}
        size="md"
        w="20em"
        ml="6"
        type={props.type} // setting it to props.type and looks like if type isn't specified, it still works fine!
      ></Input>
    </>
  );
}

export default Fields;
