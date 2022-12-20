import React, { Component } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';

import Avatar from '@mui/material/Avatar';

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LabelIcon from '@mui/icons-material/Label';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

import { alpha, withStyles } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Link } from '@mui/material';

const styles = theme => ({
    root: {
        flexGrow: 1,
        position: 'sticky',
        top: 0,
        zIndex: 999
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    profileMe: {
        padding: theme.spacing(2),
        textAlign: "center"
    },
    avatarMe: {
        marginRight: "auto",
        marginLeft: "auto",
        marginBottom: theme.spacing(1),
        width: "120px",
        height: "120px"
    },
    list: {
        width: 250
    },
    listParent: {
        width: "100%"
    },
    ListItem: {
        paddingLeft: theme.spacing(4)
    },
})

const Accordion = withStyles({
    root: {
        boxShadow: 'none',
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion)

const AccordionSummary = withStyles(theme => ({
    root: {
        padding: theme.spacing(0, 2),
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
}))(MuiAccordionSummary)

const AccordionDetails = withStyles(theme => ({
    root: {
        padding: theme.spacing(0),
    },
}))(MuiAccordionDetails)

class NavBar extends Component {
    state = {
        isDrawerOpen: false,
        expandTags: true
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Container maxWidth="lg">
                        <Toolbar>
                            <IconButton
                                edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="Open Drawer"
                                onClick={() => {
                                    this.setState({ isDrawerOpen: true })
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography className={classes.title} variant="h6" noWrap>React Blogger</Typography>
                            <form className={classes.search} action="/search/">
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                    name="q"
                                />
                            </form>
                        </Toolbar>
                    </Container>
                </AppBar>
                <Drawer
                    open={Boolean(this.state.isDrawerOpen)}
                    onClose={() => {
                        this.setState({ isDrawerOpen: false })
                    }}
                >
                    <div
                        className={classes.list}
                        role="presentation"
                    >
                        <div className={classes.drawerHeader}>
                            <IconButton onClick={() => {
                                this.setState({ isDrawerOpen: false })
                            }}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </div>
                        <Divider />
                        <Box className={classes.profileMe} component="div">
                            <Avatar alt="Volkan Kaban" src="//avatars0.githubusercontent.com/u/12288837?v=4" className={classes.avatarMe} />
                            <Typography variant="h5" component="h1" gutterBottom>Volkan Kaban</Typography>
                            <Typography variant="caption" gutterBottom>Contact me</Typography>
                        </Box>
                        <Divider />
                        <Accordion square expanded={this.state.expandTags} onChange={() => {
                            this.setState(prefState => {
                                return { expandTags: !prefState.expandTags }
                            })
                        }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="tags-content"
                                id="tags-header"
                            >

                                <Typography >Labels</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <List className={classes.listParent}>
                                    {this.props.label.sort((a, b) => (a.term > b.term) ? 1 : ((b.term > a.term) ? -1 : 0)).map((arr, i) => (
                                        <Link color="inherit"
                                            underline="none"
                                            href={"/search/label/" + arr.term}
                                            component="a"
                                            key={i}
                                        >
                                            <ListItem button className={classes.ListItem}>
                                                <ListItemIcon><LabelIcon /></ListItemIcon>
                                                <ListItemText primary={arr.term} />
                                            </ListItem>
                                        </Link>
                                    ))}
                                </List>
                            </AccordionDetails>
                        </Accordion>
                        <Divider />
                    </div>
                </Drawer>
            </div >
        )
    }
}

export default withStyles(styles)(NavBar)