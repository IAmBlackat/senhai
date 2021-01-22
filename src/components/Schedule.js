import { Box, makeStyles, Paper, Typography } from '@material-ui/core'
import jikan from 'jikanjs'
import React, { useEffect, useState } from 'react'
import { SchedList } from './SchedList'

const useStyles = makeStyles( (theme) => ({
    root: {
        margin: '20px',
        // margin: 'auto',
        padding: '10px',
        width: '27%',
        [theme.breakpoints.down('xs')]:{
            margin: 'auto',
            width: '90%',
        }
    },
    title: {
        marginTop: '3px',
        marginBottom: '3px'
    }
}))

function Schedule() {
    const classes = useStyles()

    const Monday = () => {
        const [list, setList] = useState([])
        useEffect( () => {
            let unmount = false
            jikan.loadSchedule('monday')
                .then( res => !unmount ? setList(res.monday) : null )
                .catch( err => console.log(err))
            
            return () => unmount = true
        }, [])

        return(
            <div>
                <Typography variant='h6' align='left' className={classes.title}>
                    Monday
                </Typography>
                <SchedList list={list} />
            </div>
        )
    }

    const Tuesday = () => {
        const [list, setList] = useState([])
        useEffect( () => {
            let unmount = false
            jikan.loadSchedule('tuesday')
                .then( res => !unmount ? setList(res.tuesday) : null )
                .catch( err => console.log(err))

            return () => unmount = true
        }, [])
        return(
            <div>
                <Typography variant='h6' align='left' className={classes.title}>
                    Tuesday
                </Typography>
                <SchedList list={list} />
            </div>
        )
    }

    const Wednesday = () => {
        const [list, setList] = useState([])
        useEffect( () => {
            let unmount = false
            jikan.loadSchedule('wednesday')
                .then( res => !unmount ? setList(res.wednesday) : null )
                .catch( err => console.log(err))

            return () => unmount = true
        }, [])
        return(
            <div>
                <Typography variant='h6' align='left' className={classes.title}>
                    Wednesday
                </Typography>
                <SchedList list={list} />
            </div>
        )
    }

    const Thursday = () => {
        const [list, setList] = useState([])
        useEffect( () => {
            let unmount = false
            jikan.loadSchedule('thursday')
                .then( res => !unmount ? setList(res.thursday) : null )
                .catch( err => console.log(err))

            return () => unmount = true
        }, [])
        return(
            <div>
                <Typography variant='h6' align='left' className={classes.title}>
                    Thursday
                </Typography>
                <SchedList list={list} />
            </div>
        )
    }

    const Friday = () => {
        const [list, setList] = useState([])
        useEffect( () => {
            let unmount = false
            jikan.loadSchedule('friday')
                .then( res => !unmount ? setList(res.friday) : null )
                .catch( err => console.log(err))

            return () => unmount = true
        }, [])
        return(
            <div>
                <Typography variant='h6' align='left' className={classes.title}>
                    Friday
                </Typography>
                <SchedList list={list} />
            </div>
        )
    }

    const Saturday = () => {
        const [list, setList] = useState([])
        useEffect( () => {
            let unmount = false
            jikan.loadSchedule('saturday')
                .then( res => !unmount ? setList(res.saturday) : null )
                .catch( err => console.log(err))

            return () => unmount = true
        }, [])
        return(
            <div>
                <Typography variant='h6' align='left' className={classes.title}>
                    Saturday
                </Typography>
                <SchedList list={list} />
            </div>
        )
    }

    const Sunday = () => {
        const [list, setList] = useState([])
        useEffect( () => {
            let unmount = false
            jikan.loadSchedule('sunday')
                .then( res => !unmount ? setList(res.sunday) : null )
                .catch( err => console.log(err))

            return () => unmount = true
        }, [])
        return(
            <div>
                <Typography variant='h6' align='left' className={classes.title}>
                    Sunday
                </Typography>
                <SchedList list={list} />
            </div>
        )
    }


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