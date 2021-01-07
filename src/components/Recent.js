import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, CardActionArea, CardContent, CardMedia, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import Loading from './Loading'
import { watchEpisode } from '../redux/action'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
// import Mangadex from 'mangadex-api'

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
    
    // Mangadex.getHome().then( home => console.log(home))

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
//https://mangadex.org/api/manga/28792
    useEffect( () => {
        axios.get('https://animeflix.io/api/episodes/latest?limit=20')
        .then( res => {
            // const dom = new DOMParser()
            // let a = dom.parseFromString(res.data, 'text/html')
            // console.log(dom.parseFromString(res.data, 'text/html'))
            console.log(res)
            setRecent(res.request.response)
        })
    //     fetch("https://mangadex.herokuapp.com/graphql")
    //   .then(data => {
    //     console.log(data)
    //   })
    }, [])

    // Mangadex.getHome()

  
    return loading ? <Loading /> : (
        <Paper elevation={0} square>
            <img src='https://zjcdn.mangahere.org/store/manga/15241/001.0/compressed/o001.jpg' alt='' />
            <video src='https://storage.googleapis.com/auengine.appspot.com/2205/dub/11_39715.mp4' controls />
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