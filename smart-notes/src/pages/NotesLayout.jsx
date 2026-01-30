import { Box, Flex } from "@chakra-ui/react";
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import NoteEditor from "../components/NoteEditor";

const NotesLayout = () => {
  return (
    <Box minH="100vh" bg="blue.50" p={4}>
      {/* Top Bar */}
      <TopBar />

      {/* Main Layout */}
      <Flex gap={4} h="calc(100vh - 96px)">
        {/* Sidebar */}
        <Box w="320px">
          <Sidebar />
        </Box>

        {/* Note Editor */}
        <Box flex="1">
          <NoteEditor />
        </Box>
      </Flex>
    </Box>
  );
};

export default NotesLayout;
