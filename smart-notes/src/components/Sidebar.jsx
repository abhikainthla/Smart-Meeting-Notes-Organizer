import React from "react";
import { Box, Separator } from "@chakra-ui/react";
import { AllNotesHeader } from "./AllNotesHeader";
import CategoryFilters from "./CategoryFilters";
import NotesList from "./NotesList";

const Sidebar = () => {
  return (
  
    <Box
      as="aside"
      bg="white"
      p={4}
      borderRadius="lg"
      boxShadow="md"
      h="100%"
      display="flex"
      flexDirection="column"
      bgColor={"#f4f6f8"}
    >
      <AllNotesHeader />

      <Separator my={3} />

      <CategoryFilters />

      <Separator my={3} />

      <Box flex="1"maxH="calc(100vh - 120px)"
  overflowY="auto"
  css={{
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#CBD5E0",
      borderRadius: "20px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#A0AEC0",
    },
  }} pr={1} >
        <NotesList />
      </Box>
    </Box>

  );
};

export default Sidebar;
