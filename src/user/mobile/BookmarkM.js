import { Avatar, Box, Button, Divider, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const useStyles = makeStyles( () => ({
    root: {

    },
    avatar: {
        width: 100,
        height: 140
    },
    textContainer :{
        marginLeft: '10px'
    },
    link: {
        textDecoration: 'none',
        color: 'whitesmoke',
        '&:hover': {
            textDecoration: 'underline'
        }
    }
}))

function BookmarkM({ bookmark }) {
    const classes = useStyles()
    const [deleteBookmark, setDeleteBookmark] = useState({
        _id: localStorage.getItem('_id'),
        title: ''
    })

    const submit = (e) => {
        e.preventDefault()
        axios.post('https://simplesenhaibookmark.herokuapp.com/bookmark', deleteBookmark)
        .then( res => {
            console.log(res)
            window.location.reload()
        })
        .catch( err => console.log(err))
    }

    return (
        <form method="POST" onSubmit={submit} >
            <List>
                {bookmark.map( (anime, index) => (
                    <Box key={index} >
                    <ListItem alignItems='flex-start'  >
                        <ListItemAvatar>
                            <Avatar component={Link} to={`/details/${anime.animeid}`} className={classes.avatar} variant='rounded' alt='' src={anime.image} />
                        </ListItemAvatar>
                        <ListItemText 
                            primary={<Typography component={Link} to={`/details/${anime.animeid}`} className={classes.link} >{anime.title}</Typography>}
                            secondary={
                                <Box component='span' >
                                    <Typography variant='body2' >{anime.season}</Typography>
                                    <Typography variant='body2' >{anime.status} </Typography>
                                    <Typography variant='body2' >Genre: {anime.genres}</Typography>
                                    <Button variant='contained' size='small' color='secondary' type='submit' onClick={() => setDeleteBookmark({...deleteBookmark, title: anime.title})} >delete</Button>
                                </Box>
                            }
                            className={classes.textContainer}
                        />
                    </ListItem>
                    <Divider />
                    </Box>
                ) )}
            </List>
        </form>
    )
}

export default BookmarkM