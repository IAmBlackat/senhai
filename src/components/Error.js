import { Button, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

const useStyle = makeStyles( (theme) => ({
    root: {
        height: '91.5vh'
    },
    img: {
        padding: '2%',
        width: '80%',
        [theme.breakpoints.up('sm')]: {
            width: '55%'
        },
    },
    btn: {
        margin: '20px',
        padding: '10px'
    },
    link: {
        textDecoration: 'none'
    }
}))

function Error() {
    return(
        <Paper square className={useStyle().root} >
            <img 
                className={useStyle().img} 
                src='https://64.media.tumblr.com/6261fd9f8d871389d1efa94da25609f9/tumblr_nujz858dXb1tydz8to1_540.gifv' 
                alt=''
            />
            <Typography variant='h4'>
                Please Don't Wake Her Up
            </Typography>
            <Link to='/' className={useStyle().link}>
                <Button className={useStyle().btn} variant='outlined'>
                    Go Back
                </Button>
            </Link>
        </Paper>
    )
}

export default Error