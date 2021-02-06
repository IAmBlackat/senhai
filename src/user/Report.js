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

function Report() {
    const classes = useStyles()
    const [load, setLoad] = useState(false)
    const [success, setSuccess] = useState(false)

    const [report, setReport] = useState({ 
        page: '',
        description: ''
    })

    const handleChange = (e) => {
        setReport({
            ...report,
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
        console.log(report)
        axios.post('https://simplesenhaibookmark.herokuapp.com/report', report)
        .then( res => {
            console.log(res)
            if(res.data.success) {
                setSuccess(true)
                setLoad(false)
            }
        })
        .catch( err => console.log(err))
     
    }
    
    return (
        <Paper square className={classes.root} >
            <Card className={classes.card} elevation={0} >
                <CardHeader 
                    title={<Typography align='left' variant='h4' className={classes.cardTitle} >Report a Bug or Error</Typography>}
                    subheader={
                        <Box>
                            <Typography align='left' variant='body2' className={classes.cardSubTitle} >
                                Note: Please be specific on how or where did the error occurs.
                            </Typography>
                            <Typography align='left' variant='subtitle1' >
                                Define where on the page it occurs
                            </Typography>
                        </Box>
                    }
                />
                <CardContent>
                    <form onSubmit={submit} method="POST" >
                        <FormGroup >
                            <FormControl>
                                <TextField 
                                    autoComplete="on" 
                                    label='Ex. Homepage' 
                                    name='page' 
                                    variant='outlined' 
                                    required
                                    value={report.page}
                                    onChange={handleChange}
                                    className={classes.textField} 
                                />
                                <TextField 
                                    autoComplete="on" 
                                    label='Description' 
                                    name='description'
                                    variant='outlined' 
                                    required
                                    multiline
                                    rows={4}
                                    value={report.description}
                                    onChange={handleChange}
                                    className={classes.textField} 
                                />      
                            </FormControl>
                            <Button type='submit' size='large' variant='contained' className={classes.signupBtn} color='primary' >Submit</Button>
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
                    Report Submitted
                </Alert>
            </Snackbar>
        </Paper>
    )
}

export default Report