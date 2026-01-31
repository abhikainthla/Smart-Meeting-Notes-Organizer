import { Input, InputGroup } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { useNotes } from "../context/NotesContext";

const SearchInput = () => {
  const { searchQuery, setSearchQuery } = useNotes();

  return (
    <InputGroup flex="1" startElement={<LuSearch />}>
      <Input
        placeholder="Search notes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </InputGroup>
  );
};

export default SearchInput;
