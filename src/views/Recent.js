import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, CardActionArea, CardContent, CardMedia, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import Loading from '../components/Loading'
import { watchEpisode } from '../redux/action'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
    root: {
        maxWidth: 300,
        maxHeight: 354
    },
    image: {
        maxWidth: 200,
        maxHeight: 'auto'
    },
    title: {
        padding: '40px'
    },
    decor: {
        textDecoration: 'none'
    }
})

function Recent() {
    const classes = useStyles()
    const [recent, setRecent] = useState([])
    const [loading, setLoading] = useState(false)
    const [anime, setAnime] = useState({episode: '', title: ''})

    const dispatch = useDispatch()

    // useEffect( () => {
    //     axios.get('https://www.mangahere.cc/manga/tensei_shitara_slime_datta_ken/c077')
    //     .then(res => {
    //         console.log(res.request.response)
    //         setRecent(res)
    //         setLoading(false)
    //     })
    //     .catch(res => {
    //         console.log(res)
    //     })
    // }, [])
//18003 slime id
//15241 nyaruko
    useEffect( () => {
        axios.get('https://mangahub.io/search')
        .then( res => {
            console.log(res.request.responseText)
            setRecent(res.request.response)
        })
    }, [])

    // console.log(recent)
  
    return loading ? <Loading /> : (
        <Paper elevation={0} square>
            <img src='https://zjcdn.mangahere.org/store/manga/15241/001.0/compressed/o001.jpg' alt='' />
{/* 
            <Typography variant='h4' className={classes.title}>Newest Episode</Typography>

            <Grid container spacing={3} align='center'>
                {recent.results.map( list => (
                    <Grid align='center' item xs={12} sm={4} key={list.id}>
                        <Link to={'/watch/'+list.id+'/'+list.episodenumber+''} className={classes.decor}>
                            <Card className={classes.root} >
                                <CardActionArea onClick={ () => dispatch(watchEpisode(list.episodenumber,list.id,list.title))}>
                                    <CardMedia 
                                        title={list.id}
                                        image={list.image}
                                        component='img'
                                        className={classes.image}
                                    />
                                    <CardContent className={classes.decor}>
                                        <Typography >{list.title}</Typography>
                                        <Typography >Episode: {list.episodenumber}</Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Link>
                    </Grid>
                ))}   
            </Grid> */}
        </Paper>
    )
}

export default Recent