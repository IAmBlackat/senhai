import { Box, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const Bg = ({ image, title, genre }) => {
    const style = makeStyles( (theme) => ({
        backgroundImgContainer: {
            height: '350px',
            width: '100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundBlendMode: 'darken',
            background: `rgba(0, 0, 0, 0.1) url(${image})`,
            position: 'relative',
            mozBoxShadow:    '4px -114px 164px -66px rgba(0,0,0,0.88) inset',
            webkitBoxShadow: '4px -114px 164px -66px rgba(0,0,0,0.88) inset',
            boxShadow:         '4px -83px 134px -34px rgba(0,0,0,1.95) inset',
        },
        titleContainer: {
            position: 'absolute',
            bottom: 10,
            marginLeft: 10,
            width: '90%', 
            textAlign: 'left',
        },
        title: {
            fontSize: 25,
            fontWeight: 'bold',
            [theme.breakpoints.down('xs')]:{
                fontSize: 17
            }
        },
        genre: {
            fontSize: 14,
            opacity: 0.8
        }
    }))
    return (
        <Box className={style().backgroundImgContainer} >
            <Box className={style().titleContainer} >     
                <Typography className={style().title} >{title}</Typography>
                <Typography className={style().genre} >{genre}</Typography>
            </Box>
        </Box>
    )
}

export default Bg