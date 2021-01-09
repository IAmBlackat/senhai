import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import jikan from 'jikanjs'
import Loading from '../components/Loading'
import Carousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import { Link } from 'react-router-dom'
import Featured from '../components/Featured'

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
        height: '400px',
        width: '100%',
        background: 'rgba(0, 0, 0, .65) url(https://media.kitsu.io/anime/poster_images/43545/original.jpg?1609224996)',
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

function Home() {
    const classes = useStyles()
    const [lists, setLists] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState()

    // jikan.loadSeason(2021, 'winter', 1).then( res => setLists(res))
    
    useEffect( () => {
        jikan.loadSeason( 2021, 'winter')
        .then( res => {
            console.log(res)
            setLists(res.anime)
            var pages = []
            for( var a = 0; a < 20; a++ ) {
                pages.push(res.anime[a])
            }
            setPage(pages)
            setLoading(false)
        })
        .catch( err => console.log(err))
    }, [])
    // console.log(lists.length)
    // let a = '5-toubun no Hanayome ∬'
    // console.log(a.replace(/[^a-zA-Z0-9]/g, ' ').split(' ').filter( e => e.trim() ).join('-') )
    
    // console.log(page.map( i => i.title))

    const res = {
        0: {
            items: 1
        },
        568: {
            items: 2
        },
        1024: {
            items: 4
        },
        1400: {
            items: 5
        }
    }

    // const Features = () => {
    //     const [trailer, setTrailer] = useState('')
    //     const [status, setStatus] = useState('')
    //     const [jap, setJap] = useState('')

    //     useEffect( () => {
    //         jikan.loadAnime(42897)
    //         .then( resu => {
    //             // console.log(resu)
    //             setTrailer(resu.trailer_url)
    //             setStatus(resu.status)
    //             setJap(resu.title_japanese)
    //         })
    //     }, [])
        
    //     // console.log(trailer.split('=').slice(0,3).join('=') + '=0')

    //     return(
    //         <>
    //         <Typography variant='h4' align='left' className={classes.title}>
    //             Featured
    //         </Typography>
    //         {/* <Carousel 
    //             mouseTracking
    //             items={page.map( (i,index) )}
    //         /> */}
    //         <Box className={classes.featuredImg}>
    //             <Box className={classes.featureContainer}>
    //                 <Box className={classes.details}>
    //                     <Typography variant='h3'  className={classes.featuredTitle}>
    //                         {page[7].title}
    //                     </Typography>
    //                     <Typography variant='h6'>
    //                         Japanese: {jap}
    //                     </Typography>
    //                     <Typography variant='h6' className={classes.status}>
    //                         Status: {status}
    //                     </Typography>
    //                     <Typography variant='h6' className={classes.genre}>
    //                         Genre: 
    //                     </Typography>
    //                     <Typography variant='h6' className={classes.genre}>
    //                         {page[7].genres.map( (i,index) => (<span key={index}>{i.name} </span>))}
    //                     </Typography>
    //                     <Box className={classes.btnContainer}>
    //                         <Link to={'/details/' + page[7].title} className={classes.link}>
    //                             <Button variant='contained' className={classes.btnWatch}>
    //                                 Details
    //                             </Button>
    //                         </Link>
    //                     </Box>
    //                 </Box>
                
    //                 <iframe src={trailer.split('=').slice(0,3).join('=') + '=0'} frameBorder='0' className={classes.trailer}/>

    //             </Box>
    //         </Box>
    //         </>
    //     )
    // }

        // jikan.loadAnime(42897)
        // .then(resu => {
        //     console.log(resu)
        //     setHori(resu)
        // })
    const items = [
        <img src='https://zjcdn.mangahere.org/store/manga/15241/001.0/compressed/o001.jpg' alt='' />,
        <img src='https://zjcdn.mangahere.org/store/manga/15241/001.0/compressed/o001.jpg' alt='' />,
        <img src='https://zjcdn.mangahere.org/store/manga/15241/001.0/compressed/o001.jpg' alt='' />,
    ]
    return loading ? <Loading /> : (
        <Paper square className={classes.root}>
            {/* <Featured page={page} /> */}
            {/* <Features /> */}
            <Typography variant='h4' align='left' className={classes.title}>
                Featured
            </Typography>
            <Carousel 
                mouseTracking
                items={page.map( (i,index) => <Featured page={page} id={i.mal_id} image={i.image_url} key={index} index={index} />)}
                autoPlay
                autoHeight
                autoPlayInterval='3000'
                infinite
                disableButtonsControls
                disableDotsControls={window.innerWidth < 600 ? true : false }
                touchTracking
                
            />
            
            <Typography variant='h4' align='left' className={classes.title}>
                Top Season Ongoing
            </Typography>
            <Paper className={classes.topSeasonPaper}>

                {/* <img className={classes.img} src='https://media.kitsu.io/anime/cover_images/7164/original.jpg?1597700936' alt='' /> */}

                {/* <img src='https://media.kitsu.io/anime/poster_images/43545/original.jpg?1609224996' alt=''/>     */}

                <Carousel 
                    mouseTracking
                    items={page.map( i => (
                        <div>
                            <img src={i.image_url} alt='' />
                            <Typography>
                                {i.title}
                            </Typography>
                        </div>
                    ))}
                    responsive={res}
                    autoPlay
                    disableButtonsControls
                    autoPlayInterval='5000'
                    infinite
                    touchTracking
                    disableDotsControls={window.innerWidth < 600 ? true : false }
                    animationType
                />
                <Grid container spacing={2} className={classes.gridContainer}>
                    {/* {page.map( (i,index) => (
                        <Grid item xs={6} sm={3} key={index}>
                        <img src={i.image_url} alt='' />
                        <Typography>
                            {i.title}
                        </Typography>
                    
                        </Grid>
                    ))} */}
                </Grid>
               
            </Paper>
        </Paper>
    )
}

export default Home