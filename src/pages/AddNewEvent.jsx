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
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../components/ui/select";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Field } from "../components/ui/field";
import { CategoryContext } from "../context/CategoryContext";
import { UserContext } from "../context/UserContext";
import { SelectUser } from "../components/SelectUser";
import { useNavigate, useNavigation, useRevalidator } from "react-router-dom";

export const AddNewEvent = () => {
  const { categories } = useContext(CategoryContext);
  const { users } = useContext(UserContext);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const navigate = useNavigate();
  const navigation = useNavigation();
  const revalidator = useRevalidator();

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

  // Maak een JSON-object van het formulier
  const onSubmit = async (data) => {
    if (!selectedUserId) {
      alert("Please select a user");
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

      // Navigate to home page
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

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
            <SelectUser users={users} setSelectedUserId={setSelectedUserId} />

            <Input
              variant={"subtle"}
              {...register("title")}
              placeholder="event name..."
            />
            {errors.title && <p>{errors.title.message}</p>}

            <Textarea
              variant={"subtle"}
              {...register("description")}
              placeholder="description..."
              rows={4}
              cols={50}
            />

            <Input
              type="url"
              variant={"subtle"}
              {...register("image", {
                pattern: {
                  value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                  message: "Please enter a valid URL",
                },
              })}
              placeholder="enter image URL..."
            />
            {/* Validatiefouten weergeven */}
            {errors.image && (
              <p style={{ color: "red" }}>{errors.image.message}</p>
            )}

            {/* Optionele afbeelding preview */}
            {imageUrl && (
              <div style={{ marginTop: "10px" }}>
                <Image
                  src={imageUrl}
                  alt="Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    objectFit: "contain",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
            )}

            <SelectRoot
              multiple
              size="sm"
              positioning={{ placement: "top" }}
              borderRadius={4}
              variant={"subtle"}
            >
              <SelectTrigger>
                <SelectValueText placeholder={"select 1 or more categories"} />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem
                    key={category.id}
                    item={category}
                    selected={selectedCategoryIds.includes(category.id)}
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>

            <Flex gap={2} display={["block", "flex"]}>
              <Field label="Starttime">
                <Input
                  id="startTime"
                  type="datetime-local"
                  {...register("startTime", { required: true })}
                  variant={"subtle"}
                />
              </Field>

              <Field label="Endtime">
                <Input
                  id="endTime"
                  type="datetime-local"
                  {...register("endTime", { required: true })}
                  variant={"subtle"}
                />
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
