import { Box, makeStyles, Paper, Typography } from '@material-ui/core'
import jikan from 'jikanjs'
import React, { useEffect, useState } from 'react'
import { SchedList } from './SchedList'

const useStyles = makeStyles( (theme) => ({
    root: {
        margin: '20px',
        // margin: 'auto',
        padding: '10px',
        width: '25%',
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
        const [time, setTime] = useState([])
        useEffect( () => {
            let unmount = false

            jikan.loadSchedule('monday').then( res => {
                if(!unmount){
                    setList(res.monday)
                    var time = []
                    res.monday.map( i => {
                        var d = new Date(i.airing_start)
                        var a = d.toLocaleTimeString().split(' ')[0].split(':')
                        a.pop() 
                        time.push(a.join(':') + ' ' + d.toLocaleTimeString().split(' ')[1])
                    })
                    setTime(time)
                }
            })
            .catch( err => console.log(err))

            return () => unmount = true
        }, [])

        return(
            <div>
                <Typography variant='h6' align='left' className={classes.title}>
                    Monday
                </Typography>
                <SchedList list={list} time={time} />
            </div>
        )
    }

    const Tuesday = () => {
        const [list, setList] = useState([])
        const [time, setTime] = useState([])
        useEffect( () => {
            let unmount = false

            jikan.loadSchedule('tuesday').then( res => {
                if(!unmount){
                    setList(res.tuesday)
                    var time = []
                    res.tuesday.map( i => {
                        var d = new Date(i.airing_start)
                        var a = d.toLocaleTimeString().split(' ')[0].split(':')
                        a.pop() 
                        time.push(a.join(':') + ' ' + d.toLocaleTimeString().split(' ')[1])
                    })
                    setTime(time)
                }
            })
            .catch( err => console.log(err))

            return () => unmount = true
        }, [])
        return(
            <div>
                <Typography variant='h6' align='left' className={classes.title}>
                    Tuesday
                </Typography>
                <SchedList list={list} time={time} />
            </div>
        )
    }

    const Wednesday = () => {
        const [list, setList] = useState([])
        const [time, setTime] = useState([])
        useEffect( () => {
            let unmount = false

            jikan.loadSchedule('wednesday').then( res => {
                if(!unmount){
                    setList(res.wednesday)
                    var time = []
                    res.wednesday.map( i => {
                        var d = new Date(i.airing_start)
                        var a = d.toLocaleTimeString().split(' ')[0].split(':')
                        a.pop() 
                        time.push(a.join(':') + ' ' + d.toLocaleTimeString().split(' ')[1])
                    })
                    setTime(time)
                }
            })
            .catch( err => console.log(err))

            return () => unmount = true
        }, [])
        return(
            <div>
                <Typography variant='h6' align='left' className={classes.title}>
                    Wednesday
                </Typography>
                <SchedList list={list} time={time} />
            </div>
        )
    }

    const Thursday = () => {
        const [list, setList] = useState([])
        const [time, setTime] = useState([])
        useEffect( () => {
            let unmount = false

            jikan.loadSchedule('thursday').then( res => {
                if(!unmount){
                    setList(res.thursday)
                    var time = []
                    res.thursday.map( i => {
                        var d = new Date(i.airing_start)
                        var a = d.toLocaleTimeString().split(' ')[0].split(':')
                        a.pop() 
                        time.push(a.join(':') + ' ' + d.toLocaleTimeString().split(' ')[1])
                    })
                    setTime(time)
                }
            })
            .catch( err => console.log(err))

            return () => unmount = true
        }, [])
        return(
            <div>
                <Typography variant='h6' align='left' className={classes.title}>
                    Thursday
                </Typography>
                <SchedList list={list} time={time} />
            </div>
        )
    }

    const Friday = () => {
        const [list, setList] = useState([])
        const [time, setTime] = useState([])
        useEffect( () => {
            let unmount = false

            jikan.loadSchedule('friday').then( res => {
                if(!unmount){
                    setList(res.friday)
                    var time = []
                    res.friday.map( i => {
                        var d = new Date(i.airing_start)
                        var a = d.toLocaleTimeString().split(' ')[0].split(':')
                        a.pop() 
                        time.push(a.join(':') + ' ' + d.toLocaleTimeString().split(' ')[1])
                    })
                    setTime(time)
                }
            })
            .catch( err => console.log(err))

            return () => unmount = true
        }, [])
        return(
            <div>
                <Typography variant='h6' align='left' className={classes.title}>
                    Friday
                </Typography>
                <SchedList list={list} time={time} />
            </div>
        )
    }

    const Saturday = () => {
        const [list, setList] = useState([])
        const [time, setTime] = useState([])
        useEffect( () => {
            let unmount = false

            jikan.loadSchedule('saturday').then( res => {
                if(!unmount){
                    setList(res.saturday)
                    var time = []
                    res.saturday.map( i => {
                        var d = new Date(i.airing_start)
                        var a = d.toLocaleTimeString().split(' ')[0].split(':')
                        a.pop() 
                        time.push(a.join(':') + ' ' + d.toLocaleTimeString().split(' ')[1])
                    })
                    setTime(time)
                }
            })
            .catch( err => console.log(err))

            return () => unmount = true
        }, [])
        return(
            <div>
                <Typography variant='h6' align='left' className={classes.title}>
                    Saturday
                </Typography>
                <SchedList list={list} time={time} />
            </div>
        )
    }

    const Sunday = () => {
        const [list, setList] = useState([])
        const [time, setTime] = useState([])

        useEffect( () => {
            let unmount = false

            jikan.loadSchedule('sunday').then( res => {
                if(!unmount){
                    setList(res.sunday)
                    var time = []
                    res.sunday.map( i => {
                        var d = new Date(i.airing_start)
                        var a = d.toLocaleTimeString().split(' ')[0].split(':')
                        a.pop() 
                        time.push(a.join(':') + ' ' + d.toLocaleTimeString().split(' ')[1])
                    })
                    setTime(time)
                }
            })
            .catch( err => console.log(err))

            return () => unmount = true
        }, [])
        return(
            <div>
                <Typography variant='h6' align='left' className={classes.title}>
                    Sunday
                </Typography>
                <SchedList list={list} time={time} />
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