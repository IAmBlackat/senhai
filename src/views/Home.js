import React, { useEffect, useState } from 'react'
import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import jikan from 'jikanjs'
import Loading from '../components/Loading'
import Carousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import { Link } from 'react-router-dom'
import Featured from '../components/Featured'
import { useDispatch } from 'react-redux'
import { searchAnime } from '../redux/action'
import Schedule from '../components/Schedule'
import Upcoming from '../components/Upcoming'

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
        [theme.breakpoints.down('xs')]: {
            margin: '0px',
            padding: '10px'
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
    },
    seasonalList: {
        maxWidth: 200,
        maxHeight: 400,
        boxShadow: '5px 5px 25px #212121',
    },
    mobile: {
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        }
    },
    desktop: {  
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    },
    sched_list_wrapper: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    scheduleContainer: {
        width: '27%',
        [theme.breakpoints.down('xs')]:{
            margin: 'auto',
            width: '100%',
        }
    },
    upcomingSeasonContainer:{
        width: '65%'
    }

}))

function Home() {
    const classes = useStyles()
    const [lists, setLists] = useState([])
    const [imgLoad, setImgLoad] = useState(true)
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState()
    
    useEffect( () => {
        let unmount = false
        jikan.loadSeason( 2021, 'winter')
        .then( res => {
            if(!unmount) {
                // console.log(res)
                setLists(res.anime)
                var pages = []
                for( var a = 0; a < 40; a++ ) {
                    pages.push(res.anime[a])
                }
                setPage(pages)
                // var items = []
                // for( var a = 0; a < 10; a++ ) {
                //     items.push(<Featured page={pages} id={pages[a].mal_id} image={pages[a].image_url} index={a} />)
                // }
                var item = [
                    <Featured page={pages} id={pages[0].mal_id} image={pages[0].image_url} index={0} />,
                    <Featured page={pages} id={pages[1].mal_id} image={pages[1].image_url} index={1} />,
                    <Featured page={pages} id={pages[2].mal_id} image={pages[2].image_url} index={2} />,
                    <Featured page={pages} id={pages[3].mal_id} image={pages[3].image_url} index={3} />,
                    <Featured page={pages} id={pages[4].mal_id} image={pages[4].image_url} index={4} />,
                    <Featured page={pages} id={pages[5].mal_id} image={pages[5].image_url} index={5} />,
                    <Featured page={pages} id={pages[6].mal_id} image={pages[6].image_url} index={6} />,
                    <Featured page={pages} id={pages[7].mal_id} image={pages[7].image_url} index={7} />,
                    <Featured page={pages} id={pages[8].mal_id} image={pages[8].image_url} index={8} />,
                    <Featured page={pages} id={pages[9].mal_id} image={pages[9].image_url} index={9} />,
                ]

                setLists(item)
                setLoading(false)
            }
        })
        .catch( err => console.log(err))
        return () => unmount = true
    }, [])
    // console.log(page)
    // let a = '5-toubun no Hanayome ∬'
    // console.log(a.replace(/[^a-zA-Z0-9]/g, ' ').split(' ').filter( e => e.trim() ).join(' ') )

    const res = {
        500: {
            items: 2
        },
        740: {
            items: 3
        },
        1024: {
            items: 4
        },
        1400: {
            items: 6
        }
    }


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

    // const state = useSelector( state => state.play)
    const dispatch = useDispatch()
    // let d = new Date('2020-04-18T00:00:00+00:00').toLocaleString("en-US", "Asia/Tokyo")
    // console.log(d.toLocaleTimeString('en-us', 'Asia/Tokyo'))
    // console.log(d)
    // jikan.loadAnime(40028).then( res => console.log(res))
    // jikan.loadSchedule('wednesday').then( res => console.log(res))

    return loading ? <Loading /> : (
        <Paper square className={classes.root}>
            {/* <Featured page={page} /> */}
            {/* <Features /> */}
            {/* {console.log(page)} */}
            {/* <audio src='https://animethemes.moe/video/JakuCharaTomozakiKun-OP1.webm' controls typeof='audio/mpeg' /> */}
            <Typography variant='h4' align='left' className={classes.title}>
                Featured
            </Typography>
            {/* <iframe src='https://animethemes.moe/video/ShingekiNoKyojinS4-OP1.webm' allowFullScreen />  */}
            {/* <video src='https://v2.4animu.me/Yuru-Camp-S2/Yuru-Camp-S2-Episode-01-1080p.mp4' autoPlay={false} controls /> */}

            {/* <Featured page={page} id={page[0].mal_id} image={page[0].image_url} index={0} /> */}
            <Carousel 
                mouseTracking
                // items={page.map( (i,index) => <Featured page={page} id={i.mal_id} image={i.image_url} key={index} index={index} />)}
                items={lists}
                // autoPlayControls={state ? false: true}
                // autoPlayStrategy
                autoPlay
                // renderPlayPauseButton={state === undefined ? 'PLAY' : state ? 'PAUSE' : 'PLAY'}
                // renderPlayPauseButton
                // autoHeight
                // playButtonEnabled
                // onSlideChange={state ? false : true} ={state === undefined ? true : state ? true : false}
                autoPlayInterval='10000'
                infinite
                disableButtonsControls
                disableDotsControls={window.innerWidth < 600 ? true : false }
                touchTracking
                autoPlayActionDisabled
                height='500px'
            />

            <Typography variant='h4' align='left' className={classes.title}>
                Winter 2021 Ongoing
            </Typography>
            <Paper className={classes.topSeasonPaper}>

                {/* <img className={classes.img} src='https://media.kitsu.io/anime/cover_images/7164/original.jpg?1597700936' alt='' /> */}

                {/* <img src='https://media.kitsu.io/anime/poster_images/43545/original.jpg?1609224996' alt=''/>     */}
                <Box className={classes.desktop}>
                    <Carousel 
                        mouseTracking
                        items={page.map( i => (
                            <div>
                                <Grid align='center'>
                                    <Card className={classes.seasonalList}>
                                        <CardActionArea 
                                            component={Link} 
                                            to={'/search/' + i.title.replace(/[^a-zA-Z0-9]/g, ' ').split(' ').filter( e => e.trim() ).join(' ')}
                                            onClick={ () => dispatch(searchAnime(i.title.replace(/[^a-zA-Z0-9]/g, ' ').split(' ').filter( e => e.trim() ).join(' ')))}
                                        >
                                            <CardMedia 
                                                image={imgLoad ? 'https://media1.tenor.com/images/c184317a395883494f73b6fe8d2acf70/tenor.gif?itemid=18008963' : i.image_url}
                                                component='img'
                                                onLoad={ () => setImgLoad(false)}
                                            />
                                            <CardContent>
                                                <Typography variant='inherit'>
                                                    {i.title}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            </div>
                        ))}
                        responsive={res}
                        height='300px'
                        autoPlay
                        disableButtonsControls
                        autoPlayInterval='3000'
                        infinite
                        // touchTracking
                        disableDotsControls={window.innerWidth < 600 ? true : false }
                        animationType
                    />
                </Box>

                <Box className={classes.mobile}>
                    <Grid container spacing={2} align='center' className={classes.gridContainer}>
                        {page.map( (i,index) => (
                            <Grid item xs={6} sm={3} key={index}>
                                <Card className={classes.seasonalList}>
                                    <CardActionArea
                                        component={Link} 
                                        to={'/search/' + i.title.replace(/[^a-zA-Z0-9]/g, ' ').split(' ').filter( e => e.trim() ).join(' ')}
                                        onClick={ () => dispatch(searchAnime(i.title.replace(/[^a-zA-Z0-9]/g, ' ').split(' ').filter( e => e.trim() ).join(' ')))}
                                    >
                                        <CardMedia 
                                            image={imgLoad ? 'https://media1.tenor.com/images/c184317a395883494f73b6fe8d2acf70/tenor.gif?itemid=18008963' : i.image_url}
                                            component='img'
                                            onLoad={ () => setImgLoad(false)}
                                        />
                                        <CardContent>
                                            <Typography style={{ textOverflow: 'ellipsis'}} variant='body2'>
                                                {i.title}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Paper>
            
            <Box className={classes.sched_list_wrapper}>
                <Box className={classes.scheduleContainer}>
                    <Typography variant='h4' align='left' className={classes.title}>
                        Schedule (JST)
                    </Typography>
                    
                    <Schedule />
                </Box>
                {/* <Box className={classes.upcomingSeasonContainer}>
                    <Typography variant='h4' align='left' className={classes.title}>
                        Upcoming Season
                    </Typography>
                    <Upcoming />
                </Box> */}
            </Box>
        </Paper>
    )
}

export default Home