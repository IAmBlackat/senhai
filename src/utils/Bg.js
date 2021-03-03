import { Box, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const Bg = ({ image, title, genre }) => {
    const style = makeStyles( (theme) => ({
        backgroundImgContainer: {
            height: '330px',
            width: '100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundBlendMode: 'darken',
            background: `rgba(0, 0, 0, .15) url(${image})`,
            position: 'relative',
            mozBoxShadow:    '4px -114px 164px -66px rgba(0,0,0,0.88) inset',
            webkitBoxShadow: '4px -114px 164px -66px rgba(0,0,0,0.88) inset',
            boxShadow:         '4px -83px 134px -34px rgba(0,0,0,0.75) inset',
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
            [theme.breakpoints.down('xs')]:{
                fontSize: 18
            }
        },
    }))
    return (
        <Box className={style().backgroundImgContainer} >
            <Box className={style().titleContainer} >     
                <Typography className={style().title} >{title}</Typography>
                <Typography variant='subtitle2' >Genre: {genre}</Typography>
            </Box>
        </Box>
    )
}

export default Bg