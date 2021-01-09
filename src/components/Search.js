import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardActionArea, CardContent, CardMedia, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import { checkDetails } from '../redux/action'
import Loading from './Loading'
import { Link, useLocation } from 'react-router-dom'

//https://anime-x.vercel.app/api/search/kuma-kuma-kuma-bear/1

const useStyle = makeStyles({
    root: {
       
    },
    image: {
        maxWidth: 200,
        maxHeight: 'auto'
    },
    title: {
        padding: '40px'
    },
    decor: {
        textDecoration: 'none',
        color: 'white'
    },
    card: {
        maxWidth: 300,
        maxHeight: 354
    }
})
function Search() {
    const classes = useStyle()
    const [search, setSearch] = useState()
    const [loading, setLoading] = useState(true)
    const query = useSelector( state => state.search)
    const dispatch = useDispatch()

    const location = useLocation()
    console.log(location.pathname)

    const rootUrl = 'https://anime-x.vercel.app/api/search/'
    const url = rootUrl + query + '/' + 1

    useEffect( () => {
        axios.get(url)
        .then( res => {
            console.log(res)
            setSearch(res.data)
            setLoading(false)
        })
        .catch(err => console.log(err))
    }, [url])

    console.log(search)

    return loading ? <Loading /> : (
        <Paper square className={classes.root}>
            <Grid container spacing={2} align='center'>
                {search.results.map( list => (
                    <Grid  item xs={12} sm={3} key={list.id}>
                        {/* <Link to={'/details/'+list.id+'/'} className={classes.decor}> */}
                            <Card className={classes.card} >
                            <Link to={'/details/'+list.id+'/'} className={classes.decor}>
                                <CardActionArea onClick={ () => dispatch(checkDetails(list.id))}>
                                    <CardMedia 
                                        title={list.id}
                                        image={list.image}
                                        component='img'
                                        className={classes.image}
                                    />
                                    <CardContent>
                                        <Typography>{list.title}</Typography>
                                    </CardContent>
                                </CardActionArea>
                                </Link>
                            </Card>
                        {/* </Link> */}
                    </Grid>
                ))}   
            </Grid>
        </Paper>
    )
}

export default Search