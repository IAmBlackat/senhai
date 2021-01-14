import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Read() {
    const [page, setPage] = useState([])
    const [loading, setLoading] = useState(true)
    //https://mangadex.org/api/list/26048/
    //https://www2.kickassanime.rs/search?q=yuru'

    useEffect( () => {
        axios.request('https://cors-anywhere.herokuapp.com/https://ww.4anime.vip/')
        .then(res => {
            console.log(res)
            // setPage(res.data.page_array)
            
        })
    }, [])


    return(
        <div>
            {/* <img src='https://mangadex.org/data/81983feb6551e435238c0179ac718ed5/1-24c7ae7c0d1f5b31567958d3b24957bcd58fba27f5f11bcaf86c2f9f4d9c6c38.jpg' alt='' /> */}
        </div>
    )
}

export default Read