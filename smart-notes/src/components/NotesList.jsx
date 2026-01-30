import { Badge, Box, Flex, Stack, Text } from "@chakra-ui/react";
import { useNotes } from "../context/NotesContext";

const NotesList = () => {
  const { notes, selectNote, selectedNote, activeCategory } = useNotes();

  const getPreviewText = (html, wordLimit = 10) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const text = tempDiv.textContent || "";
    return text.split(/\s+/).slice(0, wordLimit).join(" ") + "...";
  };

  const timeAgo = (dateString) => {
    const seconds = Math.floor((Date.now() - new Date(dateString)) / 1000);

    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "min", seconds: 60 },
    ];

    for (const i of intervals) {
      const count = Math.floor(seconds / i.seconds);
      if (count >= 1) {
        return `${count} ${i.label}${count > 1 ? "s" : ""} ago`;
      }
    }
    return "Just now";
  };

  if (!notes || notes.length === 0) {
    return <Text color="gray.500">No notes yet</Text>;
  }

const filteredNotes = (() => {
  if (activeCategory === "all-notes") return notes;

  return notes.filter((note) => {
    if (!note.category) return false;

    const normalizedCategory = note.category
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");

    return normalizedCategory === activeCategory;
  });
})();


  return (
    <Stack spacing={4}>
      {filteredNotes.map((note) => {
        const isSelected = selectedNote?.id === note.id;

        return (
          <Box
            key={note.id}
            p={4}
            borderWidth="1px"
            rounded="md"
            cursor="pointer"
            bg={isSelected ? "white" : "gray.50"}
            borderColor={isSelected ? "teal.400" : "gray.200"}
            boxShadow={isSelected ? "md" : "sm"}
            _hover={{ bg: "gray.100" }}
            onClick={() => selectNote(note)}
          >
            <Flex justifyContent="space-between">
              <Text fontWeight="bold" fontSize="lg">
                {note.title}
              </Text>
              <Text fontSize="xs" color="gray.400">
                {timeAgo(note.createdAt)}
              </Text>
            </Flex>

            <Text fontSize="sm" color="gray.500" textAlign={"left"}>
              {note.category}
            </Text>

            <Stack direction="row" mt={2} wrap="wrap">
              {note.tags?.map((tag) => (
  <Badge key={tag} colorScheme="blue">
    {tag}
  </Badge>
))}

            </Stack>

            <Text mt={3} fontSize="sm" textAlign={"left"}>
              {getPreviewText(note.content, 10)}
            </Text>
          </Box>
        );
      })}
    </Stack>
  );
};

export default NotesList;
