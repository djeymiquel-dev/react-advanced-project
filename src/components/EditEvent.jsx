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
  Flex,
  Box,
  Image,
} from "@chakra-ui/react";
import { CloseButton } from "./ui/close-button";
import { useForm } from "react-hook-form";
import { useSubmit, useNavigation } from "react-router-dom";
import { useState } from "react";
import { Button } from "./ui/button";
import { toaster } from "./ui/toaster";
import { formatDateTimeLocal } from "../helpers/formattedTime";
import { useEffect } from "react";
import { IconButton } from "@chakra-ui/react";
import { LuPencil } from "react-icons/lu";

export const EditEvent = ({ event }) => {
  const submit = useSubmit();

  const navigation = useNavigation();
  const [isOpen, setIsOpen] = useState(false);

  const {
    reset,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: event?.title || "",
      description: event?.description || "",
      startTime: formatDateTimeLocal(event?.startTime) || "",
      endTime: formatDateTimeLocal(event?.endTime) || "",
      image: event?.image || "",
    },
  });
  const imageUrl = watch("image");

  // Reset het formulier wanneer de event prop verandert
  useEffect(() => {
    reset({
      title: event?.title || "",
      description: event?.description || "",
      startTime: formatDateTimeLocal(event?.startTime) || "",
      endTime: formatDateTimeLocal(event?.endTime) || "",
      image: event?.image || "",
    });
  }, [event, reset]);

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

    // reset();
    setIsOpen(false);
  };

  const hover = {
    bg: "purple.700",
    color: "white",
  };

  return (
    <>
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <IconButton _hover={hover}>
            <LuPencil />
          </IconButton>
        </DialogTrigger>
        <Portal>
          <DialogBackdrop />
          <DialogPositioner>
            <DialogContent>
              <DialogHeader>
                <Flex
                  flexDir={"row"}
                  w={"100%"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <DialogTitle>Edit Event</DialogTitle>
                  <CloseButton
                    variant="ghost"
                    _hover={hover}
                    onClick={() => {
                      setIsOpen(false);
                      reset();
                    }}
                  />
                </Flex>
              </DialogHeader>
              <DialogBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Stack spacing={4}>
                    <Box>
                      <Text mb={2}>Event Title</Text>
                      <Input
                        id="title"
                        {...register("title")}
                        placeholder="Event title"
                      />
                      {errors.title && (
                        <Text color="red.500">{errors.title.message}</Text>
                      )}
                    </Box>

                    <Box>
                      <Text mb={2}>Description</Text>
                      <Textarea
                        id="description"
                        {...register("description")}
                        placeholder="Event description"
                      />
                      {errors.description && (
                        <Text color="red.500">
                          {errors.description.message}
                        </Text>
                      )}
                    </Box>

                    <Box>
                      <Text mb={2}>Start Time</Text>
                      <Input
                        id="startTime"
                        type="datetime-local"
                        {...register("startTime")}
                        placeholder="Event starttime"
                      />
                      {errors.startTime && (
                        <Text color="red.500">{errors.startTime.message}</Text>
                      )}
                    </Box>

                    <Box>
                      <Text mb={2}>End Time</Text>
                      <Input
                        id="endTime"
                        type="datetime-local"
                        {...register("endTime")}
                      />
                      {errors.endTime && (
                        <Text color="red.500">{errors.endTime.message}</Text>
                      )}
                    </Box>

                    <Box>
                      <Text mb={2}>Image URL</Text>
                      <Input
                        type="url"
                        {...register("image", {
                          pattern: {
                            value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                            message: "Please enter a valid URL",
                          },
                        })}
                        placeholder="Image URL"
                      />
                      {errors.image && (
                        <Text color="red.500">{errors.image.message}</Text>
                      )}
                      {imageUrl && (
                        <Box style={{ marginTop: "10px" }}>
                          <Image
                            src={imageUrl}
                            alt="Preview"
                            maxWidth={"50%"}
                          />
                        </Box>
                      )}
                    </Box>
                  </Stack>
                  <DialogFooter
                    display={"flex"}
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                    mt={4}
                    p={0}
                  >
                    <Button
                      variant="outline"
                      _hover={hover}
                      onClick={() => {
                        setIsOpen(false);
                        reset();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="outline"
                      type="submit"
                      isLoading={navigation.state === "submitting"}
                      _hover={hover}
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
    </>
  );
};
