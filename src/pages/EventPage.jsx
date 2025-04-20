import React from "react";
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { useLoaderData, useParams } from "react-router-dom";
import { useEffect } from "react";
import { formattedStartTime, formattedEndTime } from "../helpers/formattedTime";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { CategoryContext } from "../context/CategoryContext";
import { Tag } from "../components/ui/tag";
import { EditEvent } from "../components/EditEvent";
import { DeleteEvent } from "../components/DeleteEvent";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export const EventPage = () => {
  const events = useLoaderData();
  const { eventId } = useParams();
  const { categories } = useContext(CategoryContext);
  const { users } = useContext(UserContext);
  const navigate = useNavigate();
  const event = events.find((e) => e.id.toString() === eventId.toString());

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  if (!event) {
    return (
      <Center minHeight={"100vh"}>
        <Heading>Event not found!</Heading> 21 3 0``
      </Center>
    );
  }

  return (
    <>
      <Flex justifyContent={"center"} alignItems={"center"} mt={8}>
        <Card.Root
          w={["sm", "xl"]}
          h={"lg"}
          bg={"purple.300"}
          borderRadius={25}
        >
          <Image
            src={event.image}
            objectFit={"cover"}
            width="100%"
            height={"18rem"}
            borderTopRadius={25}
          />

          <CardBody bg={"purple.500"}>
            <Stack gap={4}>
              {users.map((user) =>
                user.id === event.createdBy ? (
                  <Box key={user.id}>
                    <Image
                      type={"url"}
                      src={user.image}
                      borderRadius={"full"}
                      boxSize={20}
                    />
                    <Text>{user.name}</Text>
                  </Box>
                ) : null
              )}
              <Heading size={"xl"}>{event.title}</Heading>
              <Text fontSize={"xl"}>{event.description}</Text>
              <Flex flexDir={"column"} gap={2}>
                <Text fontSize={"xl"}>Start: {formattedStartTime(event)}</Text>
                <Text fontSize={"xl"}>End: {formattedEndTime(event)}</Text>
              </Flex>
              <Flex flexDir={"row"} gap={2} flexWrap="wrap">
                {categories
                  .filter((category) => event.categoryIds.includes(category.id))
                  .map((category) => (
                    <Tag
                      key={category.id}
                      size={"xl"}
                      w={"fit-content"}
                      bg={"purple.700"}
                      textAlign={"center"}
                      boxShadow={"none"}
                    >
                      {category.name}
                    </Tag>
                  ))}
              </Flex>
            </Stack>
          </CardBody>
          <CardFooter bg={"purple.300"} p={4} borderBottomRadius={25}>
            <Flex
              flexDir={"row"}
              justifyContent={"flex-start"}
              alignItems={"center"}
              w={"100%"}
              gap={2}
            >
              <EditEvent event={event} />
              <DeleteEvent event={event} />
            </Flex>
            <IconButton onClick={() => navigate("/")}>
              <FaHome />
            </IconButton>
          </CardFooter>
        </Card.Root>
      </Flex>
    </>
  );
};
