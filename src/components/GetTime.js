import { makeStyles, Typography } from "@material-ui/core"
import jikan from "jikanjs"
import { useEffect, useState } from "react"

const useStyle = makeStyles( () => ({
    time: {
        opacity: '80%',
        width: '100px'
    },
}))

export const GetTime = ( { id } ) => {
    const classes = useStyle()
    const [time, setTime] = useState([])

    useEffect( () => {
        let unmount = false
        jikan.loadAnime(id)
            .then( res => {
                if(!unmount){
                    // console.log(res.broadcast.split(' ')[2])
                    const timeString = res.broadcast.split(' ')[2] + ':00'
                    const timeString12hr = new Date('1970-01-01T' + timeString + 'Z')
                    .toLocaleTimeString({},
                        {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
                    );
                    setTime(timeString12hr)
                }
            })
        return () => unmount = true
    }, [])

    return(
        <>  
            <Typography align='right' className={classes.time} variant='body2' noWrap >
                {time}
            </Typography>
        </>
    )
}