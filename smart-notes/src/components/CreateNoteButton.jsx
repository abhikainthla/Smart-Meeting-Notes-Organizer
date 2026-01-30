import { Button } from "@chakra-ui/react";
import { CgAddR } from "react-icons/cg";
import { useNotes } from "../context/NotesContext";

const CreateNoteButton = () => {
  const { clearSelectedNote } = useNotes();

  return (
    <Button
      colorPalette="teal"
      variant="solid"
      onClick={clearSelectedNote}
    >
      <CgAddR /> Create
    </Button>
  );
};

export default CreateNoteButton;
