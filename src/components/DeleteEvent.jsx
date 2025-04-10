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
  Button,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useSubmit, useNavigate } from "react-router-dom";
import { toaster } from "./ui/toaster";

export const DeleteEvent = ({ event }) => {
  const [isOpen, setIsOpen] = useState(false);
  const submit = useSubmit();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await submit(null, {
        method: "DELETE",
        action: `/event/${event.id}/delete`,
      });

      toaster.create({
        description: "Event deleted successfully",
        type: "success",
      });

      setIsOpen(false);
      navigate("/", { replace: true });
    } catch (error) {
      toaster.create({
        description: "Failed to delete event",
        type: "error",
      });
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"sm"} colorScheme="red">
          Delete Event
        </Button>
      </DialogTrigger>
      <Portal>
        <DialogBackdrop />
        <DialogPositioner>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Event</DialogTitle>
              <Button
                position="absolute"
                right="2"
                top="2"
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </Button>
            </DialogHeader>
            <DialogBody>
              <Text>Are you sure you want to delete this event?</Text>
            </DialogBody>
            <DialogFooter>
              <Button variant="ghost" mr={3} onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </DialogPositioner>
      </Portal>
    </Dialog.Root>
  );
};
