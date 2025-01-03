import React from "react";
import { Link } from "react-router-dom";
import { Flex, UnorderedList, ListItem } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <nav>
      <UnorderedList listStyleType={"none"}>
        <Flex flexDir={"row"} gap={4} justifyContent={"center"}>
          <ListItem>
            <Link to="/">Events</Link>
          </ListItem>
          <ListItem>
            <Link to="/event/1">Event</Link>
          </ListItem>
        </Flex>
      </UnorderedList>
    </nav>
  );
};
