import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Button} from '@material-ui/core'
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loading, searchAnime } from '../redux/action';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'block',
    // [theme.breakpoints.up('sm')]: {
    //   display: 'block',
    // },
  },
  search: {
    display: '',
    
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: 'auto',
    // [theme.breakpoints.up('sm')]: {
    //   marginLeft: theme.spacing(1),
    //   width: 'auto',
    // },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(0.2)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  btn: {
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  link: {
    textDecoration: 'none'
  }
}));

function Header() {
  const classes = useStyles();
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()
  const handleSubmit = e => {
      e.preventDefault()
      dispatch(searchAnime(search))
      setSearch('')
      history.push('/search')  
  }

  const handleClick = () => {
    dispatch(loading(true))
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
            {/* <Link to='/'>
                <Button onClick={handleClick}>
                    Home
                </Button>
            </Link> */}
            <Link to='/' className={classes.link}>
                <Button onClick={handleClick}>
                    New
                </Button>
            </Link>
            <Link to='/popular' className={classes.link}>
                <Button onClick={handleClick}>
                    Popular
                </Button>
            </Link>
          <Typography className={classes.title} variant="h6" noWrap>
            Senpai - Kouhai
          </Typography>
          <form onSubmit={handleSubmit}>
            <div className={classes.searchContainer}>
              <div className={classes.search}>
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
              <Button type='submit' className={classes.btn}>
                <SearchIcon />
              </Button>
            </div>
          </form>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header