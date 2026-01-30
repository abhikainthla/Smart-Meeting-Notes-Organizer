import { createContext, useContext, useState } from "react";

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all-notes");

  const addNote = (note) => {
    setNotes((prev) => [note, ...prev]);
  };

  const updateNote = (updatedNote) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === updatedNote.id ? updatedNote : n))
    );
  };

  const selectNote = (note) => setSelectedNote(note);
  const clearSelectedNote = () => setSelectedNote(null);

  return (
    <NotesContext.Provider
      value={{
        notes,
        selectedNote,
        activeCategory,
        setActiveCategory,
        addNote,
        updateNote,
        selectNote,
        clearSelectedNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);
