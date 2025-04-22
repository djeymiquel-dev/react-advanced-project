import { Input, useBreakpointValue, IconButton, Flex } from "@chakra-ui/react";

import { BiSearch } from "react-icons/bi";
import { useState } from "react";

export const SearchComponent = ({ clickFn }) => {
  const isSmallScreen = useBreakpointValue({
    base: true,
    md: false,
  });
  const [isSelectOpen, setIsSelectOpen] = useState(false); // State om de zichtbaarheid van de Select te beheren
  return (
    <>
      {isSmallScreen ? (
        <Flex flexDir={"row"} alignItems="center">
          <IconButton
            variant={"ghost"}
            size={"sm"}
            onClick={() => setIsSelectOpen(!isSelectOpen)}
          >
            <BiSearch />
          </IconButton>

          {isSelectOpen && (
            <Input
              css={{ "--focus-color": "purple.700" }}
              size={"sm"}
              width={"16rem"}
              type="text"
              color={"blackAlpha.800"}
              variant={"subtle"}
              onChange={clickFn}
              placeholder="search for event ..."
              boxShadow={"lg"}
              borderRadius={20}
              _focus={{
                bg: "gray.200", // Achtergrondkleur bij focus
              }}
            />
          )}
        </Flex>
      ) : (
        <Flex>
          <Input
            size={"sm"}
            w={"md"}
            type="text"
            color={"blackAlpha.800"}
            variant={"subtle"}
            onChange={clickFn}
            placeholder="search for event ..."
            boxShadow={"lg"}
            borderRadius={20}
            _focus={{
              bgColor: "gray.200", // Achtergrondkleur bij focus
            }}
          />
        </Flex>
      )}
    </>
  );
};
