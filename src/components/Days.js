import { Divider, Typography } from '@material-ui/core'
import jikan from 'jikanjs'
import React, { useEffect, useState } from 'react'
import { SchedList } from './SchedList'

const styles = {
    marginTop: '3px', 
    marginBottom: '3px'
}
    
export const Monday = () => {
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
            <Typography variant='h6' align='left' style={styles}>
                Monday
            </Typography>
            <Divider />
            <SchedList list={list} />
        </div>
    )
}

export const Tuesday = () => {
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
            <Typography variant='h6' align='left' style={styles}>
                Tuesday
            </Typography>
            <Divider />
            <SchedList list={list} />
        </div>
    )
}

export const Wednesday = () => {
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
            <Typography variant='h6' align='left' style={styles}>
                Wednesday
            </Typography>
            <Divider />
            <SchedList list={list} />
        </div>
    )
}

export const Thursday = () => {
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
            <Typography variant='h6' align='left' style={styles}>
                Thursday
            </Typography>
            <Divider />
            <SchedList list={list} />
        </div>
    )
}

export const Friday = () => {
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
            <Typography variant='h6' align='left' style={styles}>
                Friday
            </Typography>
            <Divider />
            <SchedList list={list} />
        </div>
    )
}

export const Saturday = () => {
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
            <Typography variant='h6' align='left' style={styles}>
                Saturday
            </Typography>
            <Divider />
            <SchedList list={list} />
        </div>
    )
}

export const Sunday = () => {
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
            <Typography variant='h6' align='left' style={styles}>
                Sunday
            </Typography>
            <Divider />
            <SchedList list={list} />
        </div>
    )
}