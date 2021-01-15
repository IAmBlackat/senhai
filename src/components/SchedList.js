import { Box, makeStyles, Typography } from "@material-ui/core"

export const SchedList = ( { list} ) => {
    const useStyles = makeStyles( () => ({
        title: {
            textOverflow: 'ellipsis',
            opacity: '80%'
        },
        dayTitle: {
            marginTop: '3px',
            marginBottom: '3px'
        }
    }))
    const classes = useStyles()
    return(
        <>
            <Box component="div" textOverflow='ellipsis' overflow='hidden' width='80%'>
                {list.map( (sched, index) => ( 
                    <Box textOverflow='ellipsis' key={index} overflow='hidden' >
                    <Typography variant='body2' noWrap align='left' className={classes.title} >
                        {sched.title}
                    </Typography>
                    </Box>
                ))}
            </Box>
        </>
    )
}