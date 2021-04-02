import React,{ useState, useEffect } from 'react'
import { Backdrop, Box, Button, CircularProgress, Divider, IconButton, makeStyles, Snackbar, Typography } from '@material-ui/core'
import axios from 'axios'
import Loading from '../components/Loading'
import Collapse from '@material-ui/core/Collapse';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { Alert } from '@material-ui/lab'
import { Link, useHistory, useLocation } from 'react-router-dom';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import { baseUrl } from '../utils/baseUrl'

export default function DetailsDesktop() {
    const [loading, setLoading] = useState(true)
    const [ep, setEp] = useState(1)
    const [more, setMore] = useState(false)
    const [img, setImg] = useState('')

    const [load, setLoad] = useState(false)
    const [success, setSuccess] = useState(false)

    const location = useLocation()
    const history = useHistory()

    const id = location.pathname.split("/")[2]

    // to get the anime id that's why its here
    const [details, setDetails] = useState([
        {
            _id: localStorage.getItem('_id'),
            animeid: id,
            anime: {}
        }
    ])

    let rooturl = `${baseUrl}details/`
    let url = rooturl + id

    useEffect( () => {
        axios.get(url)
        .then( res => {
            // console.log(res.data)
            setDetails({ ...details, anime: res.data.results})
            setImg(res.data.results.map( anime => anime.image))
            var eps = Number(res.data.results.map( ep => ep.totalepisode));
            setEp(eps)
            setLoading(false)
        })
        .catch( err => err.response.status >= 400 && history.push('/error') )

        return () => console.log('unmounted')
    }, [url, history])

    // styles 
    const useStyles = makeStyles( (theme) => ({
        backgroundImgContainer: {
            height: '350px',
            width: '100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundBlendMode: 'darken',
            background: `rgba(0, 0, 0, .55) url(${img})`,
            zIndex: 1,
            position: 'relative'
        },
        contentContainer: {
            position: 'absolute',
            margin: 'auto',
            width: '70%',
            left: '15%',    
            bottom: -180,
            display: 'flex'
        },
        img: {
            height: 290,
            width: 200,
            borderRadius: 10,
        },
        detailsContainer:{
            marginLeft: 20,
            marginTop: 60,
            marginBottom: 5,
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            [theme.breakpoints.down('sm')]:{
                display: 'none'
            }
        },
        title: {
            fontWeight: 'bold',
        },
        summary: {
            // marginLeft: 10,
        },
        btn: {
            margin: 10
        },
        more: {
            transform: 'rotate(180deg)',
        },
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
        link:{
            textDecoration:'none'
        }
    }))

    const classes = useStyles()


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccess(false);
    };

    const addToBookmark = (e) => {
        setLoad(true)
        e.preventDefault()
        // console.log(details)
        if(localStorage.getItem('token') === null) {
            setTimeout( () => {
                setLoad(false)
                setSuccess(true)
            }, 2000)
        } else {
            axios.put('https://simplesenhaibookmark.herokuapp.com/bookmark', details)
            .then( res => {
                console.log(res)
                setSuccess(true)
                setLoad(false)
            })
            .catch( err => console.log(err))
        }
        
    }

    const epList = () => {
        let L = [];
        for (var i = ep, k = 0; i >= 1; i--, k++) {
          L[k] = i;
        }
        return L;
    };

    return loading ? <Loading /> : (
        <Box className={classes.root} >
            {details.anime.map( (anime, index) => (
                <Box key={index} style={{height: 'auto'}} >
                    {/* anime title and details */}
                    <Box style={{ height: 530 }} >
                        <Box className={classes.backgroundImgContainer} >
                            <Box className={classes.contentContainer} > 
                                <Box>
                                    <img className={classes.img} src={anime.image} alt='' /> 
                                </Box>
                                <Box className={classes.detailsContainer} >
                                    <Typography variant='h4' className={classes.title} >{anime.title}</Typography>
                                    <Box>
                                        <Typography>Genre: {anime.genres}</Typography>
                                        <Typography>Status: {anime.status}</Typography>
                                        <Typography>Year: {anime.relased}</Typography>
                                        <Typography>Total Episodes: {anime.totalepisode}</Typography>
                                    </Box>

                                    <form method="POST" onSubmit={addToBookmark} >
                                        <Button type='submit' startIcon={<BookmarksIcon />} style={{ alignSelf: 'end' }} variant='contained' color='primary' >Bookmark</Button>
                                    </form>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    {/* anime summary */}
                    <Box style={{width: '70%', margin: 'auto', textAlign: 'left', height: '80vh'}} > 
                        {/* anime summary */}
                        <Box>
                            <Typography variant='h6' >Summary:</Typography>
                   

                            {anime.summary.length < 350 ? 
                                <Typography className={classes.summary} >{anime.summary}</Typography>
                            :
                                <>
                                    <Collapse in={more} collapsedHeight={50} >
                                        <Typography className={classes.summary} >{anime.summary}</Typography>
                                    </Collapse>
                                    <Box style={{textAlign: 'right'}}>
                                        <IconButton onClick={ () => setMore(!more) } >
                                            <ArrowDownwardIcon className={ !more ? null : classes.more} />
                                        </IconButton>
                                    </Box>
                                </>
                            }
                           

                        </Box>

                        <Divider style={{ marginTop: 5, marginBottom: 5 }} />

                        {/* episode list */}
                        <Box style={{ textAlign: 'center' }} >
                            <Typography variant='h5' align='left' >Episode</Typography>
                            {epList().map( (ep,index) => (
                                <Link to={"/watching/" + location.pathname.split("/")[2] + "/" + ep} className={classes.link} key={index}>
                                    <Button 
                                        className={classes.btn} 
                                        variant='outlined' 
                                        key={index}
                                    >
                                        Episode: {ep}
                                    </Button>
                                </Link>
                            ))}
                        </Box>
                    </Box>
                    
                </Box>
            ) )}
             <Backdrop className={classes.backdrop} open={load}>
                <CircularProgress color="primary" />
            </Backdrop>
            <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
                {localStorage.getItem('token') === null ?
                    <Alert onClose={handleClose} severity="error" elevation={6} variant="filled" >
                        Please Login First 
                    </Alert>
                    : 
                    <Alert onClose={handleClose} severity="success" elevation={6} variant="filled" >
                        Added To Bookmark   
                    </Alert>
                }
                
            </Snackbar>
        </Box>
    )
}