import React, { useEffect, useState } from 'react'
import { Backdrop, Box, Button, CircularProgress, Divider, IconButton, makeStyles, Snackbar, Typography } from '@material-ui/core'
import axios from 'axios'
import Loading from '../components/Loading'
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Alert } from '@material-ui/lab'
import Bg from '../utils/Bg';
import { baseUrl } from '../utils/baseUrl'
import BookmarksIcon from '@material-ui/icons/Bookmarks';

const useStyles = makeStyles( (theme) => ({
    detailsContainer: {
        textAlign: 'left',
        padding: 20
    },
    bgDetails: {
        backgroundColor: '#303030',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        marginTop: 20
    },
    divider: {
        marginTop: 10, 
        marginBottom: 20,
        height: 8, 
        borderRadius: 40,
        width: '65%',
        margin: 'auto'
    },
    btn: {
        margin: 10
    },
    more: {
        transform: 'rotate(180deg)',
        transition: 'transform .5s ease'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    link: {
        textDecoration: 'none'
    },
    summary: {
        fontSize: 15
    }
}))

export default function DetailsMobile() {
    const classes = useStyles()
    const [loading, setLoading] = useState(true)
    // const [anime, setAnime] = useState({})
    const [ep, setEp] = useState(1)
    const [more, setMore] = useState(false)
    const [success, setSuccess] = useState(false)
    const [load, setLoad] = useState(false)

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
            var eps = Number(res.data.results.map( ep => ep.totalepisode));
            setEp(eps)
            setLoading(false)
        })
        .catch( err => {
            if(err.response.status >= 400) history.push('/error')
        })

        return () => console.log("unmounted")
    }, [url, history])

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

    //this handles the alert from snackbar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccess(false);
    };

    const epList = () => {
        let L = [];
        for (var i = ep, k = 0; i >= 1; i--, k++) {
          L[k] = i;
        }
        return L;
    };

    const List = ({ text, data }) => {
        return(
            <Box  style={{ display: 'inline-flex', width: '100%', marginBottom: 5 }}>
                <Box style={{ width: '35%' }} >
                    <Typography style={{ fontWeight: 'bold', fontSize: 15 }} >{text}</Typography>
                </Box>

                <Box style={{ width: '60%' }}  >
                    <Typography style={{ fontSize: 14 }} >{data}</Typography>
                </Box>
            </Box>
        )
    }

    return loading ? <Loading /> : (
        <Box>
             {details.anime.map( (anime, index) => (
                <Box key={index} style={{height: 'auto'}} >
                    {/* anime title */}
                    <Bg image={anime.image} title={anime.title} genre={anime.genres} />

                    {/* anime details wrapper */}
                    <Box className={classes.bgDetails} >
                        {/* anime details */}
                        <Box className={classes.detailsContainer} >
                            <Divider className={classes.divider} />

                            <Box style={{  }} >
                                <List text='Status' data={anime.status} />
                                <List text='Year' data={anime.relased} />
                                <List text='Episode' data={anime.totalepisode} />
                                <List text='Other Title' data={anime.Othername} />
                            </Box>

                            <Box textAlign='right' margin={1} >
                                <form method="POST" onSubmit={addToBookmark} >
                                    <Button type='submit' variant='contained' color='primary' >Bookmark</Button>
                                </form>
                            </Box>

                            <Divider style={{ marginTop: 5, marginBottom: 5 }} />

                            <Box style={{ height: 'auto'}} > 
                                {/* anime summary */}
                                <Box>
                                    <Typography variant='h6' >Summary:</Typography>
                                    {/* <Typography>{anime.summary}</Typography> */}
                                    {anime.summary.length < 350 ? 
                                        <Typography className={classes.summary} >{anime.summary}</Typography>
                                    :
                                        <>
                                            <Collapse in={more} collapsedHeight={50} >
                                                <Typography className={classes.summary} >{anime.summary}</Typography>
                                            </Collapse>
                                            <Box style={{ textAlign: 'right', padding: '5px' }}>
                                                <Button onClick={ () => setMore(!more)} size='small' endIcon={<ExpandMoreIcon className={ !more ? null : classes.more} />} >Read More</Button>
                                                {/* <Typography>Read More</Typography> */}
                                                {/* <IconButton onClick={ () => setMore(!more) } > */}
                                                    {/* <ExpandMoreIcon className={ !more ? null : classes.more} /> */}
                                                {/* </IconButton> */}
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