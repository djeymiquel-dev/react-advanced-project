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
    }, 1000);
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
            <Center>
              <Flex
                minHeight={"100vh"}
                flexDir={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                width={"100vw"}
                p={4}
                mt={4}
                bg={"yellow.600"}
              >
                <Box
                  display="grid"
                  gridTemplateColumns={{
                    base: "1fr",
                    md: "repeat(2, 1fr)",
                    lg: "repeat(4, 1fr)",
                  }}
                  gap={4}
                  width="100%"
                  maxWidth="container.xl"
                  justifyItems="center"
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
                            <Heading textAlign={"center"}>
                              {event.title}
                            </Heading>
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
                </Box>
              </Flex>
            </Center>
          </Box>
        </Stack>
      )}
    </>
  );
};
