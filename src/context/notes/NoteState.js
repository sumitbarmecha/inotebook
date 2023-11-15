import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState = (props) => {
    const host  ="http://localhost:5000";
    const notesInitial = [] 
    const [notes, setNotes] = useState(notesInitial)
    // getalnotes 
const getNote= async () => {
    // localhost:5000/api/notes/fetchallnotes
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwZjVmYmViMjQ4MTE4YjUzZWQxNzI3In0sImlhdCI6MTY0NTI4Mjc2OH0.gBIjKxS9E9RayKgYKRZNpMRzS1gN3cXA3H6R7BNgBaA'},
       
      });
      const json = await response.json()    
  console.log(json)
  setNotes(json)
}
    // adding a note
    const addNote=async(title,description,tag)=>{
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwZjVmYmViMjQ4MTE4YjUzZWQxNzI3In0sImlhdCI6MTY0NTI4Mjc2OH0.gBIjKxS9E9RayKgYKRZNpMRzS1gN3cXA3H6R7BNgBaA'},
            body: JSON.stringify({title,description,tag}) 
        });
        const note = await response.json()
        setNotes(notes.concat(note))
    }
    // deleting a note
const deleteNote=async(id)=>{
    // localhost:5000/api/notes/deletenote/6213d642fd6d9c7ff1e56a88
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwZjVmYmViMjQ4MTE4YjUzZWQxNzI3In0sImlhdCI6MTY0NTI4Mjc2OH0.gBIjKxS9E9RayKgYKRZNpMRzS1gN3cXA3H6R7BNgBaA'},
           
          });
          const json = await response.json()
 console.log(json)
    
    console.log("note deleted" + id)
    const newnote = notes.filter((notes)=>{return notes._id!==id})
    setNotes(newnote);
}
    // editing a note
    const editNote=async(id,title,description,tag)=>{
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwZjVmYmViMjQ4MTE4YjUzZWQxNzI3In0sImlhdCI6MTY0NTI4Mjc2OH0.gBIjKxS9E9RayKgYKRZNpMRzS1gN3cXA3H6R7BNgBaA'},
            body: JSON.stringify({title,description,tag}) 
          });
          const json = await response.json(); 
          console.log(json)
          let newNote = JSON.parse(JSON.stringify(notes))
          for (let index = 0; index < notes.length; index++) {
              const element = newNote[index];
              if (element._id ===id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
                break;
              }
          }
          setNotes(newNote)
          

         
        }
    return (
        <NoteContext.Provider value={{ notes, addNote,deleteNote,editNote,getNote, }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;