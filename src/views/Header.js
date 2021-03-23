import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, InputBase, Button, Box, IconButton, Tooltip, Zoom, Paper} from '@material-ui/core'
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loading, searchAnime } from '../redux/action';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '10px',
      paddingRight: '10px' 
    }
  },
  title: {
    flexGrow: 1,
    display: 'block',
    // color: '#88cdf6'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(0.2)}px)`,
    transition: theme.transitions.create('width'),
    width: '10ch',
    '&:focus': {
      width: '18ch',
    },
    [theme.breakpoints.up('sm')]: {
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    // width: '90%'
  },
  searchOnBigScreenBtn: {
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  menuButton: {
    // marginLeft: theme.spacing(2),
    // [theme.breakpoints.up('sm')]: {
    //   display: 'none'
    // }
  },
  IconButton: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  navLinks: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      position: 'absolute',
      // top: '0',
      left: '-100%',
      // transition: 'all .2s ease-in',
      // width: '100%',
      // height: '100vh',
      backgroundColor: '#212121',
      zIndex: 100,
      overflow: 'hidden'
    },
    // display: 'flex'
  },
  open: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      position: 'absolute',
      // left: '0%',
      transition: 'all .2s ease-in',
      // top: '0',
      left: '0%',
      width: '100%',
      // width: '100%',
      height: '100vh',
      backgroundColor: '#121212',
      zIndex: 100,
    },
  },
  link: {
    textDecoration: 'none',
    [theme.breakpoints.down('sm')]: {
      margin: '10px'
    }
  }, 
  btnLink: {
    [theme.breakpoints.down('sm')]: {
      // margin: '500px'
      padding: '15px'
    }
  },
  smallScreenMenuBtn: {
    textDecoration: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '10px'
    }
  },
  // Profile and logout btn on menu 
  logoutBtn: {
    textDecoration: 'none',
    margin: '15px',
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  loginContainer: {
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  // Profile Nav on header
  profileBtn: {
    [theme.breakpoints.down('xs')]: {
      marginLeft: '3px'
    }
  },
  logoutBtnNav: {
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  // hiding components
  hide: {
    display: 'none'
  }
}));

function Header() {
  const classes = useStyles();
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)

  const dispatch = useDispatch()
  const history = useHistory()
  const handleSubmit = e => {
      e.preventDefault()
      dispatch(searchAnime(search))
      setSearch('')
      history.push('/search/' + search)  
  }

  const handleClick = () => {
    setOpen(false)
    dispatch(loading(true))
   
  }

  // localStorage.removeItem('_id')
  // localStorage.setItem('_id', 'asdfdasf')
  // if the _id on storage is null then there's no user
  let idNull = localStorage.getItem('_id') === null ? true : false
  // console.log(idNull, localStorage.getItem('_id'))
  const Close = () => {
    return(
      // <div>
        <Fade in={open} >
          <CloseIcon className={classes.menuButton} />
        </Fade>
      // </div>
    )
  }
  const Open = () => {
    return(
      // <div >
        <Fade in={!open} >
          <MenuIcon className={classes.menuButton} />
        </Fade>
      // </div> 
    )
  }
  return (
    <div className={classes.root}>
      <AppBar position='static' style={{ background: '#121212', alignContent: 'center' }} >
        <Toolbar className={classes.toolbar} >
          <Box>
            <IconButton onClick={ () => setOpen(!open)} className={classes.IconButton}>
              { open ? <Close /> : <Open /> }
            </IconButton>

            <Box className={ open ? classes.open : classes.navLinks}>
              <Link to='/' className={classes.link}>
                  <Button fullWidth={ open ? true : false} className={classes.btnLink} onClick={handleClick}>
                      Home
                  </Button>
              </Link>
              <Link to='/recentlyadded/1' className={classes.link}>
                  <Button fullWidth={ open ? true : false} className={classes.btnLink} onClick={handleClick}>
                      New
                  </Button>
              </Link>
              <Link to='/popular/1' className={classes.link}>
                  <Button fullWidth={ open ? true : false} className={classes.btnLink} onClick={handleClick}>
                      Popular 
                  </Button>
              </Link>
              {/* <Box className={classes.upcoming}> */}
                <Link to='/upcoming' className={classes.smallScreenMenuBtn}>
                  <Button fullWidth={ open ? true : false} className={classes.btnLink} onClick={handleClick}>
                    Upcoming Anime
                  </Button>
                </Link>
              {/* </Box> */}

              {/* until log in this button is not visible */}
              <Link to='/logout' className={ idNull ? classes.hide : classes.logoutBtn} >
                  <Button fullWidth={ open ? true : false} className={classes.btnLink} onClick={handleClick}>
                      Logout 
                  </Button>
              </Link>
            
              <Box className={ idNull ? classes.smallScreenMenuBtn : classes.hide } >
                <Button component={Link} to='/login' onClick={handleClick} style={{ marginRight: '15px' }} variant='outlined' >
                  Log In
                </Button>
                
                <Button component={Link} to='/register' onClick={handleClick} variant='contained'  >
                  Sign Up
                </Button>
              </Box>
            
            </Box>

          </Box>
          <Typography className={classes.title} variant="h6" noWrap>
            Senpai - Kouhai
          </Typography>
          <form onSubmit={handleSubmit}>
            <div className={classes.searchContainer}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  value={search}
                  onChange={ (e) => setSearch(e.target.value)}
                  classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                  required
                />
                
              </div>
              <Tooltip title='Search' arrow TransitionComponent={Zoom} >
                <IconButton type='submit' className={classes.searchOnBigScreenBtn}>
                  <SearchIcon />
                </IconButton>
              </Tooltip>
            </div>
          </form>
          {/* this is only visible when the user is logged in 
              so configure it on backend */}
          <Box className={ idNull ? classes.loginContainer : classes.hide  } >
            <Button component={Link} to='/login' style={{ marginRight: '10px', marginLeft: '5px' }} variant='outlined' >
              Log In
            </Button>  
            <Button component={Link} to='/register' variant='contained'  >
              Sign Up
            </Button>
          </Box>
          
          {/* if user is logged in then display this */}
          <Box className={ idNull ? classes.hide : classes.profileBtn } >
            <Tooltip title='Profile' arrow TransitionComponent={Zoom} >
              <IconButton component={Link} to='/profile' className={classes.profileBtn}  >
                <PersonRoundedIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title='Logout' arrow TransitionComponent={Zoom} >
              <IconButton className={classes.logoutBtnNav} component={Link} to='/logout' >
                <ExitToAppRoundedIcon />
              </IconButton>
            </Tooltip>
          </Box>
  
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header