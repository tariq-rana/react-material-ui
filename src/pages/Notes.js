import {useEffect, useState} from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import NoteCard from '../comp/NoteCard';

const Notes = () =>{
    const [notes, setNotes] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:8000/notes')
        .then(res => res.json())
        .then(data => setNotes(data));
    },[])

    const handleDelete = ((id) =>{
        fetch(`http://localhost:8000/notes/${id}`,{
            method: 'DELETE'
        })
        
        const newNotes = notes.filter(note => note.id !== id);
        setNotes(newNotes);
        
    });

    return(
        <Container>
            <Grid container spacing={3}>
            {
                notes.map(note => 
                    <Grid item xs={12} sm={6} md={3}  key={note.id}>
                        <NoteCard note={note} handleDelete={handleDelete}/>
                    </Grid>
                )
            }
            </Grid>
        </Container>

    )
}
export default Notes;