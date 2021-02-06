import { Backdrop, Box, Button, Card, CardContent, CardHeader, CircularProgress, CssBaseline, FormControl, FormGroup, FormLabel, makeStyles, Paper, Snackbar, TextField, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Alert} from '@material-ui/lab'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles( (theme) => ({
    root: {
        backgroundColor: '#303030',  
        height: '100vh',
        position: 'relative'
    },
    card: {
        position: 'absolute',
        width: '95%',
        top: '5%',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#303030',  
        [theme.breakpoints.up('sm')]: {
            width: '50%'
        }
    },
    textField: {
        marginBottom: '15px'
    },
    cardTitle: {
        textDecoration: 'underline',
        marginBottom: '10px'
    },
    cardSubTitle: {
        opacity: '85%'
    },
    signupBtn: {
        borderRadius: '20px', 
        marginBottom: '20px',
        marginTop: '10px'
    },
    loginBtn: {
        borderRadius: '20px',
        paddingLeft: '70px',
        paddingRight: '70px'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    helper: {
        marginBottom: '10px'
    }
}))

function Login() {
    const classes = useStyles()
    const [load, setLoad] = useState(false)
    const [success, setSuccess] = useState(false)
    const [helper, setHelper] = useState('')

    const [data, setData] = useState({ 
        username: '',
        password: ''
    })
    
    const { username, password } = data
    
    const history = useHistory()

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    //this handles the alert from snackbar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccess(false);
    };

    const submit = (e) => {
        setLoad(true)
        e.preventDefault()
        // console.log(data)
        axios.post('https://simplesenhaibookmark.herokuapp.com/login', data)
        .then( res => {
            // console.log(res)
            if(res.data.error) setHelper(res.data.error)
            if(res.data.loggedIn) {
                localStorage.setItem('_id', res.data.user._id)
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('username', res.data.user.username)
                setSuccess(true)
                setLoad(false)
                setTimeout(() => {
                    window.location.reload()
                }, 100);
                history.push('/')
            }
            setLoad(false)
        })
        .catch( err => console.log(err))
     
    }
    
    return (
        <Paper square className={classes.root} >

            <CssBaseline />
            <Card className={classes.card} elevation={0} >
                <CardHeader 
                    title={<Typography align='left' variant='h4' className={classes.cardTitle} >Log In</Typography>}
                    subheader={
                        <Typography align='left' variant='body2' className={classes.cardSubTitle} >
                            Note: As this is site is on development your account might be deleted and don't forget your password.
                        </Typography>
                    }
                />
                <CardContent>
                    <form onSubmit={submit} method="POST" >
                        <Typography className={classes.helper} variant='h6' >{helper}</Typography>
                        <FormGroup >
                            <FormControl>
                                <TextField 
                                    required={username === '' ? true : false } 
                                    autoComplete="on" 
                                    label='Username' 
                                    name='username' 
                                    variant='outlined' 
                                    value={username} 
                                    onChange={handleChange} 
                                    className={classes.textField} 
                                />
                                <TextField 
                                    required={password === '' ? true : false } 
                                    autoComplete="on" 
                                    label='Password' 
                                    name='password' 
                                    type='password' 
                                    variant='outlined' 
                                    value={password} 
                                    onChange={handleChange} 
                                    className={classes.textField} 
                                />      
                            </FormControl>
                            <Button type='submit' size='large' variant='contained' className={classes.signupBtn} color='primary' >Log In</Button>
                        </FormGroup>
                    </form>
                </CardContent>
            </Card>

            {/* this is the loading after submitting the form */}
            <Backdrop className={classes.backdrop} open={load}>
                <CircularProgress color="inherit" />
            </Backdrop>
            
            <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" elevation={6} variant="filled" >
                    Log In Success
                </Alert>
            </Snackbar>
        </Paper>
    )
}

export default Login