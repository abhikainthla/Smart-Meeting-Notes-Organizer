# 📝 Notes App

A modern and feature-rich **Notes Website** built with **React**, **Chakra UI**, and **TipTap**.  
This app allows users to create, edit, organize, and manage notes efficiently with rich text support.

---
## 🌐 Live Demo

👉 **Hosted Link:**  
https://smart-meeting-notes-organizer.vercel.app/


## 🚀 Features

- ✍️ **Rich Text Editor**
  - Bold, Italic, Headings, Lists
  - Text Highlighting
  - Image upload support
  - Undo / Redo
- 🗂 **Categories**
  - Work, Ideas, Learning, Personal, Fix Later
- 🏷 **Tags Management**
  - Add & remove tags per note
- 🔍 **Search Notes**
  - Quickly find notes by title/content
- 📝 **Edit & View Mode**
  - Toggle between read-only and editable modes
- 🗑 **Delete Notes with Confirmation**
  - Warning dialog before deleting
- 🔔 **Toast Notifications**
  - Success & warning messages
- 🎨 **Modern UI**
  - Clean, responsive design using Chakra UI

---

## 🛠 Tech Stack

### Frontend
- **React.js**
- **Chakra UI**
- **TipTap Editor**
- **React Icons**

### State Management
- React Context API

---

## 📂 Project Structure

src/
│── components/
│ ├── NoteEditor.jsx
│ ├── AllNotesHeader.jsx
│ ├── SearchInput.jsx
| │── NotesList.jsx
| │──Sidebar.jsx
| │──Topbar.jsx
| │──CreateNoteButton.jsx
| │──CategoryFilter.jsx
│── pages/
| │──NotesLayout.jsx
│── context/
│ └── NotesContext.jsx
│
│── ui/
│ ├── rich-text-editor.jsx
│ └── toaster.jsx
│
│── App.jsx
│── main.jsx

## 🧠 How It Works

- Notes are stored in a centralized **Notes Context**
- Each note contains:
  - `id`
  - `title`
  - `category`
  - `tags`
  - `content (HTML)`
  - `images`
  - `createdAt`
- TipTap handles rich text editing and formatting
- Chakra UI handles layout, dialogs, and accessibility


## 📸 Image
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/f157f0da-fd60-46d0-a35f-9703e3865991" />

---

## ⚙️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/abhikainthla/Smart-Meeting-Notes-Organizer.git

# Go to project directory
cd smart-notes

# Install dependencies
npm install

# Start development server
npm run dev
