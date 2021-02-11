import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, IconButton, makeStyles, Typography } from '@material-ui/core'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import 'react-alice-carousel/lib/alice-carousel.css'
import './carousel.css'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AliceCarousel from 'react-alice-carousel'

const useStyles= makeStyles( () => ({
    root: {
        position: 'relative', 
        textAlign: 'right'
    },
    seasonalList: {
        maxWidth: 200,
        maxHeight: 400,
        boxShadow: '5px 5px 25px #212121',
    },
    seasonalListImg: {
        height: '270px',
        backgroundColor: '#121212'

    },
    btnContainer: {
        textAlign: 'right',
        height: '70px'
    }
}))

function OngoingCarousel( { page, res } ) {
    const classes = useStyles()
    const [imgLoad, setImgLoad] = useState(true)

    return(
        <Box className={classes.root} >
            <Box alignItems='center' className={classes.btnContainer} >
                {/* this is container for carousel arrows overrided from carousel.css */}
            </Box>
            
            <AliceCarousel 
                mouseTracking
                items={page.map( i => (
                    <Grid align='center'>
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
                ))}
                responsive={res}
                height='300px'  
                // autoPlay
                // disableButtonsControls
                disableDotsControls
                // autoPlayInterval='5000'
                infinite
                // touchTracking
                // disableDotsControls={window.innerWidth < 600 ? true : false }
               
            />
        </Box>
    )
}

export default OngoingCarousel