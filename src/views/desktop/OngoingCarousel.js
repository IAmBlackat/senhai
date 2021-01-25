import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, IconButton, makeStyles, Typography } from '@material-ui/core'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import 'react-alice-carousel/lib/alice-carousel.css'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AliceCarousel from 'react-alice-carousel'

const useStyles= makeStyles( () => ({
    seasonalList: {
        maxWidth: 200,
        maxHeight: 400,
        boxShadow: '5px 5px 25px #212121',
    },
    seasonalListImg: {
        height: '270px',

    },
    btnContainer: {
        textAlign: 'right',
    },
    iconButton: {
        border: '1px solid grey',
        margin: '10px'
    },

}))

function OngoingCarousel( { page, res } ) {
    const classes = useStyles()
    const [imgLoad, setImgLoad] = useState(true)
    const [activeIndex, setActiveIndex] = useState(0)

    const prev = () => setActiveIndex(activeIndex - 1)
    const next = () => setActiveIndex(activeIndex + 1)
    const slideChange = ({ item }) => setActiveIndex(item)

    return(
        <Box>
            <Box alignItems='center' className={classes.btnContainer}>
                <IconButton onClick={prev} className={classes.iconButton} >
                    <NavigateBeforeIcon fontSize='small' />
                </IconButton>
                <IconButton onClick={next} className={classes.iconButton}>
                    <NavigateNextIcon fontSize='small' />
                </IconButton>
            </Box>
            
            <AliceCarousel 
                mouseTracking
                items={page.map( i => (
                    <div style={{width: '100%'}}>
                        <Grid align='center' style={{width: '100%'}}>
                            <Card className={classes.seasonalList}>
                                <CardActionArea 
                                    component={Link} 
                                    to={'/search/' + i.title.replace(/[^a-zA-Z0-9]/g, ' ').split(' ').filter( e => e.trim() ).join(' ')}
                                    // onClick={ () => dispatch(searchAnime(i.title.replace(/[^a-zA-Z0-9]/g, ' ').split(' ').filter( e => e.trim() ).join(' ')))}
                                >
                                    <CardMedia 
                                        image={imgLoad ? 'https://media1.tenor.com/images/c184317a395883494f73b6fe8d2acf70/tenor.gif?itemid=18008963' : i.image_url}
                                        component='img'
                                        onLoad={ () => setImgLoad(false)}
                                        className={classes.seasonalListImg}
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
                disableDotsControls
                autoPlayInterval='5000'
                infinite
                // touchTracking
                // disableDotsControls={window.innerWidth < 600 ? true : false }
                activeIndex={activeIndex}
                onSlideChanged={slideChange}
            />
        </Box>
    )
}

export default OngoingCarousel