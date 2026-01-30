import { Box, Flex } from "@chakra-ui/react";
import SearchInput from "./SearchInput";
import CreateNoteButton from "./CreateNoteButton";

const TopBar = () => {
  return (
    <Box
      bg="white"
      p={8}
      borderRadius="lg"
      boxShadow="md"
      mb={4}
    >
      <Flex gap="25px">
        <SearchInput />
        <CreateNoteButton />
      </Flex>
    </Box>
  );
};

export default TopBar;
