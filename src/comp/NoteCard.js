import { makeStyles } from "@material-ui/core";
import { yellow, green, pink, blue } from '@material-ui/core/colors';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar';

import { DeleteOutlined } from '@material-ui/icons';

const useStyles = makeStyles({
    test: {
            border: (note) => {
                if(note.category === 'work'){
                    return '1px solid red';
                }
            }
    },
    avatar:{
        backgroundColor: (note) => {
            if(note.category === 'work'){
                return yellow[700];
            }

            if(note.category === 'money'){
                return green[500];
            }

            if(note.category === 'todos'){
                return pink[500];
            }

            return blue[500];

        }
    }
});

const NoteCard = ({note, handleDelete}) =>{
    const classes = useStyles(note);
    return(
        <Card>
            <CardHeader
                avatar={
                    <Avatar className={classes.avatar}>{note.category[0].toUpperCase()}</Avatar>
                }
                action={
                    <IconButton onClick={() => handleDelete(note.id)}>
                        <DeleteOutlined/>
                    </IconButton>
                }
                title={note.title}
                subheader={note.category}
            />
            <CardContent>
                <Typography
                    variant="body2"
                    color="textSecondary"
                >
                    {note.details}
                </Typography>
            </CardContent>
        </Card>
    )
}
export default NoteCard;