import { Flex, Input } from "@chakra-ui/react";

export const SearchComponent = ({ clickFn, ...props }) => {
  return (
    <Flex justifyContent={"center"}>
      <Input
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
        {...props}
      />
    </Flex>
  );
};
