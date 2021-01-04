import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, CardActionArea, CardContent, CardMedia, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import Loading from '../components/Loading'
import { useDispatch } from 'react-redux'
import { checkDetails } from '../redux/action'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
    root: {
        maxWidth: 300,
        maxHeight: 354
    },
    image: {
        maxWidth: 200,
        maxHeight: 'auto'
    },
    title: {
        padding: '40px'
    },
    decor: {
        textDecoration: 'none'
    }
})

function Popular() {
    const classes = useStyles()
    const [popular, setPopular] = useState([])
    const [loading, setLoading] = useState(true)

    const dispatch = useDispatch()
    
    const url = 'https://anime-x.vercel.app/api/popular/1'
    useEffect( () => {
        axios.get(url)
        .then( res => {
            setPopular(res.data)
            setLoading(false)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])
    

    return loading ? <Loading /> : (
        <Paper elevation={0} square>
            <Typography variant='h4' className={classes.title}>Popular</Typography>

            <Grid container spacing={2} align='center'>
                {popular.results.map( list => (
                    <Grid  item xs={12} sm={3} key={list.id}>
                        <Link to={'/details/'+list.id+'/'} className={classes.decor}>
                            <Card className={classes.root} >
                                <CardActionArea onClick={ () => dispatch(checkDetails(list.id))}>
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
                        </Link>
                    </Grid>
                ))}   
            </Grid>
        </Paper>
    )
}

export default Popular