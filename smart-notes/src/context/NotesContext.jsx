import { createContext, useContext, useState } from "react";

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all-notes");
  const [searchQuery, setSearchQuery] = useState("");

  const addNote = (note) => {
    setNotes((prev) => [note, ...prev]);
  };

  const updateNote = (updatedNote) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === updatedNote.id ? updatedNote : n))
    );
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
    setSelectedNote(null);
  };

  const selectNote = (note) => setSelectedNote(note);
  const clearSelectedNote = () => setSelectedNote(null);

  return (
    <NotesContext.Provider
      value={{
        notes,
        selectedNote,
        activeCategory,
        searchQuery,
        setSearchQuery,
        setActiveCategory,
        addNote,
        updateNote,
        deleteNote,
        selectNote,
        clearSelectedNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);
