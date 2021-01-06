import { Box, Container, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'

const useStyle = makeStyles( (theme) => ({
    root: {
        height: 'auto'
    },
    gif: {
        width: '100%'
    },
    box: {
        width: '90%',
        // [theme.breakpoints.up('sm')]: {
        //     width: '90%'
        // }
    },
    cap: {
        marginTop: '1em'
    }
}))

function NoneFound() {
    const classes = useStyle()
    return(
        <Container maxWidth='md'>
            <Paper className={classes.root} elevation={0}>
                <Box className={classes.box}>
                    <img className={classes.gif} src='https://media0.giphy.com/media/U6kGxfqszGeUBFnOT8/giphy.gif' alt='' />
                </Box>
                <Typography variant='h5' className={classes.cap}>
                    Sorry nothing found
                </Typography>
            </Paper>
        </Container>
    )
}

export default NoneFound