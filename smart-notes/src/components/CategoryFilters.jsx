import { Box, Flex, Text } from "@chakra-ui/react";
import { MdWork } from "react-icons/md";
import { FcIdea, FcHome } from "react-icons/fc";
import { HiMiniAcademicCap } from "react-icons/hi2";
import { BsTools } from "react-icons/bs";
import { useNotes } from "../context/NotesContext";
import { GrNotes } from "react-icons/gr";

const categories = [
  { id: "all-notes", label: "All notes", icon: GrNotes },
  { id: "work", label: "Work", icon: MdWork },
  { id: "ideas", label: "Ideas", icon: FcIdea },
  { id: "learning", label: "Learning", icon: HiMiniAcademicCap },
  { id: "fix-later", label: "Fix Later", icon: BsTools },
  { id: "personal", label: "Personal", icon: FcHome },
];

const CategoryFilters = () => {
  const { activeCategory, setActiveCategory } = useNotes();

  return (
    <Box>
      <Flex gap="10px" mb={2} justifyContent="space-between">
        {categories.map(({ id, label, icon: Icon }) => {
          const isActive = activeCategory === id;

          return (
            <Box
              key={id}
              p={2}
              bg={isActive ? "teal.100" : "white"}
              borderRadius="md"
              cursor="pointer"
              boxShadow={isActive ? "md" : "sm"}
              _hover={{ boxShadow: "md", transform: "scale(1.05)" }}
              transition="all 0.2s"
              onClick={() => setActiveCategory(id)}
            >
              <Icon size={20} />
            </Box>
          );
        })}
      </Flex>

      <Text fontSize="sm" fontWeight="semibold" color="gray.600">
  {categories.find((c) => c.id === activeCategory)?.label || "All notes"}
</Text>
    </Box>
  );
};

export default CategoryFilters;
