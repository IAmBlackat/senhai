import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Loading from '../components/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { checkDetails, watchEpisode } from '../redux/action'
import { Link, useHistory, useLocation } from 'react-router-dom'
import NoneFound from '../components/NoneFound';

const useStyles = makeStyles({
    root: {
        maxWidth: 200,
        maxHeight: 500,
        boxShadow: '5px 5px 25px #212121'
    },
    image: {
        maxWidth: 200,
        maxHeight: 'auto',
    },
    title: {
        padding: '30px',
    },
    decor: {
        textDecoration: 'none',
        color: 'white'
    },
    paper: {
        // backgroundColor: '#616161'
        padding: '20px',
        margin: ' 20px',
        boxShadow: '5px 5px 25px rgba(0,0,0,1)'
    },
    ptitle: {
        paddingBottom: '10px'
    },
    box: {
        textAlign: 'right',
        padding: '20px',
        marginTop: '10px',
        // width: 'auto'
    },
    btn: {
        marginRight: '10px',
        padding: '10px'
    }
})

function Container( {page}) {
    const classes = useStyles()
    const [lists, setLists] = useState([])
    const [loading, setLoading] = useState(true)
    const [imgLoad, setImgLoad] = useState(true)
    const [pageUrl, setPageUrl] = useState(1)

    const location = useLocation()
    const history = useHistory()
    
    const state = useSelector( state => state)
    const dispatch = useDispatch()  
    
    const rootUrl = 'https://anime-x.vercel.app/api'
    const getPage = page === 'search' ? 
        '/' + page + '/' + state.search + '/' + 1 
        : 
        '/' + page + '/' + pageUrl 

    const url = rootUrl + getPage

    useEffect( () => {
        state.loading === undefined ? setLoading(true) : setLoading(state.loading)

        setImgLoad(true)
        axios.get(url)
        .then( res => {
            // console.log(res)
            setLists(res.data)
            setLoading(false)
        })
        .catch(err => {
            if(err.response.status >= 400) history.push('/error')
        })
    }, [url, history, state.loading])

    // console.log(location.pathname.split('/')[2])

    const Pages = () => {
        let id = location.pathname.split('/')[2]
        return(
            <>
            {location.pathname === '/search/' + id ? '' :
                <Box className={classes.box}>
                    <Button variant='outlined' className={classes.btn} onClick={ () => setPageUrl(pageUrl - 1 )} disabled={pageUrl === 1 ? true : false}>
                        <NavigateBeforeIcon /> Previous
                    </Button>

                    <b className={classes.btn}>
                    {pageUrl}
                    </b>

                    <Button variant='outlined' className={classes.btn} onClick={ () => setPageUrl(pageUrl + 1 )}>
                        Next <NavigateNextIcon /> 
                    </Button>
                </Box>
            }
            </>
        )
    }

    return loading ? <Loading /> : (
        <Paper elevation={2} square className={classes.ptitle}>
            <Box>
            {page === 'search' ? 
                <Typography variant='h4' className={classes.title}>
                    Results for ' {state.search} '
                </Typography>
                :             
                <Typography variant='h4' className={classes.title}>
                    {page === 'popular' ? "Popular" : "Newest Episode"}   
                </Typography>
            }
            </Box>
            <Paper elevation={1} variant='outlined' className={classes.paper}>

            <Pages />
            
            <Grid container spacing={3} align='center'>
                {lists.results.length === 0 ? <NoneFound /> : ''}

                {lists.results.map( list => (
                    <Grid item xs={6} sm={3} key={list.id}>
                        <Card className={classes.root} >
                            <Link to={page === 'recentlyadded' ? '/watching/'+list.id+'/'+list.episodenumber+'' : '/details/'+list.id+'/' } className={classes.decor}>
                                <CardActionArea onClick={ () => page === 'recentlyadded' ? dispatch(watchEpisode(list.episodenumber,list.id,list.title)) : dispatch(checkDetails(list.id)) }>
                                    <CardMedia 
                                        title={list.id}
                                        image={imgLoad ? 'https://thumbs.gfycat.com/ShadowyCourageousAztecant-size_restricted.gif' : list.image}
                                        component='img'
                                        className={classes.image}
                                        onLoad={ () => setImgLoad(false)}
                                    />
                                    <CardContent>
                                        <Typography>{list.title}</Typography>
                                        {page === 'recentlyadded' ? <Typography >Episode: {list.episodenumber}</Typography> : ''}
                                    </CardContent>
                                </CardActionArea>
                            </Link>
                        </Card>
                    </Grid>
                ))}   
            </Grid>

            <Pages />

            </Paper>
         
        </Paper>
    )
}

export default Container