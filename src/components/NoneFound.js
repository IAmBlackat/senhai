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
                <img className={classes.gif} src='https://media1.tenor.com/images/f8ebac90fb5c4aeb4d73945c63b5cc9d/tenor.gif?itemid=15005984' alt='' />
                </Box>
                <Typography variant='h5' className={classes.cap}>
                    Sorry nothing found
                </Typography>
            </Paper>
        </Container>
    )
}

export default NoneFound