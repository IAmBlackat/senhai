import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Divider, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Loading from '../components/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'
import NoneFound from '../components/NoneFound'

const useStyles = makeStyles( (theme) => ({
    card: {
        maxWidth: 200,
        maxHeight: 500,
        backgroundColor: '#303030'
        // boxShadow: '5px 5px 25px #212121'
    },
    image: {
        maxWidth: 300,
        height: 'auto',
        [theme.breakpoints.down('sm')]: {
            height: 200
        }
    },
    title: {
        padding: '20px',
        marginLeft: '5px',
        [theme.breakpoints.down('sm')]: {
            paddingBottom: '20px',
            margin: 0,
            padding: '10px'
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
            margin: ' 10px',
            padding: '5px'
        },
    },
    ptitle: {
        paddingBottom: '10px',
        paddingTop: '10px',
        backgroundColor: '#121212'
    },
    btnContainer: {
        textAlign: 'right',
        padding: '20px',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px1'
            // paddingBottom: '20px',
            // paddingTop: '20px',
        },
    },
    btn: {
        marginRight: '10px',
        padding: '10px',
        [theme.breakpoints.up('sm')]: {
            // marginRight: '10px',
            padding: '10px',
        },
    },
    animetitle: {
        fontSize: '0.9rem'
    },
    animeepisode: {
        fontSize: '0.8rem',
        marginTop: '5px'
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
                <Box className={classes.btnContainer}>
                    <Button component={Link} to={'/' + page + '/' + (currentPage - 1)} variant='text' className={classes.btn} disabled={currentPage === 1 ? true : false}>
                        <NavigateBeforeIcon /> Prev
                    </Button>

                    <b className={classes.btn}>
                    {pageUrl}
                    </b>

                    <Button component={Link} to={'/' + page + '/' + (currentPage + 1)} variant='text' className={classes.btn} 
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
           
            <Paper elevation={0} className={classes.paper}>
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
            <Divider style={{ marginBottom: '10px' }} />
            {/* <Pages /> */}
            
            <Grid container spacing={1} align='center' >
                {lists.results.length === 0 ? <NoneFound /> : ''}

                {lists.results.map( list => (
                    <Grid item xs={6} sm={3} md={3} key={list.id}>
                        <Card className={classes.card} >
                            {/* <Link to={page === 'recentlyadded' ? '/watching/'+list.id+'/'+list.episodenumber+'' : '/details/'+list.id+'/' } className={classes.decor}> */}
                                <CardActionArea component={Link} to={page === 'recentlyadded' ? '/watching/'+list.id+'/'+list.episodenumber+'' : '/details/'+list.id+'/' } >
                                    <CardMedia 
                                        title={list.id}
                                        //https://thumbs.gfycat.com/ShadowyCourageousAztecant-size_restricted.gif
                                        image={imgLoad ? 'https://media1.tenor.com/images/c184317a395883494f73b6fe8d2acf70/tenor.gif?itemid=18008963' : list.image}
                                        component='img'
                                        className={classes.image}
                                        onLoad={ () => setImgLoad(false)}
                                    />
                                    <CardContent>
                                        <Typography className={classes.animetitle} >{list.title}</Typography>
                                        {page === 'recentlyadded' ? <Typography className={classes.animeepisode} variant={ window.innerWidth < 600 ? 'body2' : 'subtitle2'} >Episode: {list.episodenumber}</Typography> : ''}
                                    </CardContent>
                                </CardActionArea>
                            {/* </Link> */}
                        </Card>
                    </Grid>
                ))}   
            </Grid>

            <Divider style={{ marginTop: '10px' }} />

            <Pages />

            </Paper>
         
        </Paper>
    )
}

export default Container