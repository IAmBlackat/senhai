import { Box, Button, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'
import bg from '../assets/download1.png'
import apk from '../assets/senhai.apk'

const styles = makeStyles( (theme) => ({
    featuredImg: {
        position: 'relative',
        height: '700px',
        width: '100%',
        background: 'rgba(0, 0, 0, .45) url(' + bg + ')',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundBlendMode: 'darken',
        [theme.breakpoints.down('xs')]: {
            height: '320px'
        }
    },
    container: {
        padding: '50px',
        paddingTop: '80px',
        // position: 'absolute',
        // top: '50%',
        // left: '50%',
        [theme.breakpoints.down('xs')]: {
            padding: '20px',
        }
    },
    announcement: {
        letterSpacing: '0.5px',
        fontSize: '20px',
        // color: '#f55858',
        fontFamily: 'Nunito',
        textDecoration: 'underline',
        [theme.breakpoints.down('xs')]: {

        }
    },
    beta: {
        fontSize: '60px',
        padding: '20px',
        paddingBottom: '10px',
        letterSpacing: '0.5px',
        color: '#79C7F5',
        [theme.breakpoints.down('xs')]: {
            fontSize: '25px',
        },
        fontFamily: 'Nunito',
    },
    subtext: {
        padding: '10px',
        fontFamily: 'Nunito',
        letterSpacing: '0.5px',
        fontSize: '40px',
        color: '#79C7F5',
        [theme.breakpoints.down('xs')]: {
            fontSize: '17px',     
        }
    },
    btn: {
        marginTop: '30px',
        borderRadius: '20px',
        fontFamily: 'Nunito',
        // padding: '20px',
        color: '#79C7F5',
        [theme.breakpoints.down('xs')]: {
            
        }
    },
    version: {
        color: '#79C7F5',
        fontFamily: 'Nunito',
        fontSize: '15px',
        padding: 2
    }
}))

export default function Download() {
    const classes = styles()
    return (
        <Paper className={classes.featuredImg} >
            <Box className={classes.container} >
                {/* <Typography className={classes.announcement} align='left' >Announcement</Typography> */}
                <Typography className={classes.beta} >We Are Now On Beta</Typography>
                <Typography className={classes.subtext} >Now Available On Android</Typography>
                <Button href={apk} size='large' download='senhai' variant='outlined' className={classes.btn} >Dowload Now!</Button>
                <Typography className={classes.version} id='version' >v1.13</Typography>
            </Box>
        </Paper>
    )
}