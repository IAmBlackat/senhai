import { Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Paper, Typography } from '@material-ui/core'
import axios from 'axios'
// import jikan from 'jikanjs'
import React, { useEffect, useState } from 'react'
import { UpcomingSkeleton } from './UpcomingSkeleton'

const useStyles = makeStyles( (theme) => ({
    root: {
        margin: '20px',
        padding: '10px',
        height: '2345px',
    },
    box: {
        margin: '10px',
        overflowY: 'scroll',
        height: '100%',
        '&::-webkit-scrollbar': {
            width: '0.5em'
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.2)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.5)'
        },  
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#828687',
            borderRadius: '5px'
        },
        '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#bdbdbd'
        },
          
    },
    list: {
        width: '100%',
        margin: 0,
        padding: 0,
        position: 'relative'
    },
    imgContainer: {
        marginRight: '9px'
    },
    img: {
        width: '100px',
        height: '140px'
    },
    titleContainer: {
        width: '100%',
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    },
    title:{

    },
    genreContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        
    },
    genre: {
        marginRight: '5px',

    },
    synopsisContainer:{
        '&:hover': {
            overflowY: 'scroll',
        },
        '&::-webkit-scrollbar': {
            width: '0.3em',
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.2)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.5)'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#bdbdbd',
            borderRadius: '5px'
        },
        maxHeight: '90px',
        overflowY: 'hidden',
        marginTop: '10px',
        // border: '1px solid grey'
    }
}))

function Upcoming() {
    const classes = useStyles()
    const [anime, setAnime] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect( () => {
        let unmount = false

        // jikan.loadSeason(2021, 'spring')
        axios.get('https://api.jikan.moe/v3/season/2021/fall')
        .then( res => {
            if(!unmount){
                let arr = []
                res.data.anime.map( (tv,index) => tv.type === "TV" ? arr.push(res.data.anime[index]) : '')
                setAnime(arr)
                setLoading(false)
                // console.log(res.data.anime)
            }
        })
        
        return () => unmount = true
    }, [])
    
    let a = [1,2,3,4,5,6,7,8,9,10,11,12]

    return (
        <Paper className={classes.root}>
            <Box className={classes.box}>
                <List className={classes.list} >
                    {loading ? a.map( (i,index) => <UpcomingSkeleton classes={classes} key={index} />) : 
                    anime.map( (i,index) => (
                        <Box key={index}>
                            <ListItem key={index} alignItems='flex-start'>
                                <ListItemAvatar className={classes.imgContainer}>
                                    <Avatar variant='square' alt={i.title} src={i.image_url} className={classes.img} />
                                </ListItemAvatar>
                                <ListItemText 
                                    primary={
                                        <Box className={classes.titleContainer}>
                                            <Typography noWrap component='span' className={classes.title} >{i.title}</Typography>
                                        </Box>
                                    }
                                    secondary={
                                        <Box key={index} component='span'>
                                            <Box component='span' className={classes.genreContainer}>         
                                                <Typography variant='body2' component='span' className={classes.genre}>
                                                    Genre:  
                                                </Typography>                          
                                                {i.genres.map( (genre,index) => (
                                                    <Typography key={index} variant='body2' component='span' className={classes.genre} >  
                                                        {genre.name}
                                                    </Typography>
                                                ))}
                                            </Box>
                                            <Box className={classes.synopsisContainer} >
                                                <Typography component='span' className={classes.synopsis}>
                                                    {i.synopsis}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    }
                                />
                            </ListItem>
                            <Divider />
                        </Box>
                    ))
                    }
                    {/* {anime.map( (i,index) => (
                        <Box key={index}>
                            <ListItem key={index} alignItems='flex-start'>
                                <ListItemAvatar className={classes.imgContainer}>
                                    <Avatar variant='square' alt={i.title} src={i.image_url} className={classes.img} />
                                </ListItemAvatar>
                                <ListItemText 
                                    primary={
                                        <Box className={classes.titleContainer}>
                                            <Typography noWrap component='span' className={classes.title} >{i.title}</Typography>
                                        </Box>
                                    }
                                    secondary={
                                        <Box key={index} component='span'>
                                            <Box component='span' className={classes.genreContainer}>         
                                                <Typography variant='body2' component='span' className={classes.genre}>
                                                    Genre:  
                                                </Typography>                          
                                                {i.genres.map( (genre,index) => (
                                                    <Typography key={index} variant='body2' component='span' className={classes.genre} >  
                                                        {genre.name}
                                                    </Typography>
                                                ))}
                                            </Box>
                                            <Box className={classes.synopsisContainer} >
                                                <Typography component='span' className={classes.synopsis}>
                                                    {i.synopsis}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    }
                                />
                            </ListItem>
                            <Divider />
                        </Box>
                    ))} */}
                </List>
            </Box>
        </Paper>
    )
}

export default Upcoming