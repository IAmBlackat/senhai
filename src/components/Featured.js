import React, { useEffect, useState } from 'react'
import jikan from 'jikanjs'
import { Box, Button, makeStyles, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Loading from './Loading'
import ReactPlayer from 'react-player'
import { useDispatch } from 'react-redux'
import { playing, searchAnime } from '../redux/action'

function Featured( {page, id, image, index} ) {
    const [trailer, setTrailer] = useState('')
    const [status, setStatus] = useState('')
    const [jap, setJap] = useState('')
    const [play, setPlay] = useState(false)
    const [loading, setLoading] = useState(true)

    const useStyles = makeStyles( (theme) => ({
        root: {
            height: 'auto',
            paddingBottom: '10px',
            backgroundColor: '#303030'
        },
        title: {
            padding: '30px'
        },
        featureContainer: {
            height: '100%',
            padding: '30px',
            // width: '100%'
        },
        featuredTitle: {
            // paddingTop: '30px',
            // paddingLeft: '30px',
            marginBottom: '10px'
        },
        status: {
            // marginBottom: '20px',
            paddingTop: '30px',
            // marginLeft: '30px'
        },
        genre: {
            // paddingLeft: '30px'
        },
        genres: {
    
        },
    
        details: {
            float: 'left',
            textAlign: 'left',
            width: '30%',
            [theme.breakpoints.down('xs')]: {
                float: 'none',
                textAlign: 'center',
                width: '100%',
                
            }
        },
        trailer: {
            float: 'right',
            outline: 'none',
            width: '50%',
            height: '80%',
            [theme.breakpoints.down('xs')]: {
                display: 'none'
            }
        },
    
        topSeasonPaper: {
            margin: '20px',
            padding: '20px',
            
        },
        img: {
            width: '50%',
            objectFit: 'cover',
            height: '300%'
        },
        featuredImg: {
            height: '500px',
            width: '100%',
            background: 'rgba(0, 0, 0, .65) url(' + image + ')',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundBlendMode: 'darken',
            [theme.breakpoints.down('xs')]: {
                height: '350px'
            }
        },
        btnContainer: {
            width: '100%',
            textAlign: 'center'
        },
        btnWatch: {
            marginTop: '20px',
            padding: '10px',
        },
        link: {
            textDecoration: 'none'
        }
    }))

    //https://media.kitsu.io/anime/poster_images/43545/original.jpg?1609224996
    // console.log(window.innerWidth)
    const classes = useStyles()

    useEffect( () => {
        jikan.loadAnime(id)
        .then( resu => {
            // console.log(resu)
            setTrailer(resu.trailer_url)
            setStatus(resu.status)
            setJap(resu.title_japanese)
            setLoading(false)
        })
    }, [id])

    // console.log(trailer.split('=').slice(0,3).join('=') + '=0')
    // console.log(trailer)
    const dispatch = useDispatch()

    const handlePlay = () => {
        setPlay(true)
        dispatch(playing(play))
    }

    return loading ? <Loading /> : (
        <>
        {/* <Typography variant='h4' align='left' className={classes.title}>
            Featured
        </Typography> */}
        <Box className={classes.featuredImg}>
            <Box className={classes.featureContainer}>
                <Box className={classes.details}>
                    <Typography variant={ window.innerWidth < 600 ? 'h6' : 'h4'} className={classes.featuredTitle}>
                        {page[index].title}
                    </Typography>
                    <Typography variant={ window.innerWidth < 600 ? 'subtitle1' : 'h6'}>
                        Japanese: {jap}
                    </Typography>
                    <Typography variant={ window.innerWidth < 600 ? 'subtitle1' : 'h6'} className={classes.status}>
                        Status: {status}
                    </Typography>
                    <Typography variant={ window.innerWidth < 600 ? 'subtitle1' : 'h6'} className={classes.genre}>
                        Genre: 
                    </Typography>
                    <Typography variant={ window.innerWidth < 600 ? 'subtitle1' : 'h6'} className={classes.genre}>
                        {page[index].genres.map( (i,index) => (<span key={index}>{i.name} </span>))}
                    </Typography>
                    <Box className={classes.btnContainer}>
                        <Link to={'/search/' + page[index].title}onClick={ () => dispatch(searchAnime(page[index].title.replace(/[^a-zA-Z0-9]/g, ' ').split(' ').filter( e => e.trim() ).join(' ')))} className={classes.link}>
                            <Button variant='contained' className={classes.btnWatch}>
                                Details
                            </Button>
                        </Link>
                    </Box>
                </Box>

                {/* <iframe src={trailer.split('=').slice(0,3).join('=') + '=0'}  frameBorder='0' className={classes.trailer} onClick={ () => console.log('playing')}/> */}
                
                <Box className={classes.trailer}>
                    <ReactPlayer 
                        url={trailer.split('=').slice(0,3).join('=') + '=0'}
                        // className={classes.trailer}
                        controls
                        // playing={ () => setPlay(!play)}
                        onPlay={handlePlay}
                        height='100%'
                        origin={window.location.href}
                    />
                </Box>
            </Box>
        </Box>
        </>
    )
}

export default Featured