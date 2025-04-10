import React from "react";
import { Link } from "react-router-dom";
import { Flex, List, ListItem } from "@chakra-ui/react";
import "../css/nav.css";

export const Navigation = () => {
  return (
    <nav>
      <List.Root listStyleType={"circle"} variant={"plain"}>
        <Flex flexDir={"row"} gap={4} justifyContent={"center"} p={2}>
          <List.Item
            _hover={{
              color: "blue.300",
            }}
            p={2}
          >
            <Link to="/">Events</Link>
          </List.Item>
          <ListItem
            _hover={{
              color: "blue.300",
            }}
            p={2}
          >
            <Link to="/add-new-event">Add New Event</Link>
          </ListItem>
        </Flex>
      </List.Root>
    </nav>
  );
};
