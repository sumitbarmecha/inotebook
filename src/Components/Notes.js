import React, { useContext, useState, useEffect } from 'react'
import noteContext from '../context/notes/NoteContext';
import AddNotes from './AddNotes';
import './form.css'
import NoteItem from './NoteItem';
const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNote,editNote } = (context); 
  useEffect(() => {
    getNote()
    // eslint-disable-next-line
  }, [])
 

  const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: "" })
  const onChange = (e) => {
    setNote({ ...note,[e.target.name]:e.target.value })
  }
  const updateNote = (currentNote) => {
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
  }
  const handleClick = (e) => {
    e.preventDefault();
    
    editNote(note.id, note.etitle, note.edescription, note.etag)
   setNote({id:"", etitle: "enter title", edescription: "enter description", etag: "enter tag" })
   
  }

  return (
    <>
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="bg-transparent border-0 modal-content">
            <div className="bg-transparent p-0 modal-body">
              <div className="screen">
                <div className="border-0 screen-header modal-header">
                  <div className="screen-header-left">
                    update your notes
                  </div>
                  <div className="screen-header-right">
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                </div>
                <div className="screen-body">
                  <div className="screen-body-item">
                    <div className="app-form">
                      <div className="app-form-group">
                        <input name='etitle' htmlFor="etitle" id="etitle" className="app-form-control" value={note.etitle} minLength={5} required onChange={onChange} />
                      </div>
                      <div className="app-form-group">
                        <input htmlFor="description" id='edescription' name='edescription' className="app-form-control" value={note.edescription} minLength={5} required onChange={onChange} />
                      </div>
                      <div className="app-form-group">
                        <input  className="app-form-control" name="etag" id='etag' value={note.etag} onChange={onChange} minLength={5} required />
                      </div>
                      <div className="app-form-group buttons">
                        <button type="button" className=" app-form-button" data-bs-dismiss="modal">CLOSE</button>
                        <button data-bs-dismiss="modal"    className="app-form-button" onClick={handleClick}>UPDATE NOTE</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddNotes />
      <div className='row justify-content-center'>
        {notes.length===0 && 'no notes to display'}
       {notes.map((note) => {
        return <NoteItem key={note._id} updateNote={updateNote} note={note} />
      
      })}
      </div>
    </>

  )
}

export default Notes