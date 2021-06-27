import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { Box, Button, Container, FormControl, FormControlLabel, InputLabel, makeStyles, MenuItem, Paper, Select, Switch, Typography } from '@material-ui/core'
import Loading from '../components/Loading'
import { Link, useHistory, useLocation } from 'react-router-dom'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import VideoPlayer from 'react-video-js-player';
import { 
    Player,
    ControlBar,
    ReplayControl,
    ForwardControl,
    CurrentTimeDisplay,
    TimeDivider,
    VolumeMenuButton,
    BigPlayButton,
    FullscreenToggle,
    DurationDisplay,
    
} from 'video-react';
import Hls from './Hls'
import "./Watch.css"
import "../../node_modules/video-react/dist/video-react.css"
import { baseUrl } from '../utils/baseUrl'

const useStyles = makeStyles( (theme) => ({
    root: {
        // height: '110vh'
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
        marginBottom: theme.spacing(2),
        
    },
    newVideoContainer: {
        width: '70%',
        height: 600,
        margin: 'auto',
        [theme.breakpoints.down('sm')]: {
            width: "90%"
        },
        [theme.breakpoints.down('xs')]: {
            width: "95%",
            height: 220
        },
        outline: 'none',
        position: 'relative'

    },
    newVideo: {
        objectFit: 'fill',
        outline: 'none'
    },
    controlWrapper: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%'
    }
}))


