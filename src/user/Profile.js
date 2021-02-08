import { Avatar, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, makeStyles, MenuItem, Select, TextField, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'
import { EmptyBookmark } from './instructions/EmptyBookmark'
import BookmarkM from './mobile/BookmarkM'

const useStyles = makeStyles( () => ({
    root: {

    },
    avatar: {
        width: "100px",
        height: '100px'
    },
    username: {
        marginLeft: '5px',
        textTransform: 'capitalize'
    },
    useremail: {
        marginLeft: '7px',
        opacity: 0.8
    },
    note: {
        opacity: 0.7,
        marginTop: '10px',
        marginBottom: '10px'
    },
    reportlink: {
        opacity: 1
    },
    input: {
        display: 'none',
    },
}))

function Profile() {
    const classes = useStyles()
    const [user, setUser] = useState()
    const [bookmark, setBookmark] = useState()
    const [link, setLink] = useState({
        _id: localStorage.getItem('_id'),
        imgLink: ''
    })
    // const [profileImage, setProfileImage] = useState({
    //     _id: localStorage.getItem('_id'),
    //     imageP: ''
    // })

    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)

    useEffect( () => {
        let token = localStorage.getItem('token')
        var options = {
            method: 'GET',
            url: 'https://simplesenhaibookmark.herokuapp.com/bookmark',
            headers: {'content-type': 'application/json', authorization: `Bearer ${token}`}
          };

        axios.request(options)
        .then( res => {
            // console.log(res.data.user.bookmark)
            setUser(res.data.user)
            setBookmark(res.data.user.bookmark)
            setLoading(false)
        })
        .catch( err => console.log(err))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        // const fd = new FormData()
        // fd.append('profileImage',profileImage)
        axios.post('https://simplesenhaibookmark.herokuapp.com/changepicture', link)
        .then( res => {
            // console.log(res)
            // console.log(link)
            
            window.location.reload()
        })
        .catch( err => console.log(err))
    }
    const [sorter, setSorter] = useState('a-z')

    if(!loading) {
        if(sorter === 'z-a' ) {
            bookmark.sort((a, b) => (a.title > b.title) ? 1 : -1).reverse()
        }

        else if (sorter === 'status') {
            bookmark.sort((a, b) => (a.status > b.status) ? 1 : -1)
        } else {
            // bookmark.filter( a => a.status === "Ongoing")

            bookmark.sort((a, b) => (a.title > b.title) ? 1 : -1)
        }
        
    }

    const handleChange = (event) => {
        setSorter(event.target.value);
    };
    
    // const [image, setImage] = useState()

    // const imagePrev = e => {
    //     if(e.target.files[0]) {
    //         setImage(URL.createObjectURL(e.target.files[0])); 
    //         setProfileImage({
    //             ...profileImage,
    //             imageP: URL.createObjectURL(e.target.files[0])
    //         })
    //     }   
    //     console.log('change')
    //     // console.log()
    // }

    return loading ? <Loading /> : (
        <Container>
            <List className={classes.root} >
                <ListItem alignItems='flex-start' >
                    <ListItemAvatar>
                        <IconButton edge='start' style={{margin: 0, padding: 0}} onClick={() => setOpen(true)} >
                            <Avatar className={classes.avatar} src={user.profilepicture} />
                        </IconButton>
                    </ListItemAvatar>
                    <ListItemText 
                        primary={<Typography className={classes.username} variant='h6' >{user.username}</Typography>}
                        secondary={<Typography className={classes.useremail} variant='body2' >{user.email}</Typography>}
                    />
                </ListItem>
                <Typography align='left' className={classes.note} >
                    You can add a picture by clicking it :)
                </Typography>
                <Typography align='left' className={classes.note} >
                    If you got a bug or an error please report it immediately.
                </Typography>
                <Typography align='left' className={classes.note} >
                    You can file it here {<Button color='secondary' component={Link} to='/report' size='small' variant='contained' className={classes.reportlink} >report a bug</Button>}
                </Typography>
            </List>
            <Divider />
            <Box style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}} >
                <Typography variant='h5' align='left' >Bookmark</Typography>
                <Box style={{display: 'flex', alignItems: 'center'}} >
                    <Typography align='right' style={{marginRight: '5px'}} >Sort By </Typography>
                    <Select 
                        value={sorter} 
                        onChange={handleChange} 
                        
                    >
                        <MenuItem value='a-z' > A-Z</MenuItem>
                        <MenuItem value='z-a'> Z-A</MenuItem>
                        <MenuItem value='status'> Status</MenuItem>
                    </Select>
                </Box>
            </Box>

            {/* checking if the bookmark is empty then set an instructions on how to add a bookmark */}
            {user.bookmark.length === 0 ? <EmptyBookmark /> : <BookmarkM bookmark={bookmark} /> }

            {/* this section is only made for dialog */}
            <Dialog maxWidth='md' open={open} >
                <form onSubmit={submit} method="POST" >
                    <DialogTitle>Profile Picture</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Change your picture by pasting the link here 
                        </DialogContentText>
                        <TextField 
                            margin="dense"
                            name="imgLink"
                            label="Image Link"
                            fullWidth
                            autoComplete="false"
                            value={link.imgLink}
                            required
                            onChange={ (e) => setLink({...link, [e.target.name]: e.target.value})}
                        />

                        {/* <Avatar src={image} style={{width: 200, height: 200}} variant='square' />

                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" component="span">
                                Upload
                            </Button>
                        </label>
                        <input accept="image/*" className={classes.input} id="contained-button-file" type="file" onChange={imagePrev} /> */}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)} color='primary' >Cancel</Button>
                        <Button onClick={() => setOpen(false)} color='primary' type='submit' >Change</Button>
                    </DialogActions>
                </form>
            </Dialog>

        </Container>
    )
}

export default Profile