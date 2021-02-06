import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Button, Container, FormControl, FormControlLabel, InputLabel, makeStyles, MenuItem, Paper, Select, Switch, Typography } from '@material-ui/core'
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
    videoContainer: {
        position: 'relative',
        paddingBottom: '50%', 
        height: '0', 
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            paddingBottom: '35%'
        }
    },
    iframeContainer: {
        position: 'relative',
        // paddingBottom: '75%', 
        minHeight: '260px', 
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            paddingBottom: '35%',
            minHeight: '0'
        }
    },
    video: {
        position: 'absolute', 
        top: '0', 
        left: '50%', 
        right: '50%', 
        width: '80%', 
        height: '100%',
        transform: 'translate(-50%)', 
        outline: 'none',
        [theme.breakpoints.up('sm')]: {
            width: '60%'
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
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    epnav: {
        marginBottom: theme.spacing(2)
    }
}))


function Watch() {
    const classes = useStyles()
    const [dl, setDl] = useState( { epdl: {}} )
    const [links, setLinks] = useState()
    const [vdLink, setVdLink] = useState('')
    const [quality, setQuality] = useState('')
    const [loading, setLoading] = useState(true)
    const [checked, setChecked] = useState(false)

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
            // console.log(res)
            setVdLink(res.data.link)//vidstream url
            setLinks(res.data.links)
            setQuality(res.data.links[0].link)
            setLoading(false)
            var epLinks = []
            
            for (var i = 0; i < res.data.links.length; i++){
                let a = res.data.links[i].link.split('?')
                let b = a[0].split('/')
                b[5] === undefined ? epLinks.push('original') : epLinks.push(b[5])
                // epLinks.push(b[5])
            }
            setDl({epdl: epLinks})
        })
        .catch(err => {
            if(err.response.status !== 200) history.push('/details/' + id)
        })
    }, [url, history, currentEp, id])

    // console.log(links.map( i => i.name))
    let title = id.split('-').join(' ')

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
                        {/* <FormControlLabel 
                            control={<Switch checked={checked} onChange={ () => setChecked(!checked)} />}
                            label='VidStream'
                            labelPlacement='bottom'
                        /> */}
            
                        <FormControl style={{marginLeft: '20px'}} >
                            <InputLabel>Quality</InputLabel>
                            <Select value={quality} onChange={ (e) => setQuality(e.target.value)} >
                                {links.map( (i,index) => (
                                    <MenuItem value={i.link} href={i.link} variant='outlined' download className={classes.btn} key={index}>
                                        {i.name.replace("(","").replace(")","")}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Box>
                            <Button component={Link} to={`/details/${id}`} className={classes.btn}>
                                Episode List
                            </Button>
                        </Box>
                    </Container>
                </Paper>

                <Paper square elevation={0} >     

                    {/* <video src={quality} controls className={classes.video}/> */}

                    <Box className={ !checked ? classes.videoContainer : classes.iframeContainer}>
                        { !checked ? 
                            <video src={quality} controls className={classes.video} /> 
                            :  
                            <iframe 
                                src={vdLink}
                                title='vidstream'
                                frameBorder='0'
                                marginWidth='0'
                                marginHeight='0'
                                scrolling='no'
                                allowFullScreen
                                className={classes.video} 
                            // style={{position: 'absolute', top: '0', left: '50%', right: '50%', width: '60%', height: '100%',
                            //         transform: 'translate(-50%)'
                            //     }}
                            />    
                        }

                        {/* <video src={quality} controls className={classes.video} /> */}
                        {/* <iframe 
                            src='//gogo-play.net/streaming.php?id=MTUwNTc3&title=Ore+dake+Haireru+Kakushi+Dungeon+Episode+2'
                            frameBorder='0'
                            marginWidth='0'
                            marginHeight='0'
                            scrolling='no'
                            allowFullScreen
                            style={{position: 'absolute', top: '0', left: '50%', right: '50%', width: '60%', height: '100%',
                                    transform: 'translate(-50%)'
                                }}
                        /> */}
                        
                    </Box>

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
                        <Button href={i.link} variant='outlined' download className={classes.btn} key={index}>
                            {i.name.replace(/ ([^)]) */g, ".").replace("(","").replace(")","")}
                        </Button>
                    ))}
                </Paper>
            </Paper>
        </Paper>
    )
}

export default Watch