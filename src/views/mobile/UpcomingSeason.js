import { Box, GridList, GridListTile, GridListTileBar, ListSubheader, makeStyles, Paper, Typography } from '@material-ui/core'
import jikan from 'jikanjs'
import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading'

const useStyles = makeStyles( () => ({
    listContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    gridList: {
        padding: '5px',
    },
    genre: {
        opacity: '85%'
    }
}))

function UpcomingSeason() {
    const classes = useStyles()
    const [tv, setTv] = useState([])
    const [ova, setOva] = useState([])
    const [movie, setMovie] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect( () => {
        let unmount = false

        jikan.loadSeason( 2021, 'summer')
        .then( res => {
            if(!unmount) {
                let arrTv = []
                let arrOva = []
                let arrMovie = []
                // console.log(res)
                res.anime.map( (anime,index) => anime.type === "TV" ? arrTv.push(res.anime[index]) : 
                anime.type === "OVA" ? arrOva.push(res.anime[index]) : 
                anime.type === "Movie" ? arrMovie.push(res.anime[index]) : null )
                setTv(arrTv)
                setOva(arrOva)
                setMovie(arrMovie)
                setLoading(false)
            }
        })

        return () => unmount = true
    }, [])

    let section = ['TV','OVA', 'MOVIE']

    return loading ? <Loading /> : (
        <Box>
            <Paper className={classes.listContainer} square>
                {[tv,ova,movie].map( (list,index) => (
                     <GridList spacing={10} cellHeight={250} className={classes.gridList} key={index} >
                     <GridListTile key='Subheader' cols={2} style={{ height: 'auto' }} >
                         <ListSubheader component='div' >{section[index]}</ListSubheader>
                     </GridListTile>
                     {list.map( (tv,index) => (
                         <GridListTile key={index} >
                             <img src={tv.image_url} alt=''  />
                             <GridListTileBar 
                                 title={<Typography variant='body2' >{tv.title}</Typography>}
                                 subtitle={tv.genres.map( (genre,index) => (
                                     <Typography variant='caption' className={classes.genre} component='span' key={index} >
                                         {genre.name}|
                                     </Typography>
                                     ))}
                             />
                         </GridListTile>
                     ))}
                 </GridList>
                ) )}
            </Paper>
        </Box>
    )
}

export default UpcomingSeason