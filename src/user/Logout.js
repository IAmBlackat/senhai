import { Backdrop, Box, CircularProgress, makeStyles, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles( (theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))

function Logout() {
    const [loading, setLoading] = useState(true)
    const [userid, setId] = useState({
        id: localStorage.getItem('_id')
    })
    const history = useHistory()
    useEffect( () => {
        axios.post('https://simplesenhaibookmark.herokuapp.com/logout', userid)
        .then( res => {
            // console.log(res)    
            localStorage.removeItem('token')
            localStorage.removeItem('_id')
            localStorage.removeItem('username')
            if(res.data.logout) {
                setLoading(false)
                setTimeout(() => {
                    window.location.reload()
                }, 800);
                history.push('/')
            }   
            // window.location.reload()
        })
        .catch( err => console.log(err))
    }, [])

    return(
        <Box>
            <Typography variant='h4' >Logging Out</Typography>
            <Backdrop className={useStyles().backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    )
}

export default Logout