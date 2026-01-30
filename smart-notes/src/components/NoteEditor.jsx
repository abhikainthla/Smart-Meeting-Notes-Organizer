import { useEffect, useState } from "react";
import { useNotes } from "../context/NotesContext";
import { Toaster, toaster } from "./ui/toaster"


import {
  Box,
  Input,
  Flex,
  Button,
  Text,
  Dialog,
  Portal,
  CloseButton,
  HStack,
} from "@chakra-ui/react";
import { Select, createListCollection } from "@chakra-ui/react";
import { FaTag } from "react-icons/fa6";

import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import TextAlign from '@tiptap/extension-text-align'
import {
  Control,
  RichTextEditor,
} from "./ui/rich-text-editor"
import Placeholder from "@tiptap/extension-placeholder"
import { MdOutlineFileUpload } from "react-icons/md";
import Image from "@tiptap/extension-image";

Image.configure({
  inline: false,
  allowBase64: true,
  HTMLAttributes: {
    style: "max-width: 300px; height: auto;",
  },
});



const NoteEditor = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [open, setOpen] = useState(false);
  const [editable, setEditable] = useState(true);
  const [images, setImages] = useState([]);


const { selectedNote, addNote, updateNote, clearSelectedNote } = useNotes();




 const editor = useEditor({
  extensions: [
    StarterKit,
     Image.configure({
      inline: false,
      allowBase64: true,
      HTMLAttributes: {
        style: "max-width: 300px; height: auto;",
      },
    }),
    TextAlign.configure({
      types: ["heading", "paragraph"],
      defaultAlignment: "left",
    }),
    Placeholder.configure({
      placeholder: "Start typing your content here...",
    }),
  ],
  content: "",
  editable,
  immediatelyRender: false,
});

const handleImageUpload = (e) => {
  const files = Array.from(e.target.files);
  if (!files.length || !editor) return;

  files.forEach((file) => {
    const reader = new FileReader();

    reader.onload = () => {
      const imageSrc = reader.result;

      
      editor.chain().focus().setImage({ src: imageSrc }).run();
      setImages((prev) => [...prev, imageSrc]);
    };

    reader.readAsDataURL(file);
  });

  e.target.value = "";
};



const handleSave = () => {
  // Title validation
  if (!title.trim()) {
    toaster.create({
      title: "Title is required",
      description: "Please enter a title for your note.",
      type: "warning",
      duration: 3000,

    });
    return;
  }

  // Category validation
  if (!category) {
    toaster.create({
      title: "Category is required",
      description: "Please select a category for your note.",
      type: "warning",
      duration: 3000,
    });
    return;
  }

  // Content validation 
  const hasText = editor.getText().trim().length > 0;
  const hasImages = images.length > 0;

  if (!hasText && !hasImages) {
   toaster.create({
      title: "Empty note",
      description: "Please add some content or images before saving.",
      type: "warning",
      duration: 3000,

    });
    return;
  }

  // Save logic
  if (selectedNote) {
    updateNote({
      ...selectedNote,
      title,
      category,
      tags,
      content: editor.getHTML(),
      images,
    });

    toaster.create({
      title: "Note updated",
      type: "success",
      duration: 2000,
    });
  } else {
    addNote({
      id: crypto.randomUUID(),
      title,
      category,
      tags,
      content: editor.getHTML(),
      images,
      createdAt: new Date().toISOString(),
    });

   toaster.create({
      title: "Note created",
      type: "success",
      duration: 2000,
    });
  }

  clearSelectedNote();
};


useEffect(() => {
  if (!editor) return;

  if (selectedNote) {
    setTitle(selectedNote.title);
    setCategory(selectedNote.category);
    setTags(selectedNote.tags);
    setImages(selectedNote.images || []); 
    editor.commands.setContent(selectedNote.content);
  } else {
    setTitle("");
    setCategory("");
    setTags([]);
    setImages([]); 
    editor.commands.clearContent();
  }
}, [selectedNote, editor]);





