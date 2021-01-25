import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, CardActionArea, CardContent, CardMedia, Grid, makeStyles, Typography } from '@material-ui/core'
import Loading from './Loading'

const useStyles = makeStyles({
    root: {
        maxWidth: 300,
        maxHeight: 354
    },
    image: {
        maxWidth: 200,
        maxHeight: 'auto'
    }
})

function PopularList() {
    const classes = useStyles()
    const [popular, setPopular] = useState([])
    const [loading, setLoading] = useState(true)
    const [title, setTitle] = useState('')

    useEffect( () => {
        axios.get('https://anime-x.vercel.app/api/popular/1')
        .then( res => {
            console.log(res)
            setPopular(res.data)
            setLoading(false)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])
    console.log(title)
    return loading ? <Loading /> : (
        <>
            {popular.results.map( list => (
                <Grid align='center' item xs={12} sm={3} key={list.id}>
                    <Card className={classes.root} >
                        <CardActionArea onClick={ () => setTitle(list.id)}>
                            <CardMedia 
                                title={list.id}
                                image={list.image}
                                component='img'
                                className={classes.image}
                            />
                            <CardContent>
                                <Typography>{list.title}</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}   
        </>
    )
}

export default PopularList