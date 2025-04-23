import React from "react";
import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Text,
  Stack,
  Center,
  Grid,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { useCategory } from "../context/CategoryContext";

import { SearchComponent } from "../components/SearchEventFilter";
import ErrorBoundary from "../components/ErrorBoundary";
import { formattedStartTime, formattedEndTime } from "../helpers/formattedTime";
import { SelectCategoryFilter } from "../components/SelectCategoryFilter";

export const EventsPage = () => {
  const events = useLoaderData();
  const { categoryId, categories } = useCategory();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");

  const matchedEvents = events.filter((event) => {
    const titleMatch =
      !searchTerm ||
      event.title.toLowerCase().includes(searchTerm.toLowerCase());

    const categoryMatch =
      selectedCategory === "" ||
      event.categoryIds.some((id) => {
        const category = categories.find((cat) => cat.id === id);
        return selectedCategory.includes(category?.name);
      });

    return titleMatch && categoryMatch;
  });

  // Search Handler
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Category Handler
  const handleCategoryChange = (category) => {
    const value = category?.value || "";
    setSelectedCategory(value);
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
            <Heading as={"h1"} fontSize={"2rem"}>
              Loading...
            </Heading>
          </Flex>
        </Center>
      ) : (
        <Stack>
          <Box>
            <Flex
              flexDir={"row"}
              alignItems={"center"}
              justifyContent={["flex-start", "flex-start", "center"]}
              p={4}
              gap={4}
            >
              <ErrorBoundary fallback="Dit is een error voor Search component">
                <Box>
                  <SelectCategoryFilter
                    CallbackFN={handleCategoryChange}
                    selectedCategory={selectedCategory}
                  />
                </Box>
                <Box>
                  <SearchComponent clickFn={handleSearchChange} />
                </Box>
              </ErrorBoundary>
            </Flex>
            <Center
              minHeight={"100vh"}
              flexDir={"column"}
              bg={"purple.500"}
              pt={4}
              pb={4}
            >
              {matchedEvents.length === 0 ? (
                <Heading
                  as={"h1"}
                  fontSize={["2rem", "3rem"]}
                  textAlign={"center"}
                >
                  No events found!
                </Heading>
              ) : (
                <Grid
                  templateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(2, 1fr)",
                    lg: "repeat(3, 1fr)",
                    xl: "repeat(4, 1fr)",
                  }}
                  gap={8}
                >
                  {matchedEvents.map((event) => (
                    <Link to={`/event/${event.id}`} key={event.id}>
                      <Card.Root
                        size={["md", "lg"]}
                        boxShadow={"xl"}
                        borderRadius={20}
                        // bg={"purple.500"}
                        border="none"
                      >
                        <Image
                          src={event.image}
                          height={"12rem"}
                          borderTopRadius={20}
                          borderBottomRadius={0}
                        />
                        <CardBody>
                          <Stack spaceX={4}>
                            <Flex
                              flexDir={"column"}
                              justifyContent={"flex-start"}
                            >
                              <Heading textAlign={"start"} size={"xl"}>
                                {event.title}
                              </Heading>
                              <Text textAlign={"start"} mt={2} fontSize={"md"}>
                                {event.description}
                              </Text>
                              <Flex flexDir={"column"} mt={2}>
                                <Text>{formattedStartTime(event)}</Text>
                                <Text>{formattedEndTime(event)}</Text>
                              </Flex>
                              <Flex
                                flexDir={"row"}
                                gap={2}
                                flexWrap="wrap"
                                mt={2}
                              >
                                {event.categoryIds.map((id, index) => (
                                  <Box
                                    key={index}
                                    bg={"purple.600"}
                                    borderRadius={5}
                                    fontSize={"sm"}
                                    p={1}
                                  >
                                    {categoryId(id)?.name}
                                  </Box>
                                ))}
                              </Flex>
                            </Flex>
                          </Stack>
                        </CardBody>
                      </Card.Root>
                    </Link>
                  ))}
                </Grid>
              )}
            </Center>
          </Box>
        </Stack>
      )}
    </>
  );
};
