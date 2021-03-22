import { Backdrop, Box, Button, Card, CardContent, CardHeader, CircularProgress, CssBaseline, FormControl, FormGroup, makeStyles, Paper, Snackbar, TextField, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import axios from 'axios'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

const useStyles = makeStyles( (theme) => ({
    root: {
        // backgroundColor: '#303030',  
        height: '100vh',
        position: 'relative'
    },
    card: {
        position: 'absolute',
        width: '95%',
        top: '5%',
        left: '50%',
        transform: 'translateX(-50%)',
        // backgroundColor: '#303030',  
        [theme.breakpoints.up('sm')]: {
            width: '60%'
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

function Register() {
    const classes = useStyles()
    const [load, setLoad] = useState(false)
    const [helper, setHelper] = useState('')
    const [success, setSuccess] = useState(false)
    
    const [data, setData] = useState({
        username: '',
        email: '',
        password: ''
    })
    const { username, email, password } = data

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
    const history = useHistory()
    const submit = (e) => {
        setLoad(true)
        e.preventDefault()
        // console.log(data)
        axios.post('https://simplesenhaibookmark.herokuapp.com/register',data)
        .then( res => {
            // console.log(res)
            console.log("registered")
            if(res.data.status) setHelper(res.data.status)
            if(res.data.success) {
                setSuccess(true)
                setLoad(false)
                setTimeout(() => {
                    history.push('/login')
                  }, 1000);
                // history.push('/login')
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
                    title={<Typography align='left' variant='h4' className={classes.cardTitle} >Sign Up</Typography>}
                    subheader={
                        <Typography align='left' variant='body2' className={classes.cardSubTitle} >
                            This site is stil on development so use only a dummy email.
                        </Typography>
                    }
                />
                <CardContent>
                    <form autoComplete="off" onSubmit={submit} method="POST" >
                        <Typography className={classes.helper} variant='h6' >{helper}</Typography>
                        <FormGroup >
                            <FormControl>
                                <TextField required={username === '' ? true : false } autoComplete="on" className={classes.textField} name='username' value={username} onChange={handleChange} label='Username' variant='outlined' />
                                <TextField required={email === '' ? true : false } autoComplete="on" className={classes.textField} name='email' value={email} onChange={handleChange} label='Email' type='email' variant='outlined' />    
                                <TextField required={password === '' ? true : false } autoComplete="on" className={classes.textField} name='password' value={password} onChange={handleChange} label='Password' type='password' variant='outlined' />      
                            </FormControl>
                            <Button type='submit' size='large' variant='contained' className={classes.signupBtn} color='primary' >Sign Up</Button>
    
                        </FormGroup>
                        <Box  >
                            <Typography style={{marginBottom: '5px'}} >Already have an account?</Typography>
                            <Button component={Link} to='/login' variant='outlined' size='large' className={classes.loginBtn} >Log In</Button>
                        </Box>
                    </form>
                </CardContent>
            </Card>
            <Backdrop className={classes.backdrop} open={load}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" elevation={6} variant="filled" >
                    Account Created
                </Alert>
            </Snackbar>

        </Paper>
    )
}

export default Register