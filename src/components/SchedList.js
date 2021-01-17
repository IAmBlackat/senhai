import { Box, makeStyles, Typography } from "@material-ui/core"

export const SchedList = ( { list, time } ) => {
    const useStyles = makeStyles( () => ({
        title: {
            textOverflow: 'ellipsis',
            opacity: '80%',
            float: 'left',
            width:'80%'
            // position: 'relative'
        },
        dayTitle: {
            marginTop: '3px',
            marginBottom: '3px'
        },
        time: {
            opacity: '80%',
            // position: 'absolute',
            float:'right',

        }
    }))
    const classes = useStyles()

    return(
        <>
            <Box width='100%'>
                {list.map( (sched, index) => ( 
                    <Box textOverflow='ellipsis' key={index} overflow='hidden' >
                        <Box width='100%'>
                            <Typography variant='body2' noWrap align='left' className={classes.title} >
                                {sched.title}
                            </Typography>
                            <Typography  variant='body2'className={classes.time} noWrap >
                                {time[index]}
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
        </>
    )
}