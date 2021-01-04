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
            width: '40%'
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
                src='https://78.media.tumblr.com/bb8f1a49c91d5c8333c94c61f1141e90/tumblr_o2d04w4ow81ub2z4po2_500.gif' 
                alt=''
            />
            <Typography variant='h4'>
                "Error 404 not found"
            </Typography>
            <Link to='/' className={useStyle().link}>
                <Button className={useStyle().btn} variant='contained'>
                    Go Home
                </Button>
            </Link>
        </Paper>
    )
}

export default Error