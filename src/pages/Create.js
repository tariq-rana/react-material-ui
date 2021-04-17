import {useState} from 'react';
import {useHistory} from 'react-router-dom';

import { makeStyles, FormControlLabel } from  "@material-ui/core";
import Typography  from "@material-ui/core/Typography";
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";


const useStyles = makeStyles({
    field:{
        marginTop:20,
        marginBottom:20,
        display: 'block'
    }
});

const Create = () =>{
    const classes = useStyles();
    const history = useHistory();

    const [note, setNote] = useState({
        title:'',
        titleError:false,
        details:'',
        detailsError:false,
        category: 'todos'
    
    });

    const resetError =  () =>{
        setNote({
            titleError: false,
            detailsError:  false
        });

    }

    const handleNote = (e) =>{
        resetError();
        setNote({
                ...note,
                [e.target.name]: e.target.value
        });
    }

     const handleSubmit =  (e) =>{
         e.preventDefault();
          resetError();
            setNote({
                ...note,
                titleError: note.title === '' ? true : false,
                detailsError: note.details === '' ? true : false
            });
        
         if(note.title && note.details){
            const body  =  JSON.stringify({
                title: note.title,
                details: note.details,
                category: note.category   
           })

            fetch('http://localhost:8000/notes',{
                method: 'POST',
                headers: {"Content-type":"application/json"},
                body: body
            }).then(() => history.push('/'));
        }

     }

    return(
        <Container>
            <Typography 
                variant="h6" 
                component="h2"
                gutterBottom
                color="textSecondary"
                >
                    Create a new note
            </Typography>
 
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField 
                name="title"
                onChange={(e) => handleNote(e) }
                label="Note title" 
                variant="outlined"
                className = {classes.field}
                required
                fullWidth
                error={note.titleError}
                />
                
                <TextField 
                name="details"
                onChange={(e) => handleNote(e)}
                label="Details" 
                variant="outlined"
                className = {classes.field}
                required
                multiline
                rows={4}
                fullWidth
                error={note.detailsError}
                 />

                <FormControl className={classes.field}>
                <FormLabel>Note Category</FormLabel>
                    <RadioGroup value={note.category} name="category" onClick={(e) => handleNote(e)}>
                        <FormControlLabel value="money" control={<Radio/>} label="Money" />
                        <FormControlLabel value="todos" control={<Radio/>} label="Todos" />
                        <FormControlLabel value="reminders" control={<Radio/>} label="Reminders" />
                        <FormControlLabel value="work" control={<Radio/>} label="Work" />
                    </RadioGroup>
                </FormControl>
                

                <Button type="submit"
                    variant="contained" 
                    color="secondary"
                    endIcon={<ArrowForwardIosOutlinedIcon/>}
                >
                    Submit
                </Button>
            </form>
        </Container>
    )   
}

export default Create;