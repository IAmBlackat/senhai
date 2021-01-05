import { Box, Container, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'

const useStyle = makeStyles({
    root: {
        height: '71vh'
    },
    gif: {
        width: '100%'
    },
    box: {
        width: '60%'
    },
    cap: {
        marginTop: '1em'
    }
})

function NoneFound() {
    const classes = useStyle()
    return(
        <Container maxWidth='md'>
            <Paper className={classes.root} elevation={0}>
                <Box className={classes.box}>
                <img className={classes.gif} src='https://i.pinimg.com/originals/25/e0/45/25e0450a39f1c01fef9cac41a2da14bb.gif' alt='' />
                </Box>
                <Typography variant='h5' className={classes.cap}>
                    Sorry nothing found
                </Typography>
            </Paper>
        </Container>
    )
}

export default NoneFound