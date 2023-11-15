import React,{useContext,useState} from 'react'
import noteContext from '../context/notes/NoteContext'; 

const AddNotes = () => {
    const context = useContext(noteContext);
    const {addNote} = (context);
    const [note, setNote] = useState({title:"", description:"",tag:""})
    const handleClick = (e)=>{
        e.preventDefault();
addNote(note.title , note.description,note.tag);
setNote({id:"", title: "", description: "", tag: "" })
    }
    const onChange =(e)=>{ setNote({...note, [e.target.name]:e.target.value})}
    return ( 
        <div className='pt-5'>
            <div className="background">                                                               
                <div className="container ">
                    <div className="screen">
                        <div className="screen-header">
                            <div className="screen-header-left">
                                <div className="screen-header-button close"></div>
                                <div className="screen-header-button maximize"></div>
                                <div className="screen-header-button minimize"></div>
                            </div>
                            <div className="screen-header-right">
                                <div className="screen-header-ellipsis"></div>
                                <div className="screen-header-ellipsis"></div>
                                <div className="screen-header-ellipsis"></div>
                            </div>
                        </div>
                        <div className="screen-body">
                            <div className="screen-body-item left">
                                <div className="app-title">
                                    <span>ADD  </span>
                                    <span>NOTES</span>
                                </div>
                                <div className="app-contact">if any problem in sign in please contact to the devloper</div>
                            </div>
                            <div className="screen-body-item">
                                <div className="app-form">
                                    <div className="app-form-group">
                                        <input name='title' type="text" value={note.title} htmlFor="title" onChange={onChange} id="title" className="app-form-control" minLength={5} required  placeholder="TITLE" />
                                    </div>
                                    <div className="app-form-group">
                                        <input htmlFor="description" value={note.description} onChange={onChange}  type="text" id='description' name='description' minLength={5} required className="app-form-control" placeholder="DESCRIPTION" />
                                    </div>
                                    <div className="app-form-group">
                                        <input onChange={onChange} className="app-form-control" value={note.tag} name="tag" type="text" id='tag' minLength={5} required placeholder="PLACE YOUR TAG HERE" />
                                    </div>

                                    <div className="app-form-group buttons">
                                       
                                        <button  disabled={note.title.length<5||note.description.length<5} onClick={handleClick} className="app-form-button">ADD NOTE</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>



          
        </div>
    )
}

export default AddNotes