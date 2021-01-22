import { Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Paper, Typography } from '@material-ui/core'
import jikan from 'jikanjs'
import React, { useEffect, useState } from 'react'

const useStyles = makeStyles( (theme) => ({
    root: {
        margin: '20px',
        padding: '10px',
    },
    list: {
        width: '100%'
    },
    imgContainer: {
        marginRight: '9px'
    },
    img: {
        width: '120px',
        height: '180px'
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
        '&::-webkit-scrollbar':{
            display: 'none'
        },
        maxHeight: '120px',
        overflow: 'scroll',
        marginTop: '10px'
        // border: '1px solid grey'
    }
}))

function Upcoming() {
    const classes = useStyles()
    const [anime, setAnime] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect( () => {
        let unmount = false

        jikan.loadSeason(2021, 'spring')
        .then( res => {
            if(!unmount){
                let arr = []
                res.anime.map( (tv,index) => tv.type === "TV" ? arr.push(res.anime[index]) : '')
                setAnime(arr)
                setLoading(false)
            }
        })
        
        return () => unmount = true
    }, [])
    console.log(anime)

    return loading ? '' : (
        <Paper className={classes.root}>
            <List className={classes.list}>
                {anime.map( (i,index) => (
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
                ))}
            </List>
        </Paper>
    )
}

export default Upcoming