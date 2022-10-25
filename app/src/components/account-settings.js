import { VStack, Text, HStack, Button, Divider } from "@chakra-ui/react";
import React from "react";
import NavBar from "./navbar";

function AccountSettings() {
  return (
    <VStack w="100%" h="100vh">
      <NavBar />
      <Text fontSize="6xl">Account Settings</Text>
      <HStack w="90%" pt="1%">
        {/* Buttons */}
        <VStack w="17%" align="flex-start" justify="top">
          <Button>Hello</Button>
          <Button>Hello again</Button>
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
          <Text>Content</Text>
          <Text w="100%">
            Hello this is a filler content that we are going to be using to
            write an essay. Lorem Ipsum Fill in balnk stuff. GAMMAMMAMMAJFojdfp
            afpapsdifpasdifasdfpisadfpoasdufoasjdfo
            jasdfjasasjdfasjdfajsd;lfjadfl;asjdflasjdf
            adpfweij-viwqenprv[weutpvbuwq[jvuwrtveyrwv]] SDKf flexDirection
            flexDirectiona;sljdf;lsajdfl;ajsdlf;jal;sdjfl;asdjfl;ajsdfl;asjdfljasdl;fjasl;dfjal;sdjfl;asjdfl;asjdfl;sjadfl;asjdfl;jsad;lfjasl;dfjlas;djfls;adjfl;asjdf;lsajdfl;asjdfl;jasdfl;jsad;lfjasl;dfja;ljfwaoejmrf0wier0wivn04tuuownuejldfjsladjfl;asjdfl;jasfl;sjaldf;jas;Hello
            guys
            jfqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq
          </Text>
        </VStack>
      </HStack>
    </VStack>
  );
}

export default AccountSettings;
