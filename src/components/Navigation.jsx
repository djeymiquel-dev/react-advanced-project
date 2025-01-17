import React from "react";
import { Link } from "react-router-dom";
import { Flex, List, ListItem } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <nav>
      <List.Root listStyleType={"none"}>
        <Flex flexDir={"row"} gap={4} justifyContent={"center"}>
          <List.Item>
            <Link to="/">Events</Link>
          </List.Item>
          <ListItem>
            <Link to="/event/1">Event</Link>
          </ListItem>
        </Flex>
      </List.Root>
    </nav>
  );
};
