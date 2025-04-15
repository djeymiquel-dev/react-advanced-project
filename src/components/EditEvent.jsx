import {
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  Portal,
  DialogBackdrop,
  DialogPositioner,
  DialogContent,
  Input,
  Textarea,
  Stack,
  Text,
} from "@chakra-ui/react";
import { CloseButton } from "./ui/close-button";
import { useForm } from "react-hook-form";
import { useSubmit, useNavigation } from "react-router-dom";
import { useState } from "react";
import { Button } from "./ui/button";
import { toaster } from "./ui/toaster";

export const EditEvent = ({ event }) => {
  const submit = useSubmit();
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = useState(false);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: event?.title || "",
      description: event?.description || "",
      startTime: event?.startTime || "",
      endTime: event?.endTime || "",
      image: event?.image || "",
    },
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("startTime", data.startTime);
    formData.append("endTime", data.endTime);
    formData.append("image", data.image);

    submit(formData, {
      method: "PUT",
    });

    toaster.create({
      description: "Event updated successfully",
      type: "success",
    });

    reset();
    setIsOpen(false);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"sm"} bg={"purple.700"}>
          Edit Event
        </Button>
      </DialogTrigger>
      <Portal>
        <DialogBackdrop />
        <DialogPositioner>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Event</DialogTitle>
              <Button
                position="absolute"
                right="2"
                top="2"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsOpen(false);
                  reset();
                }}
              >
                <CloseButton size="sm" />
              </Button>
            </DialogHeader>
            <DialogBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={4}>
                  <div>
                    <Text mb={2}>Event Title</Text>
                    <Input
                      id="title"
                      {...register("title")}
                      placeholder="Event title"
                    />
                    {errors.title && (
                      <Text color="red.500">{errors.title.message}</Text>
                    )}
                  </div>

                  <div>
                    <Text mb={2}>Description</Text>
                    <Textarea
                      id="description"
                      {...register("description")}
                      placeholder="Event description"
                    />
                    {errors.description && (
                      <Text color="red.500">{errors.description.message}</Text>
                    )}
                  </div>

                  <div>
                    <Text mb={2}>Start Time</Text>
                    <Input
                      id="startTime"
                      type="datetime-local"
                      {...register("startTime")}
                    />
                    {errors.startTime && (
                      <Text color="red.500">{errors.startTime.message}</Text>
                    )}
                  </div>

                  <div>
                    <Text mb={2}>End Time</Text>
                    <Input
                      id="endTime"
                      type="datetime-local"
                      {...register("endTime")}
                    />
                    {errors.endTime && (
                      <Text color="red.500">{errors.endTime.message}</Text>
                    )}
                  </div>

                  <div>
                    <Text mb={2}>Image URL</Text>
                    <Input
                      id="image"
                      {...register("image")}
                      placeholder="Image URL"
                    />
                    {errors.image && (
                      <Text color="red.500">{errors.image.message}</Text>
                    )}
                  </div>
                </Stack>
                <DialogFooter>
                  <Button
                    variant="ghost"
                    mr={3}
                    onClick={() => {
                      setIsOpen(false);
                      reset();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    colorScheme="blue"
                    type="submit"
                    isLoading={navigation.state === "submitting"}
                  >
                    Save Changes
                  </Button>
                </DialogFooter>
              </form>
            </DialogBody>
          </DialogContent>
        </DialogPositioner>
      </Portal>
    </Dialog.Root>
  );
};
