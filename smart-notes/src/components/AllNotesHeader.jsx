import { Flex, Text, Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNotes } from "../context/NotesContext";

export const AllNotesHeader = () => {
  const { selectedNote, deleteNote } = useNotes();

  if (!selectedNote) {
    return (
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="xl">Notes</Text>
      </Flex>
    );
  }

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Text fontSize="xl">Notes</Text>

      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button variant="ghost" colorScheme="red">
            <RiDeleteBinLine color="teal" size={22} />
          </Button>
        </Dialog.Trigger>

        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Delete Note</Dialog.Title>
              </Dialog.Header>

              <Dialog.Body>
                <Text>
                  Are you sure you want to delete this note?  
                  This action cannot be undone.
                </Text>
              </Dialog.Body>

              <Dialog.Footer gap={3}>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>

                <Button
                  colorScheme="red"
                  onClick={() => deleteNote(selectedNote.id)}
                >
                  Delete
                </Button>
              </Dialog.Footer>

              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Flex>
  );
};
