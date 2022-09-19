import React from "react";
import { FormLabel, Input } from "@chakra-ui/react";

function Fields(props) {
  return (
    <>
      <FormLabel ml="6" mt="4" fontSize="xl">
        {props.name}
      </FormLabel>
      <Input placeholder={props.name} size="md" w="20em" ml="6"></Input>
    </>
  );
}

export default Fields;
