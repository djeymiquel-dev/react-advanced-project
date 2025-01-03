import React from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Tag,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useCategory } from "../context/CategoryContext";
import { useLoaderData } from "react-router-dom";

export const postListLoader = async () => {
  const events = await fetch(`http://localhost:3000/events`);

  return { events: await events.json() };
};

export const EventsPage = () => {
  const { events } = useLoaderData();
  const { categoryId } = useCategory();

  return (
    <>
      <Heading textAlign={"center"}>List of events</Heading>

      <Box mt={4}>
        <Flex
          flexDir={["column", "row"]}
          justifyContent={"center"}
          alignItems={"flex-start"}
          gap={4}
          flexWrap={"wrap"}
        >
          {events.map((event) => {
            return (
              <Link to={`/event/${event.id}`} key={event.id}>
                <Card w={["xs", "sm"]} height={["md"]}>
                  <Image src={event.image} height={"12rem"} />
                  <CardBody>
                    <Heading textAlign={"center"}>{event.title}</Heading>
                    <Text>{event.description}</Text>
                    <Flex>
                      <Text>{event.startTime}</Text>
                      <Text>{event.endTime}</Text>
                    </Flex>
                    {event.categoryIds.map((id, index) => (
                      <div key={index}>
                        <Tag>{categoryId(id)?.name}</Tag>
                      </div>
                    ))}
                  </CardBody>
                </Card>
              </Link>
            );
          })}
        </Flex>
        <Link to={"/add-new-event"}>
          <Button>Add Event</Button>
        </Link>
      </Box>
    </>
  );
};
