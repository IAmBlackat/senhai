import { makeStyles, Typography } from "@material-ui/core"
import moment from 'moment-timezone'

const useStyle = makeStyles( () => ({
    time: {
        opacity: '80%',
        width: '100px',
        textOverflow: 'clip'
    },
}))

export const GetTime = ( { aired } ) => {
    const classes = useStyle()

    var time = moment.tz(aired, "Asia/Tokyo")

    return(
        <>  
            <Typography align='right' className={classes.time} variant='body2' noWrap >
                {time.format('LT')}
            </Typography>
        </>
    )
}  
   