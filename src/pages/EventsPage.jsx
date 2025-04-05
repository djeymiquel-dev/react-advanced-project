import React from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Text,
  Stack,
  Center,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { useCategory } from "../context/CategoryContext";
import { Tag } from "../components/ui/tag";
import { SearchComponent } from "../components/SearchComponent";
import ErrorBoundary from "../components/ErrorBoundary";
import { formattedStartTime, formattedEndTime } from "../helpers/formattedTime";

// export const postListLoader = async () => {
//   const events = await fetch(`http://localhost:3000/events`);
//   if (!events.ok) {
//     throw new Error("Failed to fetch data");
//   }
// };

export const EventsPage = () => {
  const events = useLoaderData();
  const { categoryId } = useCategory();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const matchedEvents = events.filter((event) => {
    const titleMatch = event.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const categoryMatch = event.categoryIds.some((id) => {
      const category = categoryId(id);
      return category?.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    return titleMatch || categoryMatch;
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 3000 ms = 3 seconden
    // Schoonmaken van de timer bij component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <Center minHeight={"100vh"} flexDir={"column"}>
          <Flex>
            <Text fontSize={"4xl"}>Loading...</Text>
          </Flex>
        </Center>
      ) : (
        <Stack>
          <Box>
            <Flex justifyContent={"center"} gap={4} px={8} py={4}>
              {/* <Heading size={"3xl"} textAlign={"center"}>
                List of events
              </Heading> */}
              <ErrorBoundary fallback="Dit is een error voor Search component">
                <SearchComponent
                  clickFn={handleSearchChange}
                  width={["xs", "md"]}
                />
              </ErrorBoundary>
              <Link to={"/add-new-event"}>
                <Button display={["none", "flex"]} w={"10rem"}>
                  Add New Event
                </Button>
              </Link>
            </Flex>

            <Box
              minHeight={"100vh"}
              p={8}
              mt={4}
              bg={"yellow.600"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Flex
                flexDir={["column", "row"]}
                justifyContent={"center"}
                alignItems={["flex-start"]}
                gap={8}
                flexWrap={"wrap"}
              >
                {matchedEvents.length > 0 ? (
                  matchedEvents.map((event) => (
                    <Link to={`/event/${event.id}`} key={event.id}>
                      <Card.Root w={"xs"} height={["md"]} borderRadius={20}>
                        <Image
                          src={event.image}
                          height={"12rem"}
                          borderTopRadius={20}
                          borderBottomRadius={0}
                        />
                        <CardBody>
                          <Heading textAlign={"center"}>{event.title}</Heading>
                          <Text>{event.description}</Text>
                          <Flex flexDir={"column"} gap={4}>
                            <Text>{formattedStartTime(event)}</Text>
                            <Text>{formattedEndTime(event)}</Text>
                          </Flex>
                          {event.categoryIds.map((id, index) => (
                            <div key={index}>
                              <Tag>{categoryId(id)?.name}</Tag>
                            </div>
                          ))}
                        </CardBody>
                      </Card.Root>
                    </Link>
                  ))
                ) : (
                  <Text textAlign={"center"}>No events found</Text>
                )}
                <Link to={"/add-new-event"}>
                  <Button display={["flex", "none"]} w={"10rem"}>
                    Add New Event
                  </Button>
                </Link>
              </Flex>
            </Box>
          </Box>
        </Stack>
      )}
    </>
  );
};
