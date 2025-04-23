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
  CardHeader,
} from "@chakra-ui/react";
import { useLoaderData, useParams } from "react-router-dom";
import { useEffect } from "react";
import { formattedStartTime, formattedEndTime } from "../helpers/formattedTime";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { CategoryContext } from "../context/CategoryContext";
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
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }, []);

  if (!event) {
    return (
      <Center minHeight={"100vh"}>
        <Heading as={"h1"} fontSize={"2rem"}>
          Event not found!
        </Heading>
      </Center>
    );
  }

  return (
    <>
      <Flex justifyContent={"center"} alignItems={"center"} mt={8}>
        <Card.Root borderRadius={20} w={["sm", "md", "lg"]}>
          <Image
            src={event.image}
            objectFit={"cover"}
            width="100%"
            height={"14rem"}
            borderTopRadius={20}
          />
          <CardHeader p={0}>
            {users.map((user) =>
              user.id === event.createdBy ? (
                <Box
                  key={user.id}
                  w={"100%"}
                  px={8}
                  py={4}
                  bg={"whiteAlpha.100"}
                >
                  <Image
                    type={"url"}
                    src={user.image}
                    borderRadius={"full"}
                    boxSize={20}
                  />
                  <Text fontSize={"1.2rem"}>{user.name}</Text>
                </Box>
              ) : null
            )}
          </CardHeader>
          <CardBody>
            <Stack gap={4}>
              <Heading as={"h1"} fontSize={"2rem"}>
                {event.title}
              </Heading>
              <Text fontSize={"xl"}>{event.description}</Text>
              <Flex flexDir={"column"} gap={2}>
                <Text fontSize={"xl"}>Start: {formattedStartTime(event)}</Text>
                <Text fontSize={"xl"}>End: {formattedEndTime(event)}</Text>
              </Flex>
              <Flex flexDir={"row"} gap={2} flexWrap="wrap">
                {categories
                  .filter((category) => event.categoryIds.includes(category.id))
                  .map((category) => (
                    <Flex
                      key={category.id}
                      bg={"purple.700"}
                      borderRadius={5}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <Text fontSize={"1rem"} textAlign={"center"} p={1.5}>
                        {category.name}
                      </Text>
                    </Flex>
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
