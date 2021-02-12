import { Box, Paper, Typography } from '@material-ui/core'
import React from 'react'

function Loading() {
    // https://i.imgur.com/pMXIhUb.gif
    // https://danbooru.donmai.us/data/5c61af14520fd187799027fe9207c848.gif
    return(
        <Box>
            <h1>Loading...</h1>
            {/* <img style={{height: '300px', width: 'auto'}} src='https://i.imgur.com/pMXIhUb.gif' alt='' /> */}
        </Box>
    )
}

export default Loading