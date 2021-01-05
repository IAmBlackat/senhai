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
                src='https://media1.tenor.com/images/6db6d393f50f2ee9df4058b95f0b21a1/tenor.gif?itemid=13628544' 
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