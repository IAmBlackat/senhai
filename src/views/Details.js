import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import { watchEpisode } from '../redux/action'
import Loading from '../components/Loading'
import { Link, useHistory, useLocation } from 'react-router-dom'

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
    }
}))

function Details() {
    const classes = useStyles()
    const [details, setDetails] = useState([])
    const [loading, setLoading] =useState(true)

    const location = useLocation()
    const history = useHistory()

    const id = location.pathname.split("/")[2]

    const dispatch = useDispatch()
    const state = useSelector( state => state.title)
    
    let rooturl = "https://anime-x.vercel.app/api/details/"
    let url = rooturl + id

    useEffect( () => {
        axios.get(url)
        .then( res => {
            // console.log(res.data)
            setDetails(res.data.results)
            setLoading(false)
        })
        .catch( err => {
            console.log(err.response.status)
            if(err.response.status >= 400) history.push('/error')
        })
    }, [url, history])
    
    useEffect( () => {
        axios.post('https://mangadex.org/api/manga/28792')
        .then( res => console.log(res))
        .catch( err => console.log(err))
    }, [])

    var ep = Number(details.map( ep => ep.totalepisode));
    const epList = () => {
      let L = [];
      for (var i = ep, k = 0; i >= 1; i--, k++) {
        L[k] = i;
      }
      return L;
    };
    
    return loading ? <Loading /> : (
        <Paper square className={classes.root}>
          {details.map( detail => (
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
        </Paper>
    )
}

export default Details