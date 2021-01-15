import { Box, makeStyles, Paper, Typography } from '@material-ui/core'
import jikan from 'jikanjs'
import React, { useEffect, useState } from 'react'
import { SchedList } from './SchedList'

const useStyles = makeStyles( (theme) => ({
    root: {
        margin: '20px',
        // margin: 'auto',
        padding: '10px',
        width: '30%',
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
            const abortController = new AbortController()
            const signal = abortController.signal

            jikan.loadSchedule('monday',{ signal: signal}).then( res => {
                setList(res.monday)
            })
            .catch( err => console.log(err, "eroor"))

            return () => {
                console.log('unmounted')
            }
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
            jikan.loadSchedule('tuesday').then( res => {
                setList(res.tuesday)
            })
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
            jikan.loadSchedule('wednesday').then( res => {
                setList(res.wednesday)
            })
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
            jikan.loadSchedule('thursday').then( res => {
                setList(res.thursday)
            })
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
            jikan.loadSchedule('friday').then( res => {
                setList(res.friday)
            })
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
            jikan.loadSchedule('saturday').then( res => {
                setList(res.saturday)
            })
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
        //https://cors-anywhere.herokuapp.com/
        useEffect( () => {
            jikan.loadSchedule('sunday').then( res => {
                setList(res.sunday)
            })
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