import { Box, Divider, makeStyles, Typography } from "@material-ui/core"
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
    },
    time: {
        opacity: '80%',
        width: '100px',
        textOverflow: 'clip'
    },
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
                            <GetTime aired={sched.airing_start} style={classes.time} align={'right'} />
                        
                        </Box>
                    </Box>
                ))}
            </Box>
        </>
    )
}