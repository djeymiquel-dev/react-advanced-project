import React from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useLoaderData, useParams } from "react-router-dom";
import { useEffect } from "react";
import { formattedStartTime, formattedEndTime } from "../helpers/formattedTime";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { CategoryContext } from "../context/CategoryContext";
import { Tag } from "../components/ui/tag";

export const EventPage = () => {
  const events = useLoaderData();
  const { categories } = useContext(CategoryContext);
  const { eventId } = useParams();
  const event = events.find((e) => e.id.toString() === eventId.toString());
  const { users } = useContext(UserContext);
  console.log(categories);
  console.log(typeof event.categoryIds);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  // Als het event niet wordt gevonden
  if (!event) {
    return (
      <Center minHeight={"100vh"}>
        <Heading>Event niet gevonden!</Heading>
      </Center>
    );
  }

  return (
    <>
      <Center minHeight={"100vh"}>
        <Card.Root w={"3xl"}>
          <CardHeader>
            <Image
              src={event.image}
              objectFit={"cover"}
              w={"100vw"}
              height={"22rem"}
            />
          </CardHeader>
          <CardBody>
            <Stack gap={4}>
              {users.map((user) =>
                user.id === event.createdBy ? (
                  <>
                    <Image
                      type={"url"}
                      src={user.image}
                      borderRadius={"full"}
                      boxSize={20}
                    />
                    <Box key={user.id}>{user.name}</Box>
                  </>
                ) : null
              )}
              <Heading size={"5xl"}>{event.title}</Heading>
              <Text fontSize={"2xl"}>{event.description}</Text>
              <Flex flexDir={"column"} gap={2}>
                <Text fontSize={"xl"}>Start: {formattedStartTime(event)}</Text>
                <Text fontSize={"xl"}>End: {formattedEndTime(event)}</Text>
              </Flex>
              {categories
                .filter((category) => event.categoryIds.includes(category.id)) // Filter categorieën op basis van categoryIds
                .map((category) => (
                  <Box key={category.id}>
                    <Tag>{category.name}</Tag>
                  </Box>
                ))}
            </Stack>
          </CardBody>
          <CardFooter>
            <Button>Edit Event</Button>
            <Button>Delete Event</Button>
          </CardFooter>
        </Card.Root>
      </Center>
    </>
  );
};
