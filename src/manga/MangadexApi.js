import { Paper, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { loading } from '../redux/action'
import Read from './Read'

function MangadexApi() {
    const [manga, setManga] = useState([])
    const [loading, setLoading] = useState(true)
    //https://mangadex.org/api/manga/59849/
    //https://mangadex.org/api/chapter/1084106/
    //https://api.mangadex.org/v2/manga/48044
    //https://mangadex-api.nedpals.xyz/
    ///user/2410839 user/2410839/nitsuga01
    //title/:id/:title/chapters/:page
    useEffect( () => {
        axios.get('https://cors-anywhere.herokuapp.com/https://mangadex-api.nedpals.xyz/updates/1')
        .then( res => {
            console.log(res)
            setManga(res.data.results)
            setLoading(false)
        })
    }, [])
    // console.log(manga)
    return loading ? "" : (
        <div>
            {/* <img src='https://zm3qh490hveht.xnvda7fch4zhr.mangadex.network/data/ec0669f8bba09e5397f16c093f92b665/2-0d24b77468e2538b035604198867fc718af1e2268775b30256c8fc636c55e794.png' alt='' /> */}
            {/* <Read /> */}
            {manga.map( (i,index) => (
                <Paper square key={index} >
                    <img src={i.cover_image} alt='' />
                    <Typography>
                        {i.title}
                    </Typography>
                </Paper>
            ))}
        </div>
    )
}

export default MangadexApi