import { CHECK_DETAILS, LOADING, SEARCH_ANIME, WATCH_EPISODE, PLAY } from './action'

const reducer = (state=[{loading: true}], action) => {
    switch(action.type){
        case PLAY:
            console.log(action.play)
            return {
                state,
                play: action.play
            }

        case CHECK_DETAILS:
            // console.log(action.id)
            return {
                state,
                title: action.title
            }
        case WATCH_EPISODE:
            // console.log(action.id)
            return {
                state,
                episode: action.episode,
                id: action.id,
                title: action.title
            }
        case SEARCH_ANIME:
            return {
                state,
                search: action.search
            }
        case LOADING:
            return {
                state,
                loading: action.loading
            }
        default: return state
    }
}

export default reducer