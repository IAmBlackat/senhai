import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Button, Container, FormControl, InputLabel, makeStyles, MenuItem, Paper, Select, Typography } from '@material-ui/core'
import Loading from '../components/Loading'
import { Link, useHistory, useLocation } from 'react-router-dom'

const useStyles = makeStyles( (theme) => ({
    root: {
        height: '110vh'
        // height: 'auto'
    },
    title: {
        padding: '20px',
        textTransform: 'uppercase'
    },
    p: {
        // paddingBottom: '5px',
        // width: '50%'
    },
    btn: {
        margin: '10px',
        padding: '10px'
    },
    video: {
        zIndex: '1',
        outline: 'none',
        // position: 'absolute',
        height: 'auto',
        width: '88%',
        [theme.breakpoints.up('sm')]: {
            width: '55%'
        }
    },
    link: {
        textDecoration: 'none',  
    },
    linkDisabled: {
        textDecoration: 'none', 
        pointerEvents: 'none'
    },
    box: {
        // maxHeight: '100vh'
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'baseline'
    },
    epnav: {
        marginBottom: theme.spacing(2)
    }
}))


function Watch() {
    const classes = useStyles()
    const [dl, setDl] = useState( { epdl: {}} )
    const [links, setLinks] = useState()
    const [quality, setQuality] = useState('')
    const [loading, setLoading] = useState(true)

    const location = useLocation()
    const history = useHistory()   

    let path = location.pathname.split('/') 
    let currentEp = Number(path[3])
    const id = path[2]

    // const state = useSelector( state => state)
    // const dispatch = useDispatch()
    
    const rootUrl = "https://anime-x.vercel.app/api/watching/"
    var url = rootUrl + id +"/" + currentEp
    
    useEffect( () => {
        axios.get(url)
        .then( res => {
            setLinks(res.data.links)
            setQuality(res.data.links[0])
            setLoading(false)
            var epLinks = []
            for (var i = 0; i < res.data.links.length; i++){
                let a = res.data.links[i].split('?')
                let b = a[0].split('/')
                b[5] === undefined ? epLinks.push('original') : epLinks.push(b[5])
                // epLinks.push(b[5])
            }
            setDl({epdl: epLinks})
        })
        .catch(err => {
            if(err.response.status >= 400) history.push('/details/' + id)
        })
    }, [url, history, currentEp, id])

    // console.log(id.split('-').join(' '))
    let title = id.split('-').join(' ')

    console.log(dl.epdl.length)

    return loading ? <Loading /> : (
        <Paper square className={classes.root}>
            <Paper className={classes.p} square elevation={0}>
                <Container maxWidth='sm'>
                    <Typography className={classes.title} variant='h5'>{title}</Typography>
                    <Typography variant='h6'>
                        Episode: {currentEp}
                    </Typography>
                </Container>
                
                <Paper square className={classes.p} elevation={0}>
                    <Container maxWidth='md' className={classes.box}>
                        <FormControl>
                            <InputLabel>Quality</InputLabel>
                            <Select value={quality} onChange={ (e) => setQuality(e.target.value)} >
                                {links.map( (i,index) => (
                                    <MenuItem value={i} href={i} variant='outlined' download className={classes.btn} key={index}>
                                        {dl.epdl.length === undefined ? '' : dl.epdl[index].split('.')[2] === undefined ? 'original' : dl.epdl[index].split('.')[2] }
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        
                        <Box>
                            <Link to={'/details/' + id} className={classes.link}>
                                <Button className={classes.btn}>
                                    Episode List
                                </Button>
                            </Link>
                        </Box>
                    </Container>
                </Paper>

                <Paper square elevation={0} >     

                    <video src={quality} controls className={classes.video}/>

                    <Box className={classes.epnav}>
                        <span>
                            <Link to={'/watching/' + id + '/' + (currentEp-1)} className={currentEp === 1 ? classes.linkDisabled : classes.link}>
                                <Button variant='outlined' className={classes.btn} disabled={currentEp === 1 ? true : false}>
                                    Previous
                                </Button>
                            </Link>
                        </span>
                        <span>
                            <Link to={'/watching/' + id + '/' + (currentEp+1)} className={classes.link}>
                                <Button variant='outlined' className={classes.btn}>
                                    Next
                                </Button>
                            </Link>
                        </span>
                    </Box>
                </Paper>

                <Paper square elevation={0}>   
                    <Typography>
                        Download Links 
                    </Typography>
                    {links.map( (i,index) => (
                        <Button href={i} variant='outlined' download className={classes.btn} key={index}>
                            {dl.epdl[index]}
                        </Button>
                    ))}
                </Paper>
            </Paper>
        </Paper>
    )
}

export default Watch