const handleModeChange = (mode) => {
  setEditable(mode === "edit");
  editor?.setEditable(mode === "edit");
};


  const categories = createListCollection({
    items: [
      { label: "Work", value: "work" },
      { label: "Ideas", value: "ideas" },
      { label: "Learning", value: "learning" },
      { label: "Fix Later", value: "fix-later" },
      { label: "Personal", value: "personal" },
    ],
  });

  const addTag = () => {
    if (!tagInput.trim()) return;
    if (tags.includes(tagInput)) return;

    setTags([...tags, tagInput]);
    setTagInput("");
    setOpen(false);
  };

  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  

  return (
    <Box
      bg="white"
      p={5}
      borderRadius="lg"
      boxShadow="md"
      h="100%"
      display="flex"
      flexDirection="column"
      gap={4}
    >
      {/* Category */}
      <Select.Root
  collection={categories}
  size="sm"
  width="300px"
  onValueChange={(e) => setCategory(e.value[0])}
>
  <Toaster />

        <Select.HiddenSelect />
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select Category" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {categories.items.map((item) => (
                <Select.Item item={item} key={item.value}>
                  {item.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>

      {/* Title + Add Tag */}
      <Flex gap={3} align="center">
        <Input
  placeholder="Note Title"
  fontSize="lg"
  fontWeight="semibold"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  
/>


        <Button
          variant="outline"
          onClick={() => setOpen(true)}
        >
         <FaTag color="teal" /> Add Tag
        </Button>
      </Flex>

      {/* Tags Display */}
     {tags.length > 0 && (
  <Flex gap={2} wrap="wrap">
    {tags.map((tag) => (
      <Flex
        key={tag}
        align="center"
        bg="blue.100"
        px={3}
        py={1}
        borderRadius={5}
        fontSize="sm"
        gap={1}
      >
        <Text>{tag}</Text>
        <CloseButton
          size="xs"
          variant="ghost"
          aria-label="Remove tag"
          onClick={() => removeTag(tag)}
        />
      </Flex>
    ))}
  </Flex>
)}
{/* Rich Text Editor */}

{editor && (
  <RichTextEditor.Root
    editor={editor}
    borderWidth="1px"
    rounded="md"
    flex="1"
    display="flex"
    flexDirection="column"
  >
    {/* toolbar */}
    <HStack p="2" borderBottomWidth="1px" justify="space-between">
      <HStack>
  <RichTextEditor.ControlGroup
    inert={!editable}
    opacity={!editable ? 0.5 : 1}
  >
    <Control.Bold />
    <Control.Italic />
    <Control.Underline />
    <Control.Strikethrough />
  </RichTextEditor.ControlGroup>

 <input
  type="file"
  accept="image/*"
  multiple                 
  hidden
  id="image-upload"
  onChange={handleImageUpload}
/>

<Button
  size="sm"
  variant="ghost"
  onClick={() => document.getElementById("image-upload").click()}
>
  <MdOutlineFileUpload />
</Button>

</HStack>


      <Button
        size="sm"
        bgColor={"teal"}
        onClick={() => handleModeChange(editable ? "view" : "edit")}
      >
        {editable ? "View" : "Edit"}
      </Button>
    </HStack>

    <RichTextEditor.Content
  minH="350px"
  flex="1"
  px={4}
  py={3}
  fontSize="md"
  sx={{
    overflowY: "auto",
    textAlign: "left",
    "& img": {
  maxWidth: "250px",
  display: "block",
  margin: "12px auto",
},
  }}
/>

  </RichTextEditor.Root>
)}



      <Button
  bgColor={"teal"}
  size="sm"
  alignSelf="flex-end"
  onClick={handleSave}
>
  Save Note
</Button>


      {/* TAG MODAL */}
      <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content p={5}>
              <Dialog.Header>
                <Dialog.Title>Add Tag</Dialog.Title>
              </Dialog.Header>

              <Dialog.Body>
                <Input
                  placeholder="Enter tag name"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                />
              </Dialog.Body>

              <Dialog.Footer>
                <Button variant="outline" mr={3} onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button colorScheme="blue" onClick={addTag}>
                  Add
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  );
};

export default NoteEditor;