function Watch() {
    const classes = useStyles()
    // const [dl, setDl] = useState( { epdl: {}} )
    // const [links, setLinks] = useState()
    // const [cdn, setCdn] = useState('')
    // const [vdLink, setVdLink] = useState('')
    const [quality, setQuality] = useState('')
    const [loading, setLoading] = useState(true)
    // const [checked, setChecked] = useState(false)
    const [videoReady, setVideoReady] = useState(false)
    // const [xtream, setXtream] = useState()

    const location = useLocation()
    const history = useHistory()   

    let path = location.pathname.split('/') 
    let currentEp = Number(path[3])
    const id = path[2]

    const rootUrl = `${baseUrl}watching/`
    var url = rootUrl + id +"/" + currentEp
    
    useEffect( () => {
        setLoading(true)
        setVideoReady(false)
        let unmount = false
        axios.get(url)
        .then( res => {
            if(!unmount) {
                console.log(res.data)
                // setVdLink(res.data.link)//vidstream url
                // setLinks(res.data.hd)
                // setCdn(res.data.cdn)
                if(res.data.hd !== "") {
                    setQuality(res.data.hd)
                } else {
                    setQuality(res.data.alt)
                }
                setLoading(false)
                // var epLinks = []
                
                // for (var i = 0; i < res.data.links.length; i++){
                //     let a = res.data.links[i].link.split('?')
                //     let b = a[0].split('/')
                //     b[5] === undefined ? epLinks.push('original') : epLinks.push(b[5])
                //     // epLinks.push(b[5])
                // }
                // setDl({epdl: epLinks})
            }
        })
        .catch(err => {
            // if(err.response.status !== 200) history.push('/details/' + id)
            console.log(err)
        })

        return () => unmount = true
    }, [url, history, currentEp, id])

    let title = id.split('-').join(' ')
    const video = useRef(null)

    return loading ? <Loading /> : (
        <Box square className={classes.root}>
            {/* <iframe
                src="https://animixplay.to/api/liveTmpnMk1EZz1MVFhzM0dyVTh3ZTlPVG1wbk1rMUVaejA9"
                allowFullScreen
                width="70%"
                height={500}
            /> */}

            {/* {console.log(xtream.map( i => i.file)[0])} */}
            <Box className={classes.p} square elevation={0}>
                <Container maxWidth='sm'>
                    <Typography className={classes.title} variant='h5'>{title}</Typography>
                    <Typography variant='h6'>
                        Episode: {currentEp}
                    </Typography>
                </Container>
                
                <Box square className={classes.p} elevation={0}>
                    <Container maxWidth='md' className={classes.box}>
                        {/* <FormControl style={{marginLeft: '20px'}} >
                            <InputLabel>Quality</InputLabel>
                            <Select value={quality} onChange={ (e) => setQuality(e.target.value)} >
                                {links.map( (i,index) => (
                                    <MenuItem value={i.link} href={i.link} variant='outlined' download className={classes.btn} key={index}>
                                        {i.name.replace("(","").replace(")","")}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl> */}

                        {/* <FormControlLabel 
                            control={<Switch checked={checked} onChange={ () => setChecked(!checked)} />}
                            label='player'
                            // labelPlacement='bottom'
                        /> */}

                        <Box>
                            <Button component={Link} to={`/details/${id}`} className={classes.btn}>
                                Episode List
                            </Button>
                        </Box>
                    </Container>
                </Box>

                <Box square elevation={0} >   
                    {/* <Box className={classes.videoContainer} >
                        <video src={quality} controls className={classes.video} />                     
                    </Box> */}

                   <Box onClick={()=>console.log("Asdfasdf")} className={classes.newVideoContainer} >
                        <Player ref={video} playsInline >
                            { quality.includes("storage.googleapi") ? <source src={quality} /> : <Hls isVideoChild src={quality} /> }
                            <BigPlayButton position="center" />
                            <ControlBar>
                                <TimeDivider disabled />
                                <VolumeMenuButton disabled />  

                                <CurrentTimeDisplay order={2} />
                                <DurationDisplay order={7} />
                                <ReplayControl seconds={10} order={9.1} />
                                <ForwardControl seconds={30} order={9.2} />
                                <FullscreenToggle order={10} />
                            </ControlBar>
                        </Player>
                        {/* <VideoPlayer 
                            src={quality}
                            className={classes.newVideo}
                            height="100%"
                            // onReady={onVideoReady}
                            // hideControls={['volume', 'playbackrates']}
                            responsive={true}
                            controls={true}
                            autoplay={true}
                        /> */}
                        {/* <div onClick={()=>console.log("asdasd")} className={classes.controlWrapper} >
                            <p>asdfsdf</p>
                        </div> */}
                    </Box> 

                    <Box className={classes.epnav}>
                        <span>
                            <Link to={'/watching/' + id + '/' + (currentEp-1)} className={currentEp === 1 ? classes.linkDisabled : classes.link}>
                                <Button variant='outlined' className={classes.btn} startIcon={<NavigateBeforeIcon />} disabled={currentEp === 1 ? true : false}>
                                    Prev
                                </Button>
                            </Link>
                        </span>
                        <span>
                            <Link to={'/watching/' + id + '/' + (currentEp+1)} className={classes.link}>
                                <Button variant='outlined' className={classes.btn} endIcon={<NavigateNextIcon /> } >
                                    Next
                                </Button>
                            </Link>
                        </span>
                    </Box>
                </Box>

                {/* <Box square elevation={0}>   
                    <Typography>
                        Download Links 
                    </Typography>
                    <Button href='https://fvs.io/redirector?token=U3p3eXVkZWRadHBRKzRqRTNBWk4veHpmejkyZVlCbjluZzdBZnc5WUJmNVJWMkUwRWx1UC8wblY0UVpIclYzWW45L1ZQd3lBMTZNL3BRZVhIUThzbllrWkVIdXNSTzZ6REtMU09WNTFUbTFobTUzQ0J2R0FiYnNYUWxQSCs0dXFQUmNDbTZEVVc1aU5wWmdta0NWdERUWGJpeHJCQVlwZWhYbz06c2lXREFSbFJmTkU3ZlRaMitSVGxNQT09' variant='contained' download className={classes.btn} >Xtreamcdn</Button>
                    {links.map( (i,index) => (
                        <Button href={i.link} variant='outlined' download={`${title.replace(" ","-")}.mp4`} className={classes.btn} key={index}>
                            {i.name.replace(/ ([^)]) /g, ".").replace("(","").replace(")","")}
                        </Button>
                    ))}
                </Box> */}
            </Box>
        </Box>
    )
}

export default Watch