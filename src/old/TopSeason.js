import React, { useEffect, useState } from 'react'
import jikan from 'jikanjs'

function TopSeason( { index } ){
    
    const [lists, setLists] = useState()

    useEffect( () => {
        jikan.loadSeason( 2021, 'winter')
        .then( res => {
            console.log(res)
            setLists(res.anime)
            setLoading(false)
        })
        .catch( err => console.log(err))
    }, [])
    return(
        <div>

        </div>
    )
}

export default TopSeason