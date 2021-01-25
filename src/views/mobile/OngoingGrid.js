import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const useStyles = makeStyles( () => ({
    seasonalList: {
        maxWidth: 190,
        maxHeight: 400,
        boxShadow: '5px 5px 25px #212121',
    },
    img: {
        // width: '200px',
        height: '190px',
        objectFit: 'cover'
    }
}))

function OngoingGrid({ page }) {
    const classes = useStyles()
    const [imgLoad, setImgLoad] = useState(true)

    return(
        <Box>
            <Grid container spacing={1} align='center' className={classes.gridContainer}>
                    {page.map( (i,index) => (
                        <Grid item xs={6} sm={3} key={index}>
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
                                        className={classes.img}
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
    )
}

export default OngoingGrid