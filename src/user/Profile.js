import { Avatar, Backdrop, Box, Button, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, makeStyles, MenuItem, Select, TextField, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Loading from '../components/Loading'
import { EmptyBookmark } from './instructions/EmptyBookmark'
import BookmarkM from './mobile/BookmarkM'

const useStyles = makeStyles( (theme) => ({
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
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))

function Profile() {
    const classes = useStyles()
    const [user, setUser] = useState()
    // console.log(user)
    // gets the user's bookmark from fetched data
    const [bookmark, setBookmark] = useState()

    // backdrop state
    const [load, setLoad] = useState(false)
    const [success, setSuccess] = useState(false)

    const history = useHistory()
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
            if(!res.data.loggedIn) {
                // redirect to login if token is null
                // clean up localstorage if logged in is false
                localStorage.removeItem('token')
                localStorage.removeItem('_id')
                history.push("/login") 
            }
            setUser(res.data.user)
            setBookmark(res.data.user.bookmark)
            setLoading(false)
        })
        .catch( err => console.log(err))
    }, [])

    // user profile image upload to cloudinary
    const [image, setImage] = useState()
    const [imgFile, setImgFile] = useState(null)
    const [imgName, setImgName] = useState('')
    const [onUpload, setOnUpload] = useState(false)
    const [progress, setProgress] = useState(0)
    const _id = localStorage.getItem("_id")

    const cloudinaryUrl = "https://api.cloudinary.com/v1_1/senhai/image/upload"
    const uploadPreset = "senhai"
    const config = {
        headers: { "X-Requested-With": "XMLHttpRequest" },
        onUploadProgress: progressEvent => {
            console.log("Upload Progress: " + Math.round(progressEvent.loaded / progressEvent.total * 100) + "%")
            setProgress(Math.round(progressEvent.loaded / progressEvent.total * 100))
        }
    };

    const previewImage = ({ target }) => {
        const img = URL.createObjectURL(target.files[0])
        setImage(img)
        setImgName(target.files[0].name)
        setImgFile(target.files[0])
        // console.log(target.files[0])
    }
    
    // save the secure link on db
    const uploadImage = async () => {
        setOpen(false)
        setLoad(true)
        console.log(imgName)
        const fd = new FormData();
        fd.append('file', imgFile, imgName)
        // generate folder based on username at cloudinary
        fd.append('folder', `User/${user.username}`)
        fd.append('upload_preset', uploadPreset)

        await axios.post(cloudinaryUrl, fd, config)
        .then( res => {
            // console.log(res.data.url)
            let url = res.data.url
            saveUrl(url)
        })
    }
    const submit = async (e) => {
        e.preventDefault()
        await uploadImage()
    }
    const saveUrl = (imgUrl) => {
        const save = {
            _id: _id,
            imgLink: imgUrl
        }
        console.log({ save: save })
        axios.post('https://simplesenhaibookmark.herokuapp.com/changepicture', save)
        .then( res => {
            console.log(res)
            window.location.reload()
        })
        .catch( err => console.log(err))
        setLoad(false)
    }

    //this handles the alert from snackbar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccess(false);
    };

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
            </Box>

            {/* checking if the bookmark is empty then set an instructions on how to add a bookmark */}
            {user.bookmark.length === 0 ? <EmptyBookmark /> : <BookmarkM bookmark={bookmark} /> }

            {/* this section is only made for dialog */}
            <Dialog maxWidth='sm' open={open} >
                <form onSubmit={submit} method="POST" >
                    <DialogTitle>Profile Picture</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <Typography>
                                Upload limit size: 10mb
                            </Typography>
                            <Typography>
                                Available file format ( jpg/jpeg, png, jfif, gif )
                            </Typography>
                        </DialogContentText>

                        <Box style={{width: '100%', height: 300}} >
                            <label htmlFor="contained-button-file" >
                                <Avatar src={image} style={{width: '100%', height: "100%", objectFit: 'cover', borderRadius: 10}}  variant='square' />
                            </label>

                            <input onChange={previewImage} accept="image/*" className={classes.input} id="contained-button-file" type="file" /> 
                        </Box>

                        {/* <Button onClick={uploadImage} variant="contained" color="primary" component="span">
                            Upload
                        </Button> */}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)} variant='outlined' color='default' >Cancel</Button>
                        <Button onClick={() => setOpen(false)} variant='contained' color='primary' type='submit' >Upload</Button>
                    </DialogActions>
                </form>
            </Dialog>

            <Backdrop className={classes.backdrop} open={load}>
                <CircularProgress color="inherit" />
                <Typography>Uploading: {progress}%</Typography>
            </Backdrop>
            
            {/* <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" elevation={6} variant="filled" >
                    Log In Success
                </Alert>
            </Snackbar> */}

        </Container>
    )
}

export default Profile
