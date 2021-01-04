export const CHECK_DETAILS = 'CHECK_DETAILS'
export const WATCH_EPISODE = 'WATCH_EPISODE'
export const SEARCH_ANIME = 'SEARCH_ANIME'
export const LOADING = 'LOADING'

export const checkDetails = (title) => {
    return {
        type: CHECK_DETAILS,
        title: title
    }
}

export const watchEpisode = (episode,id,title) => {
    return{
        type: WATCH_EPISODE,
        episode: episode,
        id: id,
        title: title
    }
}

export const searchAnime = (search) => {
    return{
        type: SEARCH_ANIME,
        search: search
    }
}

export const loading = (loading) => {
    return{
        type: LOADING,
        loading: loading
    }
}