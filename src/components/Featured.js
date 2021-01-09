import React, { useEffect, useState } from 'react'
import jikan from 'jikanjs'
import { Box, Button, makeStyles, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Loading from './Loading'


function Featured( {page, id, image, index} ) {
    const [trailer, setTrailer] = useState('')
    const [status, setStatus] = useState('')
    const [jap, setJap] = useState('')
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
            padding: '30px'
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
                width: '100%'
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
            backgroundBlendMode: 'darken'
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
    // console.log(key)
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
    
    return loading ? <Loading /> : (
        <>
        {/* <Typography variant='h4' align='left' className={classes.title}>
            Featured
        </Typography> */}
        <Box className={classes.featuredImg}>
            <Box className={classes.featureContainer}>
                <Box className={classes.details}>
                    <Typography variant='h3'  className={classes.featuredTitle}>
                        {page[index].title}
                    </Typography>
                    <Typography variant='h6'>
                        Japanese: {jap}
                    </Typography>
                    <Typography variant='h6' className={classes.status}>
                        Status: {status}
                    </Typography>
                    <Typography variant='h6' className={classes.genre}>
                        Genre: 
                    </Typography>
                    <Typography variant='h6' className={classes.genre}>
                        {page[index].genres.map( (i,index) => (<span key={index}>{i.name} </span>))}
                    </Typography>
                    <Box className={classes.btnContainer}>
                        <Link to={'/details/' + page[index].title} className={classes.link}>
                            <Button variant='contained' className={classes.btnWatch}>
                                Details
                            </Button>
                        </Link>
                    </Box>
                </Box>

                <iframe src={trailer.split('=').slice(0,3).join('=') + '=0'} frameBorder='0' className={classes.trailer}/>

            </Box>
        </Box>
        </>
    )
}

export default Featured