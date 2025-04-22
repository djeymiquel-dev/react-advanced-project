import {
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Stack,
  Textarea,
  Image,
} from "@chakra-ui/react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Field } from "../components/ui/field";
import { SelectUser } from "../components/SelectUser";
import { useNavigate, useNavigation, useRevalidator } from "react-router-dom";
import { toaster } from "../components/ui/toaster";
import { AddNewEventSelectCategory } from "../components/AddNewEventSelectCategory";

export const AddNewEvent = () => {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const navigate = useNavigate();
  const navigation = useNavigation();
  const revalidator = useRevalidator();

  // Maak een JSON-object van het formulier
  const onSubmit = async (data) => {
    if (!selectedUserId) {
      alert("Please select a user");
      return;
    }

    if (selectedCategoryIds.length === 0) {
      alert("Please select at least one category");
      return;
    }

    const newEvent = {
      createdBy: parseInt(selectedUserId),
      title: data.title,
      description: data.description,
      image: data.image,
      categoryIds: selectedCategoryIds,
      location: data.location,
      startTime: new Date(data.startTime).toISOString(),
      endTime: new Date(data.endTime).toISOString(),
    };

    try {
      const response = await fetch("http://localhost:5000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });
      if (!response.ok) {
        throw new Error("Failed to create event");
      }
      // Force a refresh of the data
      revalidator.revalidate();

      toaster.create({
        description: "Added Event successfully",
        type: "success",
      });

      // Navigate to home page
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategoryIds((prev) => {
      // Controleer of de ID al is geselecteerd
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId); // Verwijder als het al geselecteerd is
      } else {
        return [...prev, categoryId]; // Voeg toe als het nog niet is geselecteerd
      }
    });
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const imageUrl = watch("image");

  return (
    <Center minHeight={"100vh"} bg={"purple.500"} flexDir={"column"}>
      <Heading size={"3xl"} color={"white"}>
        Add New Event
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex
          flexDir={"column"}
          p={4}
          mt={10}
          gap={4}
          w={["xs", "md"]}
          borderRadius={10}
          border={"1px solid white"}
        >
          <Stack gap={4}>
            {/* Select user component */}
            <SelectUser setSelectedUserId={setSelectedUserId} />

            <Input
              variant={"subtle"}
              {...register("title", {
                maxLength: {
                  value: 50,
                  message: "Title must be at most 50 characters",
                },
                required: {
                  value: true,
                  message: "Title is required",
                },
              })}
              placeholder="event name..."
            />
            {errors.title && <p>{errors.title.message}</p>}
            <Textarea
              variant={"subtle"}
              {...register("description", {
                maxLength: 150,
                required: {
                  value: true,
                  message: "Description is required",
                },
              })}
              placeholder="description..."
              rows={4}
              cols={50}
            />
            {errors.description && <p>{errors.description.message}</p>}
            <Input
              type="url"
              variant={"subtle"}
              {...register("image", {
                pattern: {
                  value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                  message: "Please enter a valid URL",
                },
                required: {
                  value: true,
                  message: "Image URL is required",
                },
              })}
              placeholder="enter image URL..."
            />
            {/* Validatiefouten weergeven */}
            {errors.image && <p>{errors.image.message}</p>}
            {/* Optionele afbeelding preview */}
            {imageUrl && (
              <div style={{ marginTop: "10px" }}>
                <Image src={imageUrl} alt="Preview" maxWidth={"100%"} />
              </div>
            )}
            {/* category component */}
            <AddNewEventSelectCategory
              handleCategoryChange={handleCategoryChange}
              selectedCategoryIds={selectedCategoryIds}
            />
            <Flex gap={2} display={["block", "flex"]}>
              <Field label="Starttime">
                <Input
                  id="startTime"
                  type="datetime-local"
                  {...register("startTime", {
                    required: {
                      value: true,
                      message: "Start time is required",
                    },
                  })}
                  variant={"subtle"}
                />
                {errors.startTime && <p>{errors.startTime.message}</p>}
              </Field>
              <Field label="Endtime">
                <Input
                  id="endTime"
                  type="datetime-local"
                  {...register("endTime", {
                    required: {
                      value: true,
                      message: "End time is required",
                    },
                  })}
                  variant={"subtle"}
                />
                {errors.endTime && <p>{errors.endTime.message}</p>}
              </Field>
            </Flex>
            <Button type="submit" isLoading={navigation.state === "submitting"}>
              Submit
            </Button>
          </Stack>
        </Flex>
      </form>
    </Center>
  );
};
