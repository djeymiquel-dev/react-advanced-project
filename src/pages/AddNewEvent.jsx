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
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../components/ui/select";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Field } from "../components/ui/field";
import { CategoryContext } from "../context/CategoryContext";
import { UserContext } from "../context/UserContext";
import { SelectUserComponent } from "../components/SelectUserComponent";
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
      const response = await fetch("http://localhost:3000/events", {
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
    <Center flexDir={"column"}>
      <Heading>Add New Event</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex
          flexDir={"column"}
          p={4}
          bg={"purple.300"}
          mt={10}
          gap={4}
          w={["xs", "md"]}
          borderRadius={10}
        >
          <Stack gap={4}>
            <SelectUserComponent
              users={users}
              setSelectedUserId={setSelectedUserId}
            />

            <Input
              {...register("title")}
              placeholder="event name..."
              variant={"filled"}
              p={2}
            />
            {errors.title && <p>{errors.title.message}</p>}

            <Textarea
              {...register("description")}
              placeholder="description..."
              rows={4}
              cols={50}
              variant={"subtle"}
              p={2}
            />

            <Input
              type="url"
              {...register("image", {
                pattern: {
                  value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                  message: "Please enter a valid URL",
                },
              })}
              placeholder="Enter image URL..."
              variant="filled"
              p={2}
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
              variant={"filled"}
              bg={"black"}
              borderRadius={4}
            >
              <SelectLabel bg={"green"} borderRadius={4} p={2}>
                Select 1 or more{" "}
              </SelectLabel>
              <SelectTrigger>
                <SelectValueText placeholder={"Category"} color={"white"} />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem
                    key={category.id}
                    item={category.name}
                    selected={selectedCategoryIds.includes(category.id)}
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>

            <Field>
              <Input
                {...register("location")}
                type="text"
                placeholder="location"
                variant={"filled"}
              />
            </Field>

            <Flex gap={2} display={["block", "flex"]}>
              <Field label="Starttime">
                <Input
                  id="startTime"
                  type="datetime-local"
                  {...register("startTime", { required: true })}
                  variant={"filled"}
                />
              </Field>

              <Field label="Endtime">
                <Input
                  id="endTime"
                  type="datetime-local"
                  {...register("endTime", { required: true })}
                  variant={"filled"}
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
