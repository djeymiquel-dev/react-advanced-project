import { Button, Center, Flex, Heading, Input, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useCategory } from "../context/CategoryContext";

// export const addEventLoader = async () => {
//   const events = await fetch(`http://localhost:3000/events`);

//   return { events: await events.json() };
// };

export const AddNewEventPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const { categoryName } = useCategory();
  const categoryNames = categoryName();

  // console.log(categoryIds);

  const onSubmit = async (data) => {
    try {
      // Maak een JSON-object van het formulier
      const payload = {
        title: data.title,
        description: data.description,
        image: data.image, // Zorg dat dit een URL is
        categoryIds: data.categoryIds.map(Number), // Zorg dat de waarden integers zijn
        location: data.location,
        startTime: new Date(data.startTime).toISOString(), // Converteer naar ISO-string
        endTime: new Date(data.endTime).toISOString(), // Converteer naar ISO-string
      };

      console.log(data.startTime);

      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit event");
      }

      console.log("Event successfully submitted!");
    } catch (error) {
      console.error("Something went wrong:", error.message);
    }
    // reset de form na submitting
    reset();
  };

  return (
    <Center flexDir={"column"}>
      <Heading>Add New Event</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex flexDir={"column"} p={4} bg={"purple.300"} mt={10} gap={4}>
          <Stack gap={4}>
            <input {...register("title")} placeholder="event name" />

            <textarea
              {...register("description")}
              placeholder="description"
              rows={4}
              cols={50}
            />

            <input
              type="url"
              {...register("image")}
              placeholder="enter image url"
            />

            <h3>Choose a Category</h3>
            {categoryNames.map((category, index) => (
              <div key={index}>
                <label>
                  <input
                    type="checkbox"
                    value={index + 1}
                    {...register("categoryIds")}
                  />
                  {category}
                </label>
              </div>
            ))}

            <input
              {...register("location")}
              type="text"
              placeholder="location"
            />

            <label htmlFor="startTime">Choose a starting time</label>
            <Input
              {...register("startTime")}
              type="datetime-local"
              name="datetime"
              id="startTime"
              onChange={(e) => setValue("startTime", e.target.value)}
            />

            <label htmlFor="endTime">Choose a end time</label>
            <Input
              {...register("endTime")}
              type="datetime-local"
              name="datetime"
              id="endTime"
              onChange={(e) => setValue("endTime", e.target.value)}
            />
            <Button type="submit">Submit</Button>
          </Stack>
        </Flex>
      </form>
    </Center>
  );
};
