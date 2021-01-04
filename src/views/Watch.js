import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, FormControl, InputLabel, makeStyles, MenuItem, Paper, Select, Typography } from '@material-ui/core'
import Loading from '../components/Loading'
import { watchEpisode } from '../redux/action'
import { Link, useHistory, useLocation } from 'react-router-dom'

const useStyles = makeStyles( (theme) => ({
    root: {
        height: '110vh'
        // height: 'auto'
    },
    title: {
        padding: '30px',
        textTransform: 'uppercase'
    },
    p: {
        height: '200px'
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
        textDecoration: 'none'    
    },
    box: {
        // maxHeight: '100vh'
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

    const state = useSelector( state => state)
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
            if(err.response.status >= 400) history.push('/error')
        })
    }, [url, history, currentEp])

    console.log(id.split('-').join(' '))
    let title = id.split('-').join(' ')

    return loading ? <Loading /> : (
        <Paper square className={classes.root}>
                <Typography className={classes.title} variant='h5'>{title} // Episode: {currentEp}</Typography>
                
                <div className={classes.p}>
                    <Box className={classes.box}>
                        <FormControl>
                            <InputLabel>Quality</InputLabel>
                            <Select value={quality} onChange={ (e) => setQuality(e.target.value)} >
                                {links.map( (i,index) => (
                                    <MenuItem value={i} href={i} variant='outlined' download className={classes.btn} key={index}>
                                        {dl.epdl[index]}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <span>
                            <Link to={'/watching/' + id + '/' + (currentEp-1)} className={classes.link}>
                                <Button variant='outlined' className={classes.btn}>
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

                     <Paper >               
                        <video src={quality} controls className={classes.video}/>
                    </Paper>
                    <Paper className={classes.box}>   
                        <Typography>
                            Download Links 
                        </Typography>
                        {links.map( (i,index) => (
                            <Button href={i} variant='outlined' download className={classes.btn} key={index}>
                                {dl.epdl[index]}
                            </Button>
                        ))}
                    </Paper>
                    
                </div>
           
        </Paper>
    )
}

export default Watch