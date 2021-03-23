import { Box, Divider, makeStyles, Paper, Typography } from '@material-ui/core'
import jikan from 'jikanjs'
import React, { useEffect, useState } from 'react'
import { SchedList } from './SchedList'
import { Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday } from './Days'

const useStyles = makeStyles( (theme) => ({
    root: {
        margin: '20px',
        // margin: 'auto',
        padding: '10px',
        width: '90%',
        [theme.breakpoints.down('xs')]:{
            margin: 'auto',
            width: '95%',
        }
    },
    title: {
        marginTop: '3px',
        marginBottom: '3px'
    }
}))

function Schedule() {
    const classes = useStyles()
    return(
        <Paper className={classes.root}>
            <Monday />
            <Tuesday />
            <Wednesday />
            <Thursday />
            <Friday />      
            <Saturday />
            <Sunday />
        </Paper>
    )
}

export default Schedule