import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Loading from '../components/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { checkDetails, watchEpisode } from '../redux/action'
import { Link, useHistory, useLocation } from 'react-router-dom'
import NoneFound from '../components/NoneFound'

const useStyles = makeStyles( (theme) => ({
    root: {
        maxWidth: 200,
        maxHeight: 500,
        boxShadow: '5px 5px 25px #212121'
    },
    image: {
        maxWidth: 300,
        height: 'auto',
        [theme.breakpoints.down('sm')]: {
            height: 195
        }
    },
    title: {
        padding: '30px 30px 10px',
        marginLeft: '10px',
        [theme.breakpoints.down('sm')]: {
            paddingBottom: '40px'
        }
    },
    decor: {
        textDecoration: 'none',
        color: 'white'
    },
    paper: {
        // backgroundColor: '#212121',
        padding: '10px',
        [theme.breakpoints.up('sm')]: {
            margin: ' 20px',
        },

        boxShadow: '5px 5px 25px rgba(0,0,0,0.2)'

    },
    ptitle: {
        paddingBottom: '10px',
        backgroundColor: '#121212'
    },
    box: {
        textAlign: 'right',
        padding: '20px',
        marginTop: '10px',
        [theme.breakpoints.down('sm')]: {
            width: 'auto',
            paddingBottom: '20px',
            paddingTop: '20px',
        },
    },
    btn: {
        marginRight: '8px',
        padding: '5px',
        [theme.breakpoints.up('sm')]: {
            marginRight: '10px',
            padding: '10px',
        },
    }
}))

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
    
    const query = location.pathname.split('/')[2]
    const currentPage = Number(location.pathname.split('/')[2])

    const rootUrl = 'https://simplesenhaibookmark.herokuapp.com/api'
    const getPage = page === 'search' ? 
        '/' + page + '/' + query + '/' + 1 
        : 
        '/' + page + '/' + currentPage 

    const url = rootUrl + getPage

    useEffect( () => {
        state.loading === undefined ? setLoading(true) : setLoading(state.loading)
        
        setImgLoad(true)
        axios.get(url)
        .then( res => {
            // console.log(res)
            setLists(res.data)
            setLoading(false)
            setPageUrl(currentPage)
        })
        .catch(err => {
            console.log(err)
            if(err.response.status >= 400) history.push('/error')
        })
    }, [url, history, state.loading, currentPage])

    // let a = '5-toubun no Hanayome ∬'
    // console.log(a.replace(/[^a-zA-Z0-9]/g, ' ').split('))

    const Pages = () => {

        // useEffect( () => {
        //     axios.request('https://api.jikan.moe/v4-alpha/top/anime')
        //     .then( res => console.log(res.data))
        // },[])
        
        let id = location.pathname.split('/')[2]
        return(
            <>
            {location.pathname === '/search/' + id ? '' :
                <Box className={classes.box}>
                    <Button component={Link} to={'/' + page + '/' + (currentPage - 1)} variant='outlined' className={classes.btn} disabled={currentPage === 1 ? true : false}>
                        <NavigateBeforeIcon /> Previous
                    </Button>

                    <b className={classes.btn}>
                    {pageUrl}
                    </b>

                    <Button component={Link} to={'/' + page + '/' + (currentPage + 1)} variant='outlined' className={classes.btn} 
                        // onClick={ () => setPageUrl(pageUrl + 1)} 
                    >
                        Next <NavigateNextIcon /> 
                    </Button>
                </Box>
            }
            </>
        )
    }

    return loading ? <Loading /> : (
        <Paper elevation={0} square className={classes.ptitle}>
            <Box>
            {page === 'search' ? 
                <Typography variant='h4' className={classes.title}>
                    Results for ' {query} '
                </Typography>
                :             
                <Typography variant='h4' className={classes.title} align='left'>
                    {page === 'popular' ? "Popular" : "Newest Episode"}   
                </Typography>
            }
            </Box>
            <Paper elevation={0} className={classes.paper}>

            <Pages />
            
            <Grid container spacing={1} align='center'>
                {lists.results.length === 0 ? <NoneFound /> : ''}

                {lists.results.map( list => (
                    <Grid item xs={6} sm={3} md={3} key={list.id}>
                        <Card className={classes.root} >
                            <Link to={page === 'recentlyadded' ? '/watching/'+list.id+'/'+list.episodenumber+'' : '/details/'+list.id+'/' } className={classes.decor}>
                                <CardActionArea onClick={ () => page === 'recentlyadded' ? dispatch(watchEpisode(list.episodenumber,list.id,list.title)) : dispatch(checkDetails(list.id)) }>
                                    <CardMedia 
                                        title={list.id}
                                        //https://thumbs.gfycat.com/ShadowyCourageousAztecant-size_restricted.gif
                                        image={imgLoad ? 'https://media1.tenor.com/images/c184317a395883494f73b6fe8d2acf70/tenor.gif?itemid=18008963' : list.image}
                                        component='img'
                                        className={classes.image}
                                        onLoad={ () => setImgLoad(false)}
                                    />
                                    <CardContent>
                                        <Typography variant={ window.innerWidth < 600 ? 'body2' : 'subtitle2'} >{list.title}</Typography>
                                        {page === 'recentlyadded' ? <Typography variant={ window.innerWidth < 600 ? 'body2' : 'subtitle2'} >Episode: {list.episodenumber}</Typography> : ''}
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