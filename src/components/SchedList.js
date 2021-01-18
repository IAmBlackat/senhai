import { Box, makeStyles, Typography } from "@material-ui/core"
import { GetTime } from "./GetTime"

const useStyles = makeStyles( () => ({
    title: {
        opacity: '80%',
        width:'100%'
    },
    dayTitle: {
        marginTop: '3px',
        marginBottom: '3px'
    },
    time: {
        opacity: '80%',
        width: '100px'
    },
    container: {
        display: 'flex',
        justifyContent: 'space-betwween'
    }
}))

export const SchedList = ( { list } ) => {
    const classes = useStyles()
    
    return(
        <>
            <Box width='100%'>
                {list.map( (sched, index) => ( 
                    <Box key={index} >
                        <Box width='100%' className={classes.container}>
                            <Typography variant='body2' noWrap align='left' className={classes.title} >
                                {sched.title}
                            </Typography>
                            {/* <Typography align='right' variant='body2'className={classes.time} noWrap >
                                {time[index]}
                            </Typography> */}
                            <GetTime id={sched.mal_id} />
                        </Box>
                    </Box>
                ))}
            </Box>
        </>
    )
}