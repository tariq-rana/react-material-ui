import {format} from 'date-fns';
import { makeStyles } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";

import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

import { SubjectOutlined, AddCircleOutlineOutlined } from "@material-ui/icons";
import { useHistory, useLocation } from "react-router";


const drawerWidth = 240;
const useStyles = makeStyles((theme) => {
    return {
        root:{
            display: 'flex',
            padding: theme.spacing(3)
        },
        page:{
            background: '#f9f9f9f9',
            width: '100%'
        },
        drawer:{
            width: drawerWidth
        },
        drawerPaper:{
            width: drawerWidth
        },
        active:{
            background:'#f4f4f4'
        },
        title:{
            padding: theme.spacing(3)
        },
        appbar:{
            width: `calc(100% - ${drawerWidth}px)`
        },

        toolbar: theme.mixins.toolbar,
        date: {
            flexGrow: 1
        },
        avatar:{
            marginLeft: theme.spacing(2)
        }
    }
});

const Layout = ({children}) =>{
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    const menuItems = [
        {
            text: 'My Notes', 
            icon: <SubjectOutlined color="secondary" />, 
            path: '/'
        },
        {
            text: 'Create Notes', 
            icon: <AddCircleOutlineOutlined color="secondary" />, 
            path: '/create'
        }
    ];

    return(
        <div className={classes.root}>
            <AppBar className={classes.appbar} elevation={0}> 
                <ToolBar>
                    <Typography className={classes.date}>
                        Today is {format(new Date(),'do MMMM Y')}
                    </Typography>
                    <Typography>
                        Mario
                    </Typography>
                    <Avatar src="" className={classes.avatar} />
                </ToolBar>
            </AppBar>

            <Drawer
                variant="permanent"
                anchor="left"
                className = {classes.drawer}
                classes={{ paper: classes.drawerPaper}}
            >
                <div>
                    <Typography
                        variant="h5"
                        className={classes.title}
                    >
                        Ninja notes
                    </Typography>
                </div>
                <List>
                    {
                        menuItems.map(item => 
                            (

                                <ListItem 
                                    button
                                    key={item.text}
                                    onClick={() => history.push(item.path)}
                                    className = {location.pathname === item.path ? classes.active:null}
                                >
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItem>
                            )
                        )
                    }
                </List>
            </Drawer>

            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                    {children}
            </div>
        </div>    
    )
}

export default Layout;