import React, { useEffect, useState } from 'react'
import { Box, Button, makeStyles, Paper, Typography } from '@material-ui/core'
import jikan from 'jikanjs'
import Loading from '../components/Loading'
import Carousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import Featured from '../components/Featured'
import Schedule from '../components/Schedule'
import Upcoming from './desktop/Upcoming'
import OngoingCarousel from './desktop/OngoingCarousel'
import OngoingGrid from './mobile/OngoingGrid'
import Download from './Download'

const useStyles = makeStyles( (theme) => ({
    root: {
        height: 'auto',
        paddingBottom: '10px',
        backgroundColor: '#121212'
    },
    title: {
        padding: '25px'
    },
    ongoingSeason: {
        width: 'auto',
        margin: '20px',
        padding: '20px',
        [theme.breakpoints.down('xs')]: {
            margin: '0px',
            padding: '10px'
        }
        
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
        width: '25%',
        [theme.breakpoints.down('xs')]:{
            margin: 'auto',
            width: '100%',
        }
    },
    upcomingSeasonContainer:{
        width: '72%',
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    }

}))

function Home() {
    const classes = useStyles()
    const [lists, setLists] = useState([])
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

    // const items = [
    //     <img src='https://zjcdn.mangahere.org/store/manga/15241/001.0/compressed/o001.jpg' alt='' />,
    //     <img src='https://zjcdn.mangahere.org/store/manga/15241/001.0/compressed/o001.jpg' alt='' />,
    //     <img src='https://zjcdn.mangahere.org/store/manga/15241/001.0/compressed/o001.jpg' alt='' />,
    // ]

    // jikan.loadAnime(40028, 'videos').then( res => console.log(res))
    
    return loading ? <Loading /> : (
        <Paper square className={classes.root}>
            <Download />
            {/* <Typography variant='h4' align='left' className={classes.title}>
                Featured
            </Typography> */}
            {/* <iframe src='https://animethemes.moe/video/ShingekiNoKyojinS4-OP1.webm' allowFullScreen />  */}
            {/* <video src='https://v2.4animu.me/Yuru-Camp-S2/Yuru-Camp-S2-Episode-01-1080p.mp4' autoPlay={false} controls /> */}

            {/* <Carousel 
                mouseTracking
                // items={page.map( (i,index) => <Featured page={page} id={i.mal_id} image={i.image_url} key={index} index={index} />)}
                items={lists}
                // autoPlayControls
                // autoPlayStrategy={on ? 'action' : 'default'}
                autoPlay
                // renderPlayPauseButton={state === undefined ? 'PLAY' : state ? 'PAUSE' : 'PLAY'}
                renderPlayPauseButton   
                // autoHeight
                // playButtonEnabled='true'
                autoPlayInterval='10000'
                infinite
                disableButtonsControls
                // disableDotsControls={window.innerWidth < 600 ? true : false }
                disableDotsControls
                touchTracking
                autoPlayActionDisabled
                height='500px'
            /> */}

            <Typography variant='h4' align='left' className={classes.title}>
                Winter 2021 Ongoing
            </Typography>
            
            <Paper className={classes.ongoingSeason}>

                <Box className={classes.desktop}>
                   <OngoingCarousel page={page} res={res} />
                </Box>
                

                <Box className={classes.mobile}>
                  <OngoingGrid page={page} />
                </Box>

            </Paper>
            
            <Box className={classes.sched_list_wrapper}>
                <Box className={classes.scheduleContainer}>
                    <Typography variant='h4' align='left' className={classes.title}>
                        Schedule
                    </Typography>
                    <Schedule />
                </Box>

                <Box className={classes.upcomingSeasonContainer}>
                    <Typography variant='h4' align='left' className={classes.title}>
                        Upcoming Season
                    </Typography>
                    <Upcoming />
                </Box>

            </Box>
        </Paper>
    )
}

export default Home