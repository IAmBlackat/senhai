import { Typography } from "@material-ui/core"
import moment from 'moment-timezone'

export const GetTime = ( { aired, style, align } ) => {

    var time = moment.tz(aired, "Asia/Tokyo")

    return(
        <>  
            <Typography align={align} className={style} variant='body2' noWrap >
                {time.format('LT') === 'Invalid date' ? 'To Be Announced' : time.format('LT')}
            </Typography>
        </>
    )
}  
   