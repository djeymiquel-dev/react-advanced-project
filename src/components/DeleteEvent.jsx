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
import { IconButton } from "@chakra-ui/react";
import { FaTrashAlt } from "react-icons/fa";

export const DeleteEvent = ({ event }) => {
  const [isOpen, setIsOpen] = useState(false);
  const submit = useSubmit();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      submit(null, {
        method: "DELETE",
        action: `/event/${event.id}/delete`,
      });

      toaster.create({
        description: "Event deleted successfully",
        type: "success",
      });
      // verwijder de deleted event van de homepage state
      const eventList = JSON.parse(localStorage.getItem("events")) || [];
      const updatedEventList = eventList.filter((e) => e.id !== event.id);
      localStorage.setItem("events", JSON.stringify(updatedEventList));
      setIsOpen(false);
      navigate("/", { replace: true });
    } catch (error) {
      toaster.create({
        description: "Failed to delete event",
        type: "error",
      });
    }
  };

  const hover = { 
    background: "red.500",
    color: "white",
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <IconButton _hover={hover}>
          <FaTrashAlt />
        </IconButton>
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
