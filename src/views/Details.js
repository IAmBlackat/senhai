import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Backdrop, Button, CircularProgress, Grid, makeStyles, Paper, Snackbar, Typography } from '@material-ui/core'
import { watchEpisode } from '../redux/action'
import Loading from '../components/Loading'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { Alert } from '@material-ui/lab'

const useStyles = makeStyles( (theme) => ({
    root: {
        // height: '91.8vh'
        height: 'auto'
    },
    title: {
        padding: '30px'
    },
    img: {
        height: 'auto',
        maxWidth: '50vw',
        [theme.breakpoints.up('sm')]: {
            maxWidth: '20vw'
        }
    },
    btn: {
        margin: '5px',
    },
    eps: {
        margin: '20px',
        padding: '50px',
        boxShadow: '5px 5px 25px rgba(0,0,0,1)'
    },
    link: {
        textDecoration: 'none'
    },
    bookmark: {
        marginBottom: '20px'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))

function Details() {
    const classes = useStyles()
    
    const [loading, setLoading] = useState(true)
    const [ep, setEp] = useState(0)

    // this load is for back drop state
    const [load, setLoad] = useState(false)
    const [success, setSuccess] = useState(false)

    const location = useLocation()
    const history = useHistory()

    const id = location.pathname.split("/")[2]

    // to get the anime id that's why its here
    const [details, setDetails] = useState([
        {
            _id: localStorage.getItem('_id'),
            animeid: id
        }
    ])

    const dispatch = useDispatch()
    const state = useSelector( state => state.title)
    
    let rooturl = "https://anime-x.vercel.app/api/details/"
    let url = rooturl + id

    useEffect( () => {
        axios.get(url)
        .then( res => {
            console.log(res)
            setDetails({ ...details, anime: res.data.results})
            setLoading(false)
            var eps = Number(res.data.results.map( ep => ep.totalepisode));
            setEp(eps)
        })
        .catch( err => {
            // console.log(err.response.status)
            if(err.response.status >= 400) history.push('/error')
        })
    }, [url, history])

    const epList = () => {
        let L = [];
        for (var i = ep, k = 0; i >= 1; i--, k++) {
          L[k] = i;
        }
        return L;
      };

    //this handles the alert from snackbar
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
                // console.log(res)
                setSuccess(true)
                setLoad(false)
            })
            .catch( err => console.log(err))
        }
        
    }

    return loading ? <Loading /> : (
        <Paper square className={classes.root}>
          {details.anime.map( detail => (
              <Grid container key={detail.title}>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.eps}>
                            <img className={classes.img} src={detail.image} alt='' />
                            <Typography variant='h6'>
                                {detail.title}
                            </Typography>   
                            <Typography className={classes.title}>
                                Status: {detail.status}
                            </Typography>
                            <form method="POST" onSubmit={addToBookmark} >
                                <Button type='submit' className={classes.bookmark} variant='contained' color='primary' >Add To Bookmark</Button>
                            </form>
                            <Typography>
                                {detail.summary}
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={5} >
                        <Paper className={classes.eps}>
                            <Typography className={classes.title} variant='h6' align="center">Episode List</Typography>
                            {epList().map( (ep,index) => (
                                <Link to={"/watching/" + location.pathname.split("/")[2] + "/" + ep} className={classes.link} key={index}>
                                    <Button 
                                        className={classes.btn} 
                                        variant='outlined' 
                                        key={index}
                                        onClick={ () => dispatch(watchEpisode(ep,state,detail.title))}
                                    >
                                        Episode: {ep}
                                    </Button>
                                </Link>
                            ))}
                        </Paper>
                    </Grid>

              </Grid>
          ))}  
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
        
        </Paper>
    )
}

export default Details